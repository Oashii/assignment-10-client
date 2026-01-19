import { useContext, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import { ThemeContext } from "../provider/ThemeProvider";
import { spacing, borderRadius } from "../theme/theme";

export default function Dashboard() {
  const { user, logOut } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const menuItems = [
    { label: "Dashboard Home", path: "/dashboard", icon: "📊" },
    { label: "My Foods", path: "/dashboard/my-foods", icon: "🍽️" },
    { label: "Add Food", path: "/dashboard/add-food", icon: "➕" },
    { label: "Food Requests", path: "/dashboard/requests", icon: "📋" },
    { label: "My Profile", path: "/dashboard/profile", icon: "👤" },
  ];

  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: theme.background }}>
      {/* Sidebar */}
      <aside
        style={{
          width: sidebarOpen ? "280px" : "80px",
          backgroundColor: theme.surfaceLight,
          borderRight: `1px solid ${theme.border}`,
          padding: spacing.lg,
          overflowY: "auto",
          transition: "width 0.3s",
          position: "fixed",
          height: "100vh",
          top: 0,
          left: 0,
          zIndex: 100,
          boxShadow: "2px 0 8px rgba(0,0,0,0.1)"
        }}
      >
        {/* Sidebar Header */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: spacing.lg,
          paddingBottom: spacing.lg,
          borderBottom: `1px solid ${theme.border}`
        }}>
          <div style={{
            display: sidebarOpen ? "flex" : "none",
            alignItems: "center",
            gap: spacing.sm,
            color: theme.text,
            fontWeight: "bold"
          }}>
            <span style={{ fontSize: "24px" }}>🍽️</span>
            <span>PlateShare</span>
          </div>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: "20px",
              padding: spacing.sm,
              color: theme.text
            }}
          >
            {sidebarOpen ? "◀️" : "▶️"}
          </button>
        </div>

        {/* Menu Items */}
        <nav>
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              style={{
                display: "flex",
                alignItems: "center",
                gap: spacing.md,
                padding: `${spacing.md} ${spacing.md}`,
                marginBottom: spacing.sm,
                color: theme.text,
                textDecoration: "none",
                borderRadius: borderRadius.md,
                transition: "all 0.3s",
                backgroundColor: "transparent",
                cursor: "pointer",
                fontSize: "14px"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = theme.primary;
                e.currentTarget.style.color = "white";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = theme.text;
              }}
            >
              <span style={{ fontSize: "18px" }}>{item.icon}</span>
              {sidebarOpen && <span>{item.label}</span>}
            </Link>
          ))}
        </nav>

        {/* Sidebar Footer */}
        <div style={{
          borderTop: `1px solid ${theme.border}`,
          paddingTop: spacing.lg,
          marginTop: "auto",
          paddingBottom: spacing.lg
        }}>
          <button
            onClick={() => {
              logOut().then(() => window.location.href = "/");
            }}
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              gap: spacing.md,
              padding: `${spacing.md}`,
              backgroundColor: theme.error,
              color: "white",
              border: "none",
              borderRadius: borderRadius.md,
              cursor: "pointer",
              transition: "all 0.3s",
              fontSize: "14px"
            }}
            onMouseEnter={(e) => e.target.style.opacity = "0.9"}
            onMouseLeave={(e) => e.target.style.opacity = "1"}
          >
            <span>🚪</span>
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main style={{
        flex: 1,
        marginLeft: sidebarOpen ? "280px" : "80px",
        transition: "margin-left 0.3s",
        padding: spacing.xl,
        overflowY: "auto"
      }}>
        {/* Dashboard Top Header */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: spacing.xl,
          paddingBottom: spacing.lg,
          borderBottom: `1px solid ${theme.border}`
        }}>
          <div>
            <h1 style={{ color: theme.text, margin: 0 }}>Dashboard</h1>
            <p style={{ color: theme.textLight, margin: "5px 0 0 0" }}>Welcome back, {user?.displayName || user?.email}</p>
          </div>
          {user?.photoURL && (
            <img
              src={user.photoURL}
              alt="profile"
              style={{
                width: "50px",
                height: "50px",
                borderRadius: "50%",
                border: `2px solid ${theme.primary}`
              }}
            />
          )}
        </div>

        {/* Page Content */}
        <Outlet />
      </main>
    </div>
  );
}
