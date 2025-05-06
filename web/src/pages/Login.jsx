import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Divider from "../components/Divider/Divider";
import SocialBtn from "../components/SocialBtn/SocialBtn";
import AuthForm from "../components/AuthForm/AuthForm";
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
          <div className="form-title">
            <h1>
              Money should <br />
              never be a conflict
            </h1>
            <p>Sign up to start your 30 days free trial</p>
          </div>
          <div className="social-btn">
            <SocialBtn label="Google" path={GoogleLogo} />
            <SocialBtn label="Apple" path={AppleLogo} />
          </div>
          <Divider>or</Divider>
          <AuthForm type="submit" action="POST" onSubmit={handleLogin} />
        </div>
        <p className="top-text">
          Already have an account ? <span>Sign in</span>
        </p>
      </div>
    </div>
  );
}
