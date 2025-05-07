import express from 'express';
import cors from 'cors';
import env from 'dotenv';
import pg from "pg";
import bcrypt from "bcrypt";
import passport from "passport";
import { Strategy } from "passport-local";
import session from "express-session";
import GoogleStrategy from "passport-google-oauth2";

env.config();
const saltRounds = 10;
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({
  origin: 'http://localhost:5173', // autorise les appels du front
  credentials: true               // utile si cookies/token
}));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, httpOnly: true, sameSite: 'lax' },
  })
);

// Middleware pour parser le corps des requêtes JSON
app.use(express.json());

// Middleware pour parser les données URL-encoded
app.use(express.urlencoded({ extended: true }));

// Middleware pour servir les fichiers statiques
app.use(express.static('public'));

app.use(passport.initialize());
app.use(passport.session());

const db = new pg.Client({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});

db.connect();

function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ error: "Not authenticated" });
}

app.get('/api/protected', isAuthenticated, (req, res) => {
  res.json({ message: "Secret data" });
});

app.get('/', (req, res) => {
  res.send('Backend Budgeta OK 🚀')
});

app.post('/api/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return res.status(500).json({ error: err });
    if (!user) return res.status(401).json({ error: "Invalid email or password" });

    req.login(user, (err) => {
      if (err) return res.status(500).json({ error: "Login error" });
      return res.status(200).json({ user });
    });
  })(req, res, next);
});

// Exemple de route API
app.post('/api/signup', async (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;

  console.log('Name :', username)
  console.log('Email :', email)
  console.log('Password :', password)

  try {
    const checkResult = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (checkResult.rows.length > 0) {
      return res.status(400).json({ error: "User already exists" });
    } else {
      bcrypt.hash(password, saltRounds, async (err, hash) => {
        if (err) {
          console.error("Error hashing password:", err);
        } else {
          const result = await db.query(
            "INSERT INTO users (email, password, username, created_at, updated_at, is_premium, last_login) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
            [email, hash, username, new Date(), new Date(), false, new Date()]
          );
          const user = result.rows[0];
          req.login(user, (err) => {
            if (err) return res.status(500).json({ error: "Login error" });
            return res.status(201).json({ user });
          });
        }
      });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal error' });
  }
});

passport.use(
  new Strategy(async function verify(email, password, cb) {
    try {
      const result = await db.query("SELECT * FROM users WHERE email = $1 ", [
        email,
      ]);
      if (result.rows.length > 0) {
        const user = result.rows[0];
        const storedHashedPassword = user.password;
        bcrypt.compare(password, storedHashedPassword, (err, valid) => {
          if (err) {
            //Error with password check
            console.error("Error comparing passwords:", err);
            return cb(err);
          } else {
            if (valid) {
              //Passed password check
              return cb(null, user);
            } else {
              //Did not pass password check
              return cb(null, false);
            }
          }
        });
      } else {
        return cb("User not found");
      }
    } catch (err) {
      console.log(err);
    }
  })
);

passport.serializeUser((user, cb) => cb(null, user.id));

passport.deserializeUser(async (id, cb) => {
  const result = await db.query('SELECT * FROM users WHERE id = $1', [id]);
  cb(null, result.rows[0]);
});

app.listen(PORT, () => {
  console.log(`🚀 Serveur Node en ligne sur http://localhost:${PORT}`)
});
