import { useContext } from "react";
import { ThemeContext } from "../provider/ThemeProvider";
import { spacing } from "../theme/theme";

export default function Footer() {
  const { theme } = useContext(ThemeContext);
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{
      backgroundColor: theme.surfaceLight,
      borderTop: `1px solid ${theme.border}`,
      padding: `${spacing.lg} ${spacing.md}`,
      marginTop: spacing.xl,
      transition: "background-color 0.3s"
    }}>
    
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        maxWidth: "1200px",
        margin: "0 auto",
        paddingBottom: spacing.lg,
        borderBottom: `1px solid ${theme.border}`,
        flexWrap: "wrap",
        gap: spacing.md
      }}>

        <div style={{ display: "flex", alignItems: "center", gap: spacing.sm }}>
          <span style={{ fontSize: "24px" }}>🍽️</span>
          <h2 style={{ margin: "0", fontSize: "20px", fontWeight: "bold", color: theme.text }}>
            PlateShare
          </h2>
        </div>


        <div style={{ display: "flex", gap: spacing.lg, alignItems: "center" }}>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: "20px",
              textDecoration: "none",
              color: theme.facebook,
              transition: "opacity 0.3s"
            }}
            onMouseEnter={(e) => e.target.style.opacity = "0.7"}
            onMouseLeave={(e) => e.target.style.opacity = "1"}
            title="Facebook"
          >
            f
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: "20px",
              textDecoration: "none",
              color: theme.twitter,
              transition: "opacity 0.3s"
            }}
            onMouseEnter={(e) => e.target.style.opacity = "0.7"}
            onMouseLeave={(e) => e.target.style.opacity = "1"}
            title="Twitter"
          >
            𝕏
          </a>
          
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: "20px",
              textDecoration: "none",
              color: theme.secondary,
              transition: "opacity 0.3s"
            }}
            onMouseEnter={(e) => e.target.style.opacity = "0.7"}
            onMouseLeave={(e) => e.target.style.opacity = "1"}
            title="LinkedIn"
          >
            in
          </a>
        </div>
      </div>


      <div style={{
        textAlign: "center",
        padding: spacing.lg,
        color: theme.textLight,
        fontSize: "14px"
      }}>
        <p style={{ margin: "0" }}>
          &copy; {currentYear} PlateShare. All rights reserved. | Sharing food, building communities.
        </p>
      </div>
    </footer>
  );
}
