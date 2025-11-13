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
    <div style={{ padding: "20px" }}>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
        <br />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
        <br />
        <button type="submit">Login</button>
      </form>
      <br />
      <button onClick={handleGoogleLogin}>Login with Google</button>
      <br />
      <p>Don't have an account? <Link to="/register">Register here</Link></p>
      {user && <p>Logged in as: {user.displayName || user.email}</p>} {/* optional display */}
    </div>
  );
}
