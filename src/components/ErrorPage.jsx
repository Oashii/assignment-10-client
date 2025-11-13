import { Link } from "react-router-dom";
import { useEffect } from "react";

export default function ErrorPage() {
  useEffect(() => {

    const style = document.createElement("style");
    style.innerHTML = `
      @keyframes float {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-10px); }
      }
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
      }
    `;
    document.head.appendChild(style);
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        textAlign: "center",
        background: "#ffffff",
        color: "#333",
        fontFamily: "Poppins, sans-serif",
        overflow: "hidden",
        padding: "20px",
      }}
    >
      <h1
        style={{
          fontSize: "8rem",
          fontWeight: "800",
          marginBottom: "10px",
          animation: "float 3s ease-in-out infinite",
          color: "#16a34a",
          textShadow: "0 4px 15px rgba(22,163,74,0.2)",
        }}
      >
        404
      </h1>

      <h2
        style={{
          fontSize: "2rem",
          marginBottom: "10px",
          animation: "fadeIn 1s ease forwards",
        }}
      >
        Oops! Page not found.
      </h2>

      <p
        style={{
          fontSize: "1rem",
          maxWidth: "400px",
          color: "#555",
          opacity: "0.9",
          animation: "fadeIn 1.5s ease forwards",
        }}
      >
        The page you’re looking for doesn’t exist or may have been moved.
      </p>

      <Link
        to="/"
        style={{
          marginTop: "30px",
          padding: "12px 24px",
          backgroundColor: "#16a34a",
          color: "#fff",
          borderRadius: "8px",
          textDecoration: "none",
          fontWeight: "600",
          fontSize: "16px",
          transition: "all 0.3s ease",
          boxShadow: "0 4px 10px rgba(22,163,74,0.3)",
        }}
        onMouseOver={(e) => {
          e.target.style.backgroundColor = "#15803d";
          e.target.style.transform = "scale(1.05)";
        }}
        onMouseOut={(e) => {
          e.target.style.backgroundColor = "#16a34a";
          e.target.style.transform = "scale(1)";
        }}
      >
        ⬅ Back to Home
      </Link>
    </div>
  );
}
