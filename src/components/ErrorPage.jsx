import { Link } from "react-router-dom";

export default function ErrorPage() {
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "80vh",
      textAlign: "center",
      padding: "20px"
    }}>
      <h1 style={{ fontSize: "4rem" }}>404</h1>
      <h2>Oops! Page not found.</h2>
      <p>The page you are looking for does not exist.</p>
      <Link to="/" style={{
        marginTop: "20px",
        padding: "10px 20px",
        backgroundColor: "#4CAF50",
        color: "white",
        borderRadius: "5px",
        textDecoration: "none"
      }}>
        Back to Home
      </Link>
    </div>
  );
}
