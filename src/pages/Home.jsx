import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="home">
      <h1>Welcome to the Home Page!</h1>
      <p>This is the main page of the application.</p>
      <nav>
        <Link to="/">Accueil</Link>
        <Link to="/auth">À propos</Link>
      </nav>
    </div>
  );
}
