import "./SocialBtn.css";

export default function SocialBtn({label, path}) {
  return (
    <button className="border-btn">
      <div className="logo-btn">
        <img src={path} alt={"Sign in with" + label} />
        <p>{label}</p>
      </div>
    </button>
  );
}
