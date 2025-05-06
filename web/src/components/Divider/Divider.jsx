import "./Divider.css";

export default function Divider({ children }) {
    return (
      <div className="container">
        <div className="border" />
        <span className="content">
          {children}
        </span>
        <div className="border" />
      </div>
    );
  };