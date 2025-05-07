import express from 'express';
import cors from 'cors';
import env from 'dotenv';
import pg from "pg";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import GoogleStrategy from "passport-google-oauth2";

env.config();
const saltRounds = 10;
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({
  origin: 'http://localhost:5173', // autorise les appels du front
  credentials: true               // utile si cookies/token
}));

// Middleware pour parser le corps des requêtes JSON
app.use(express.json());

// Middleware pour parser les données URL-encoded
app.use(express.urlencoded({ extended: true }));

// Middleware pour servir les fichiers statiques
app.use(express.static('public'));

const db = new pg.Client({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});

db.connect();

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token provided' });

  jwt.verify(token, process.env.JWT_SECRET, { issuer: 'tandem', audience: 'tandem-client' }, (err, user) => {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(401).json({ error: 'Token expired' });
      } else if (err.name === 'JsonWebTokenError') {
        return res.status(403).json({ error: 'Invalid token' });
      } else {
        return res.status(500).json({ error: 'Token verification failed' });
      }
    }

    req.user = user;
    next();
  });
}

app.get('/', (req, res) => {
  res.send('Backend Budgeta OK 🚀')
});

app.get('/api/protected', authenticateToken, (req, res) => {
  res.json({ message: "Secret data", user: req.user });
});

app.get('/api/me', authenticateToken, async (req, res) => {
  const result = await db.query("SELECT id, email FROM users WHERE id = $1", [req.user.id]);
  res.json(result.rows[0]);
});

app.post('/api/login', async (req, res, next) => {
  const { email, password } = req.body;
  const result = await db.query("SELECT * FROM users WHERE email = $1", [email]);
  const user = result.rows[0];

  if (!user) return res.status(401).json({ error: "User not found" });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ error: "Invalid email or password" });

  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '7d', issuer: 'tandem', audience: 'tandem-client' }
  );

  res.json({ token, user: { id: user.id, email: user.email } });
});

// Exemple de route API
app.post('/api/signup', async (req, res) => {
  const { fName, lName, email, password } = req.body;

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
            "INSERT INTO users (email, password, first_name, last_name, created_at, updated_at, is_premium, last_login) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
            [email, hash, fName, lName, new Date(), new Date(), false, new Date()]
          );
          const user = result.rows[0];

          const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '7d', issuer: 'tandem', audience: 'tandem-client' });
          res.status(201).json({ token, user: { id: user.id, email: user.email } });
        }
      });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal error' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Serveur Node en ligne sur http://localhost:${PORT}`)
});
