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



  const handleRegister = async (e) => {
    e.preventDefault();
    

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
    <div
  style={{
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f5f7fa",
    fontFamily: "Poppins, sans-serif",
    boxSizing: "border-box",
  }}
>
  <div
    style={{
      background: "#fff",
      padding: "40px",
      borderRadius: "12px",
      boxShadow: "0 6px 18px rgba(0, 0, 0, 0.1)",
      width: "100%",
      maxWidth: "380px",
      textAlign: "center",
      boxSizing: "border-box",
    }}
  >
    <h2 style={{ color: "#4a4a4a", marginBottom: "25px" }}>Register</h2>

    <form
      onSubmit={handleRegister}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
      }}
    >
      <input
        type="text"
        placeholder="Full Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        style={{
          width: "100%",
          padding: "10px 12px",
          marginBottom: "15px",
          border: "1px solid #ccc",
          borderRadius: "6px",
          fontSize: "15px",
          boxSizing: "border-box",
        }}
      />

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
          marginBottom: "10px",
          border: "1px solid #ccc",
          borderRadius: "6px",
          fontSize: "15px",
          boxSizing: "border-box",
        }}
      />

      {password && (
        <div
          style={{
            marginBottom: "10px",
            fontSize: "14px",
            textAlign: "left",
            width: "100%",
          }}
        >
          <p
            style={{
              color: passwordValidation.hasUppercase ? "green" : "red",
              margin: "4px 0",
            }}
          >
            {passwordValidation.hasUppercase ? "✅" : "❌"} Must have an Uppercase letter
          </p>
          <p
            style={{
              color: passwordValidation.hasLowercase ? "green" : "red",
              margin: "4px 0",
            }}
          >
            {passwordValidation.hasLowercase ? "✅" : "❌"} Must have a Lowercase letter
          </p>
          <p
            style={{
              color: passwordValidation.hasMinLength ? "green" : "red",
              margin: "4px 0",
            }}
          >
            {passwordValidation.hasMinLength ? "✅" : "❌"} Length must be at least 6 characters
          </p>
        </div>
      )}

      <input
        type="url"
        placeholder="Photo URL"
        value={photoUrl}
        onChange={(e) => setPhotoUrl(e.target.value)}
        style={{
          width: "100%",
          padding: "10px 12px",
          marginBottom: "15px",
          border: "1px solid #ccc",
          borderRadius: "6px",
          fontSize: "15px",
          boxSizing: "border-box",
        }}
      />

      <button
        type="submit"
        disabled={!isPasswordValid || !name || !email || isLoading}
        style={{
          width: "100%",
          background: "#4f46e5",
          color: "#fff",
          border: "none",
          padding: "10px",
          fontSize: "16px",
          borderRadius: "6px",
          cursor:
            isPasswordValid && name && email && !isLoading
              ? "pointer"
              : "not-allowed",
          opacity:
            !isPasswordValid || !name || !email || isLoading ? 0.6 : 1,
          transition: "background 0.3s ease",
          boxSizing: "border-box",
        }}
        onMouseOver={(e) =>
          !isLoading && (e.target.style.background = "#4338ca")
        }
        onMouseOut={(e) =>
          !isLoading && (e.target.style.background = "#4f46e5")
        }
      >
        {isLoading ? "Registering..." : "Register"}
      </button>
    </form>

    <button
      onClick={handleGoogleLogin}
      disabled={isLoading}
      style={{
        width: "100%",
        background: "#db4437",
        color: "#fff",
        border: "none",
        padding: "10px",
        marginTop: "10px",
        fontSize: "16px",
        borderRadius: "6px",
        cursor: isLoading ? "not-allowed" : "pointer",
        opacity: isLoading ? 0.6 : 1,
        transition: "background 0.3s ease",
        boxSizing: "border-box",
      }}
      onMouseOver={(e) =>
        !isLoading && (e.target.style.background = "#c1351d")
      }
      onMouseOut={(e) =>
        !isLoading && (e.target.style.background = "#db4437")
      }
    >
      {isLoading ? "Processing..." : "Register / Login with Google"}
    </button>
  </div>
</div>


  );
}
