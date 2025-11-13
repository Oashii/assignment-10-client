import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../provider/AuthProvider";
import { Link } from "react-router-dom";

export default function Navbar() {
  const { user, logOut } = useContext(AuthContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);

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
            <div style={{ position: "relative", display: "inline-block" }}>
              <div
                onClick={() => setDropdownOpen(!dropdownOpen)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                  gap: "10px"
                }}
              >
                <span>{user.displayName || user.email}</span>
                {user.photoURL && (
                  <img
                    src={user.photoURL}
                    alt="profile"
                    style={{ width: "35px", height: "35px", borderRadius: "50%", cursor: "pointer" }}
                  />
                )}
              </div>

              {dropdownOpen && (
                <div
                  style={{
                    position: "absolute",
                    top: "45px",
                    right: "0",
                    backgroundColor: "#fff",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                    zIndex: "1000",
                    minWidth: "200px"
                  }}
                >
                  <Link
                    to="/add-food"
                    onClick={() => setDropdownOpen(false)}
                    style={{
                      display: "block",
                      padding: "12px 16px",
                      textDecoration: "none",
                      color: "inherit",
                      borderBottom: "1px solid #eee",
                      transition: "background 0.2s"
                    }}
                    onMouseEnter={(e) => e.target.style.background = "#f5f5f5"}
                    onMouseLeave={(e) => e.target.style.background = "#fff"}
                  >
                    Add Food
                  </Link>
                  <Link
                    to="/my-foods"
                    onClick={() => setDropdownOpen(false)}
                    style={{
                      display: "block",
                      padding: "12px 16px",
                      textDecoration: "none",
                      color: "inherit",
                      borderBottom: "1px solid #eee",
                      transition: "background 0.2s"
                    }}
                    onMouseEnter={(e) => e.target.style.background = "#f5f5f5"}
                    onMouseLeave={(e) => e.target.style.background = "#fff"}
                  >
                    Manage My Foods
                  </Link>
                  <Link
                    to="/requests"
                    onClick={() => setDropdownOpen(false)}
                    style={{
                      display: "block",
                      padding: "12px 16px",
                      textDecoration: "none",
                      color: "inherit",
                      borderBottom: "1px solid #eee",
                      transition: "background 0.2s"
                    }}
                    onMouseEnter={(e) => e.target.style.background = "#f5f5f5"}
                    onMouseLeave={(e) => e.target.style.background = "#fff"}
                  >
                    Food Requests
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setDropdownOpen(false);
                    }}
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      border: "none",
                      background: "none",
                      textAlign: "left",
                      cursor: "pointer",
                      transition: "background 0.2s"
                    }}
                    onMouseEnter={(e) => e.target.style.background = "#f5f5f5"}
                    onMouseLeave={(e) => e.target.style.background = "#fff"}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </nav>
  );
}
