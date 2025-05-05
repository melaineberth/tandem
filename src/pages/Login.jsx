import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import SocialBtn from "../components/SocialBtn/SocialBtn";
import AppleLogo from "../assets/apple.png"; // Assurez-vous que le chemin est correct
import GoogleLogo from "../assets/google.png"; // Assurez-vous que le chemin est correct

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    login({ name: "John Doe" }); // Ex. simple
    navigate("/dashboard"); // Redirection vers le tableau de bord
  };

  return (
    <div className="login-container">
      <div className="img-container" />
      <div className="auth-form">
        <div className="form-group">
          <h1>Sign in</h1>
          <div className="social-login">
            <p>Sign in with Open account</p>
            <div className="social-btn">
              <SocialBtn label="Google" path={GoogleLogo} />
              <SocialBtn label="Apple" path={AppleLogo} />
            </div>
          </div>
          <div className="divider">
            <p>Or continue with email address</p>
            <form action="POST" onSubmit={handleLogin}>
              <input className="input-container" type="text" name="email" />
              <input className="input-container" type="text" name="password" />
              <button className="main-btn" type="submit">
                Get Started
              </button>
            </form>
          </div>
        </div>
        <p className="top-text">
          Don't have an account ? <span>Sign up</span>
        </p>
      </div>
    </div>
  );
}
