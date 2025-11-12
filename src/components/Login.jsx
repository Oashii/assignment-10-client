import { useState, useContext } from "react";
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase.config";
import { AuthContext } from "../provider/AuthProvider";

export default function Login() {
  const { user } = useContext(AuthContext); // <-- now used
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("✅ Login successful!");
    } catch (err) {
      alert(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (err) {
      alert(err.message);
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
      {user && <p>Logged in as: {user.displayName || user.email}</p>} {/* optional display */}
    </div>
  );
}
