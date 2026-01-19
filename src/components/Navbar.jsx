import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../provider/AuthProvider";
import { ThemeContext } from "../provider/ThemeProvider";
import { Link } from "react-router-dom";
import { spacing, breakpoints } from "../theme/theme";

export default function Navbar() {
  const { user, logOut } = useContext(AuthContext);
  const { isDarkMode, toggleTheme, theme } = useContext(ThemeContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    logOut()
      .then(() => toast.success("Logged out successfully"))
      .catch((err) => console.log(err));
  };

  return (
    <nav style={{
      padding: `${spacing.md} ${spacing.lg}`,
      backgroundColor: theme.background,
      borderBottom: `1px solid ${theme.border}`,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      boxShadow: theme.isDarkMode ? "none" : "0 2px 8px rgba(0,0,0,0.08)",
      position: "sticky",
      top: 0,
      zIndex: 999,
      transition: "background-color 0.3s ease"
    }}>

      <Link to="/" style={{
        fontWeight: "bold",
        fontSize: "24px",
        textDecoration: "none",
        color: theme.text,
        display: "flex",
        alignItems: "center",
        gap: spacing.sm
      }}>
        🍽️ <span style={{ color: theme.primary }}>PlateShare</span>
      </Link>


      <div style={{ display: "flex", gap: spacing.xl, alignItems: "center", "@media": `(max-width: ${breakpoints.tablet})` }}>
        <Link to="/" style={{
          marginRight: "0",
          textDecoration: "none",
          color: theme.text,
          fontSize: "14px",
          fontWeight: "500",
          transition: "color 0.3s, transform 0.3s"
        }}
        onMouseEnter={(e) => {
          e.target.style.color = theme.primary;
          e.target.style.transform = "scale(1.1)";
        }}
        onMouseLeave={(e) => {
          e.target.style.color = theme.text;
          e.target.style.transform = "scale(1)";
        }}>
          Home
        </Link>
        <Link to="/foods" style={{
          marginRight: "0",
          textDecoration: "none",
          color: theme.text,
          fontSize: "14px",
          fontWeight: "500",
          transition: "color 0.3s, transform 0.3s"
        }}
        onMouseEnter={(e) => {
          e.target.style.color = theme.primary;
          e.target.style.transform = "scale(1.1)";
        }}
        onMouseLeave={(e) => {
          e.target.style.color = theme.text;
          e.target.style.transform = "scale(1)";
        }}>
          Available Foods
        </Link>
        <Link to="/about" style={{
          marginRight: "0",
          textDecoration: "none",
          color: theme.text,
          fontSize: "14px",
          fontWeight: "500",
          transition: "color 0.3s, transform 0.3s"
        }}
        onMouseEnter={(e) => {
          e.target.style.color = theme.primary;
          e.target.style.transform = "scale(1.1)";
        }}
        onMouseLeave={(e) => {
          e.target.style.color = theme.text;
          e.target.style.transform = "scale(1)";
        }}>
          About
        </Link>
        <Link to="/contact" style={{
          marginRight: "0",
          textDecoration: "none",
          color: theme.text,
          fontSize: "14px",
          fontWeight: "500",
          transition: "color 0.3s, transform 0.3s"
        }}
        onMouseEnter={(e) => {
          e.target.style.color = theme.primary;
          e.target.style.transform = "scale(1.1)";
        }}
        onMouseLeave={(e) => {
          e.target.style.color = theme.text;
          e.target.style.transform = "scale(1)";
        }}>
          Contact
        </Link>
      </div>

      <div style={{ display: "flex", gap: spacing.md, alignItems: "center" }}>
        {/* Dark Mode Toggle */}
        <button
          onClick={toggleTheme}
          style={{
            background: theme.surfaceLight,
            border: `1px solid ${theme.border}`,
            borderRadius: "50%",
            width: "40px",
            height: "40px",
            cursor: "pointer",
            fontSize: "20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.3s",
            color: theme.text
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = theme.surfaceDark;
            e.currentTarget.style.transform = "scale(1.1)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = theme.surfaceLight;
            e.currentTarget.style.transform = "scale(1)";
          }}
          title={isDarkMode ? "Light Mode" : "Dark Mode"}
        >
          {isDarkMode ? "☀️" : "🌙"}
        </button>

        {!user && (
          <div style={{ display: "flex", gap: spacing.md }}>
            <Link to="/login" style={{
              padding: `${spacing.sm} ${spacing.md}`,
              backgroundColor: theme.primary,
              color: "white",
              textDecoration: "none",
              borderRadius: "5px",
              fontSize: "14px",
              fontWeight: "500",
              transition: "background 0.3s"
            }}
            onMouseEnter={(e) => e.target.style.opacity = "0.9"}
            onMouseLeave={(e) => e.target.style.opacity = "1"}>
              Login
            </Link>
            <Link to="/register" style={{
              padding: `${spacing.sm} ${spacing.md}`,
              backgroundColor: theme.secondary,
              color: "white",
              textDecoration: "none",
              borderRadius: "5px",
              fontSize: "14px",
              fontWeight: "500",
              transition: "background 0.3s"
            }}
            onMouseEnter={(e) => e.target.style.opacity = "0.9"}
            onMouseLeave={(e) => e.target.style.opacity = "1"}>
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
                gap: spacing.sm,
                padding: `${spacing.sm} ${spacing.md}`,
                borderRadius: "5px",
                transition: "background 0.3s"
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = theme.surfaceLight}
              onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
            >
              <span style={{ fontSize: "14px", fontWeight: "500", color: theme.text }}>{user.displayName || user.email}</span>
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
                  backgroundColor: theme.background,
                  border: `1px solid ${theme.border}`,
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
                    padding: `${spacing.md} ${spacing.lg}`,
                    textDecoration: "none",
                    color: theme.text,
                    borderBottom: `1px solid ${theme.border}`,
                    transition: "background 0.2s",
                    cursor: "pointer",
                    fontSize: "14px"
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = theme.surfaceLight}
                  onMouseLeave={(e) => e.currentTarget.style.background = theme.background}
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
                    padding: `${spacing.md} ${spacing.lg}`,
                    textDecoration: "none",
                    color: theme.text,
                    borderBottom: `1px solid ${theme.border}`,
                    transition: "background 0.2s",
                    cursor: "pointer",
                    fontSize: "14px"
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = theme.surfaceLight}
                  onMouseLeave={(e) => e.currentTarget.style.background = theme.background}
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
                    padding: `${spacing.md} ${spacing.lg}`,
                    textDecoration: "none",
                    color: theme.text,
                    borderBottom: `1px solid ${theme.border}`,
                    transition: "background 0.2s",
                    cursor: "pointer",
                    fontSize: "14px"
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = theme.surfaceLight}
                  onMouseLeave={(e) => e.currentTarget.style.background = theme.background}
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
                    padding: `${spacing.md} ${spacing.lg}`,
                    border: "none",
                    background: "none",
                    textAlign: "left",
                    cursor: "pointer",
                    transition: "background 0.2s",
                    color: theme.error,
                    fontSize: "14px",
                    fontWeight: "500"
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = theme.surfaceLight}
                  onMouseLeave={(e) => e.currentTarget.style.background = theme.background}
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
