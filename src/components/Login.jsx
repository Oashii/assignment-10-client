import { useState, useContext } from "react";
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import toast from "react-hot-toast";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { auth } from "../firebase.config";
import { AuthContext } from "../provider/AuthProvider";
import { ThemeContext } from "../provider/ThemeProvider";
import { spacing } from "../theme/theme";

export default function Login() {
  const { user } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Invalid email format";
    }
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    return newErrors;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length > 0) {
      toast.error("Please fix the errors");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("✅ Login successful!");
      const from = location.state?.from?.pathname || "/";
      navigate(from);
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        toast.error("❌ User not found");
      } else if (error.code === "auth/wrong-password") {
        toast.error("❌ Incorrect password");
      } else {
        toast.error("❌ Login failed. Please try again.");
      }
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
      toast.error("❌ Google login failed");
    }
  };

  // Demo credentials
  const fillDemoUser = () => {
    setEmail("demo@example.com");
    setPassword("demo123");
    setTouched({ email: true, password: true });
  };

  return (
    <div
  style={{
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: theme.surfaceLight,
    fontFamily: "Poppins, sans-serif",
    padding: spacing.lg,
    transition: "background-color 0.3s"
  }}
>
  <div
    style={{
      background: theme.background,
      padding: spacing.lg,
      borderRadius: "12px",
      boxShadow: "0 6px 18px rgba(0, 0, 0, 0.1)",
      width: "100%",
      maxWidth: "400px",
      textAlign: "center",
      boxSizing: "border-box",
    }}
  >
    <h2 style={{ color: theme.text, marginBottom: spacing.lg }}>Login</h2>

    <form onSubmit={handleLogin}>
      <div style={{ marginBottom: spacing.md }}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={() => setTouched({ ...touched, email: true })}
          style={{
            width: "100%",
            padding: spacing.md,
            marginBottom: touched.email && errors.email ? "8px" : spacing.md,
            border: `1px solid ${touched.email && errors.email ? theme.error : theme.border}`,
            borderRadius: "6px",
            fontSize: "15px",
            boxSizing: "border-box",
            display: "block",
            backgroundColor: theme.background,
            color: theme.text,
            transition: "border-color 0.3s"
          }}
        />
        {touched.email && errors.email && (
          <p style={{ color: theme.error, fontSize: "12px", margin: "0", textAlign: "left" }}>
            {errors.email}
          </p>
        )}
      </div>

      <div style={{ marginBottom: spacing.md }}>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onBlur={() => setTouched({ ...touched, password: true })}
          style={{
            width: "100%",
            padding: spacing.md,
            marginBottom: touched.password && errors.password ? "8px" : spacing.md,
            border: `1px solid ${touched.password && errors.password ? theme.error : theme.border}`,
            borderRadius: "6px",
            fontSize: "15px",
            boxSizing: "border-box",
            display: "block",
            backgroundColor: theme.background,
            color: theme.text,
            transition: "border-color 0.3s"
          }}
        />
        {touched.password && errors.password && (
          <p style={{ color: theme.error, fontSize: "12px", margin: "0", textAlign: "left" }}>
            {errors.password}
          </p>
        )}
      </div>

      <button
        type="submit"
        style={{
          width: "100%",
          background: theme.primary,
          color: "#fff",
          border: "none",
          padding: spacing.md,
          fontSize: "16px",
          borderRadius: "6px",
          cursor: "pointer",
          transition: "all 0.3s",
          boxSizing: "border-box",
          display: "block",
          fontWeight: "500",
          minHeight: "44px"
        }}
        onMouseOver={(e) => {
          e.target.style.opacity = "0.9";
          e.target.style.transform = "translateY(-2px)";
        }}
        onMouseOut={(e) => {
          e.target.style.opacity = "1";
          e.target.style.transform = "translateY(0)";
        }}
      >
        Login
      </button>
    </form>

    <button
      onClick={handleGoogleLogin}
      style={{
        width: "100%",
        background: theme.secondary,
        color: "#fff",
        border: "none",
        padding: spacing.md,
        marginTop: spacing.md,
        fontSize: "16px",
        borderRadius: "6px",
        cursor: "pointer",
        transition: "all 0.3s",
        boxSizing: "border-box",
        display: "block",
        fontWeight: "500",
        minHeight: "44px"
      }}
      onMouseOver={(e) => {
        e.target.style.opacity = "0.9";
        e.target.style.transform = "translateY(-2px)";
      }}
      onMouseOut={(e) => {
        e.target.style.opacity = "1";
        e.target.style.transform = "translateY(0)";
      }}
    >
      🔗 Login with Google
    </button>

    {/* Demo Credentials Button */}
    <button
      onClick={fillDemoUser}
      style={{
        width: "100%",
        background: theme.accent,
        color: "#fff",
        border: "none",
        padding: spacing.md,
        marginTop: spacing.md,
        fontSize: "16px",
        borderRadius: "6px",
        cursor: "pointer",
        transition: "all 0.3s",
        boxSizing: "border-box",
        display: "block",
        fontWeight: "500",
        minHeight: "44px"
      }}
      onMouseOver={(e) => {
        e.target.style.opacity = "0.9";
      }}
      onMouseOut={(e) => {
        e.target.style.opacity = "1";
      }}
    >
      👤 Use Demo Credentials
    </button>

    <p style={{ marginTop: spacing.md, color: theme.textLight, fontSize: "14px" }}>
      Don't have an account?{" "}
      <Link
        to="/register"
        style={{ color: theme.secondary, textDecoration: "none", fontWeight: "500" }}
        onMouseOver={(e) => (e.target.style.textDecoration = "underline")}
        onMouseOut={(e) => (e.target.style.textDecoration = "none")}
      >
        Register here
      </Link>
    </p>

    {user && (
      <p style={{ color: theme.success, marginTop: spacing.md, fontSize: "14px" }}>
        ✅ Logged in as: {user.displayName || user.email}
      </p>
    )}
  </div>
</div>


  );
}
