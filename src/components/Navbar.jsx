import { useContext } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../provider/AuthProvider";
import { Link } from "react-router-dom";

export default function Navbar() {
  const { user, logOut } = useContext(AuthContext);

  const handleLogout = () => {
    logOut()
      .then(() => toast.success("✅ Logged out successfully"))
      .catch((err) => console.log(err));
  };

  return (
    <nav style={{ padding: "10px 20px", borderBottom: "1px solid #ccc", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <Link to="/" style={{ fontWeight: "bold", fontSize: "20px" }}>🍽️ PlateShare</Link>

      <div>
        <Link to="/" style={{ marginRight: "15px" }}>Home</Link>
        <Link to="/foods" style={{ marginRight: "15px" }}>Available Foods</Link>

        {!user && (
          <>
            <Link to="/login" style={{ marginRight: "15px" }}>Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}

        {user && (
          <>
            <Link to="/add-food" style={{ marginRight: "15px" }}>Add Food</Link>
            <Link to="/my-foods" style={{ marginRight: "15px" }}>Manage My Foods</Link>
            <Link to="/requests" style={{ marginRight: "15px" }}>My Food Requests</Link>
            <span style={{ marginRight: "10px" }}>{user.displayName || user.email}</span>
            {user.photoURL && <img src={user.photoURL} alt="profile" style={{ width: "30px", height: "30px", borderRadius: "50%", marginRight: "10px" }} />}
            <button onClick={handleLogout}>Logout</button>
          </>
        )}
      </div>
    </nav>
  );
}
