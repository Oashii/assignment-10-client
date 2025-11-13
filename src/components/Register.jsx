import { useState, useContext } from "react";
import { createUserWithEmailAndPassword, updateProfile, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase.config";
import { AuthContext } from "../provider/AuthProvider";

export default function Register() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  console.log(user);

  const validatePassword = (pwd) => {
    return {
      hasUppercase: /[A-Z]/.test(pwd),
      hasLowercase: /[a-z]/.test(pwd),
      hasMinLength: pwd.length >= 6
    };
  };

  const passwordValidation = validatePassword(password);
  const isPasswordValid = passwordValidation.hasUppercase && passwordValidation.hasLowercase && passwordValidation.hasMinLength;

  // photo upload removed — using direct photo URL input instead

  const handleRegister = async (e) => {
    e.preventDefault();
    
    // Validate password before proceeding
    if (!isPasswordValid) {
      toast.error("❌ Password does not meet the requirements");
      return;
    }

      setIsLoading(true);
      try {
      const photoURL = photoUrl || null;
      const result = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(result.user, { 
        displayName: name,
        photoURL: photoURL
      });
      toast.success("✅ Registration successful!");
    } catch (err) {
        setIsLoading(false);
      toast.error(err.message);
        return;
    }
      setIsLoading(false);
      // Navigate after successful registration
      navigate("/");
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
      setIsLoading(true);
    try {
      await signInWithPopup(auth, provider);
        toast.success("✅ Login successful!");
        setIsLoading(false);
        navigate("/");
    } catch (err) {
        setIsLoading(false);
        if (err.code !== "auth/popup-closed-by-user") {
          toast.error("Failed logging in");
        }
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input type="text" placeholder="Full Name" value={name} onChange={e => setName(e.target.value)} required />
        <br />
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
        <br />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
        <br />
        {password && (
          <div style={{ marginBottom: "10px", fontSize: "14px" }}>
            <p style={{ color: passwordValidation.hasUppercase ? "green" : "red", margin: "5px 0" }}>
              {passwordValidation.hasUppercase ? "✅" : "❌"} Must have an Uppercase letter
            </p>
            <p style={{ color: passwordValidation.hasLowercase ? "green" : "red", margin: "5px 0" }}>
              {passwordValidation.hasLowercase ? "✅" : "❌"} Must have a Lowercase letter
            </p>
            <p style={{ color: passwordValidation.hasMinLength ? "green" : "red", margin: "5px 0" }}>
              {passwordValidation.hasMinLength ? "✅" : "❌"} Length must be at least 6 characters
            </p>
          </div>
        )}
        <input
          type="url"
          placeholder="Photo URL"
          value={photoUrl}
          onChange={e => setPhotoUrl(e.target.value)}
        />
        <br />
          <button type="submit" disabled={!isPasswordValid || !name || !email || isLoading}>
            {isLoading ? "Registering..." : "Register"}
          </button>
      </form>
      <br />
        <button onClick={handleGoogleLogin} disabled={isLoading}>
          {isLoading ? "Processing..." : "Register/Login with Google"}
        </button>
    </div>
  );
}
