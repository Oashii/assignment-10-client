import { useState, useContext } from "react";
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import toast from "react-hot-toast";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { auth } from "../firebase.config";
import { AuthContext } from "../provider/AuthProvider";

export default function Login() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("✅ Login successful!");
      const from = location.state?.from?.pathname || "/";
      navigate(from);
    } catch {
      toast.error("Failed logging in");
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      toast.success("✅ Login successful!");
      const from = location.state?.from?.pathname || "/";
      navigate(from);
    } catch {
      toast.error("Failed logging in");
    }
  };

  return (
    <div
  style={{
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f5f7fa",
    fontFamily: "Poppins, sans-serif",
  }}
>
  <div
    style={{
      background: "#fff",
      padding: "40px 30px",
      borderRadius: "12px",
      boxShadow: "0 6px 18px rgba(0, 0, 0, 0.1)",
      width: "100%",
      maxWidth: "380px",
      textAlign: "center",
      boxSizing: "border-box",
    }}
  >
    <h2 style={{ color: "#4a4a4a", marginBottom: "25px" }}>Login</h2>

    <form onSubmit={handleLogin}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        style={{
          width: "100%",
          padding: "10px 12px",
          marginBottom: "15px",
          border: "1px solid #ccc",
          borderRadius: "6px",
          fontSize: "15px",
          boxSizing: "border-box",
          display: "block",
        }}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        style={{
          width: "100%",
          padding: "10px 12px",
          marginBottom: "15px",
          border: "1px solid #ccc",
          borderRadius: "6px",
          fontSize: "15px",
          boxSizing: "border-box",
          display: "block",
        }}
      />

      <button
        type="submit"
        style={{
          width: "100%",
          background: "#4f46e5",
          color: "#fff",
          border: "none",
          padding: "10px",
          fontSize: "16px",
          borderRadius: "6px",
          cursor: "pointer",
          transition: "background 0.3s ease",
          boxSizing: "border-box",
          display: "block",
        }}
        onMouseOver={(e) => (e.target.style.background = "#4338ca")}
        onMouseOut={(e) => (e.target.style.background = "#4f46e5")}
      >
        Login
      </button>
    </form>

    <button
      onClick={handleGoogleLogin}
      style={{
        width: "100%",
        background: "#db4437",
        color: "#fff",
        border: "none",
        padding: "10px",
        marginTop: "10px",
        fontSize: "16px",
        borderRadius: "6px",
        cursor: "pointer",
        transition: "background 0.3s ease",
        boxSizing: "border-box",
        display: "block",
      }}
      onMouseOver={(e) => (e.target.style.background = "#c1351d")}
      onMouseOut={(e) => (e.target.style.background = "#db4437")}
    >
      Login with Google
    </button>

    <p style={{ marginTop: "15px", color: "#555", fontSize: "14px" }}>
      Don't have an account?{" "}
      <Link
        to="/register"
        style={{ color: "#4f46e5", textDecoration: "none" }}
        onMouseOver={(e) => (e.target.style.textDecoration = "underline")}
        onMouseOut={(e) => (e.target.style.textDecoration = "none")}
      >
        Register here
      </Link>
    </p>

    {user && (
      <p style={{ color: "#16a34a", marginTop: "10px", fontSize: "14px" }}>
        Logged in as: {user.displayName || user.email}
      </p>
    )}
  </div>
</div>


  );
}
