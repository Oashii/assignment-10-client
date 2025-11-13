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
    <nav style={{
      padding: "15px 30px",
      backgroundColor: "#fff",
      borderBottom: "1px solid #e0e0e0",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
    }}>
      {/* Left: Logo */}
      <Link to="/" style={{
        fontWeight: "bold",
        fontSize: "24px",
        textDecoration: "none",
        color: "#333",
        display: "flex",
        alignItems: "center",
        gap: "8px"
      }}>
        🍽️ <span style={{ color: "#28a745" }}>PlateShare</span>
      </Link>

      {/* Center: Navigation Links */}
      <div style={{ display: "flex", gap: "30px", alignItems: "center" }}>
        <Link to="/" style={{
          marginRight: "0",
          textDecoration: "none",
          color: "#333",
          fontSize: "14px",
          fontWeight: "500",
          transition: "color 0.3s, transform 0.3s"
        }}
        onMouseEnter={(e) => {
          e.target.style.color = "#28a745";
          e.target.style.transform = "scale(1.1)";
        }}
        onMouseLeave={(e) => {
          e.target.style.color = "#333";
          e.target.style.transform = "scale(1)";
        }}>
          Home
        </Link>
        <Link to="/foods" style={{
          marginRight: "0",
          textDecoration: "none",
          color: "#333",
          fontSize: "14px",
          fontWeight: "500",
          transition: "color 0.3s, transform 0.3s"
        }}
        onMouseEnter={(e) => {
          e.target.style.color = "#28a745";
          e.target.style.transform = "scale(1.1)";
        }}
        onMouseLeave={(e) => {
          e.target.style.color = "#333";
          e.target.style.transform = "scale(1)";
        }}>
          Available Foods
        </Link>
      </div>

      {/* Right: Auth Links or User Menu */}
      <div>
        {!user && (
          <div style={{ display: "flex", gap: "15px" }}>
            <Link to="/login" style={{
              marginRight: "0",
              textDecoration: "none",
              color: "#333",
              fontSize: "14px",
              fontWeight: "500",
              transition: "color 0.3s"
            }}
            onMouseEnter={(e) => e.target.style.color = "#28a745"}
            onMouseLeave={(e) => e.target.style.color = "#333"}>
              Login
            </Link>
            <Link to="/register" style={{
              padding: "8px 16px",
              backgroundColor: "#28a745",
              color: "white",
              textDecoration: "none",
              borderRadius: "5px",
              fontSize: "14px",
              fontWeight: "500",
              transition: "background 0.3s"
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = "#218838"}
            onMouseLeave={(e) => e.target.style.backgroundColor = "#28a745"}>
              Register
            </Link>
          </div>
        )}

        {user && (
          <div style={{ position: "relative", display: "inline-block" }}>
            <div
              onClick={() => setDropdownOpen(!dropdownOpen)}
              style={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
                gap: "10px",
                padding: "8px 12px",
                borderRadius: "5px",
                transition: "background 0.3s"
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = "#f5f5f5"}
              onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
            >
              <span style={{ fontSize: "14px", fontWeight: "500", color: "#333" }}>{user.displayName || user.email}</span>
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
                  top: "50px",
                  right: "0",
                  backgroundColor: "#fff",
                  border: "1px solid #e0e0e0",
                  borderRadius: "8px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                  zIndex: "1000",
                  minWidth: "220px",
                  overflow: "hidden"
                }}
              >
                <div
                  to="/add-food"
                  onClick={() => {
                    setDropdownOpen(false);
                    window.location.href = "/add-food";
                  }}
                  style={{
                    display: "block",
                    padding: "12px 16px",
                    textDecoration: "none",
                    color: "#333",
                    borderBottom: "1px solid #f0f0f0",
                    transition: "background 0.2s",
                    cursor: "pointer",
                    fontSize: "14px"
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = "#f8f9fa"}
                  onMouseLeave={(e) => e.currentTarget.style.background = "#fff"}
                >
                  Add Food
                </div>
                <div
                  onClick={() => {
                    setDropdownOpen(false);
                    window.location.href = "/my-foods";
                  }}
                  style={{
                    display: "block",
                    padding: "12px 16px",
                    textDecoration: "none",
                    color: "#333",
                    borderBottom: "1px solid #f0f0f0",
                    transition: "background 0.2s",
                    cursor: "pointer",
                    fontSize: "14px"
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = "#f8f9fa"}
                  onMouseLeave={(e) => e.currentTarget.style.background = "#fff"}
                >
                  Manage My Foods
                </div>
                <div
                  onClick={() => {
                    setDropdownOpen(false);
                    window.location.href = "/requests";
                  }}
                  style={{
                    display: "block",
                    padding: "12px 16px",
                    textDecoration: "none",
                    color: "#333",
                    borderBottom: "1px solid #f0f0f0",
                    transition: "background 0.2s",
                    cursor: "pointer",
                    fontSize: "14px"
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = "#f8f9fa"}
                  onMouseLeave={(e) => e.currentTarget.style.background = "#fff"}
                >
                  My Food Requests
                </div>
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
                    transition: "background 0.2s",
                    color: "#d32f2f",
                    fontSize: "14px",
                    fontWeight: "500"
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = "#ffebee"}
                  onMouseLeave={(e) => e.currentTarget.style.background = "#fff"}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
