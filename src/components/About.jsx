import { useContext } from "react";
import { ThemeContext } from "../provider/ThemeProvider";
import { spacing } from "../theme/theme";

export default function About() {
  const { theme } = useContext(ThemeContext);

  return (
    <div style={{ backgroundColor: theme.background, minHeight: "100vh", padding: spacing.xl }}>
      {/* Hero Section */}
      <div style={{
        textAlign: "center",
        marginBottom: spacing.xl * 2,
        maxWidth: "800px",
        margin: "0 auto"
      }}>
        <h1 style={{ color: theme.text, fontSize: "48px", marginBottom: spacing.lg }}>
          About PlateShare
        </h1>
        <p style={{ color: theme.textLight, fontSize: "18px", lineHeight: "1.8" }}>
          PlateShare is a community-driven platform dedicated to reducing food waste and building stronger communities. 
          We connect people who have surplus food with those who need it, fostering sustainability and compassion.
        </p>
      </div>

      {/* Mission Section */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        gap: spacing.xl,
        maxWidth: "1200px",
        margin: "0 auto",
        marginBottom: spacing.xl * 2
      }}>
        <div style={{
          backgroundColor: theme.surfaceLight,
          padding: spacing.lg,
          borderRadius: "12px",
          borderTop: `4px solid ${theme.primary}`
        }}>
          <h3 style={{ color: theme.text, fontSize: "24px", marginBottom: spacing.md }}>
            🎯 Our Mission
          </h3>
          <p style={{ color: theme.textLight, lineHeight: "1.8" }}>
            To create a world where no food goes to waste and every person has access to meals, 
            by connecting generous donors with grateful recipients in their neighborhoods.
          </p>
        </div>
        <div style={{
          backgroundColor: theme.surfaceLight,
          padding: spacing.lg,
          borderRadius: "12px",
          borderTop: `4px solid ${theme.secondary}`
        }}>
          <h3 style={{ color: theme.text, fontSize: "24px", marginBottom: spacing.md }}>
            👥 Our Community
          </h3>
          <p style={{ color: theme.textLight, lineHeight: "1.8" }}>
            With over 1,850+ active members across 45+ cities, PlateShare has facilitated the sharing 
            of thousands of meals, reducing tons of food waste and building lasting community bonds.
          </p>
        </div>
        <div style={{
          backgroundColor: theme.surfaceLight,
          padding: spacing.lg,
          borderRadius: "12px",
          borderTop: `4px solid ${theme.accent}`
        }}>
          <h3 style={{ color: theme.text, fontSize: "24px", marginBottom: spacing.md }}>
            ♻️ Our Impact
          </h3>
          <p style={{ color: theme.textLight, lineHeight: "1.8" }}>
            We've diverted 12.5+ tons of food from landfills, enabled thousands of meals to reach those in need, 
            and created meaningful connections between neighbors.
          </p>
        </div>
      </div>

      {/* Values Section */}
      <div style={{
        maxWidth: "1000px",
        margin: "0 auto",
        marginBottom: spacing.xl * 2
      }}>
        <h2 style={{ color: theme.text, textAlign: "center", marginBottom: spacing.xl }}>
          Our Core Values
        </h2>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: spacing.lg
        }}>
          {[
            { value: "Sustainability", desc: "Reducing food waste for a better planet" },
            { value: "Community", desc: "Building stronger local neighborhoods" },
            { value: "Compassion", desc: "Supporting those in need" },
            { value: "Trust", desc: "Safe and reliable food sharing" },
            { value: "Transparency", desc: "Open communication and honesty" },
            { value: "Innovation", desc: "Continuously improving the platform" }
          ].map((item, idx) => (
            <div key={idx} style={{
              backgroundColor: theme.surfaceLight,
              padding: spacing.lg,
              borderRadius: "12px",
              textAlign: "center"
            }}>
              <h4 style={{ color: theme.primary, marginBottom: spacing.sm }}>{item.value}</h4>
              <p style={{ color: theme.textLight, margin: 0, fontSize: "14px" }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Team Section */}
      <div style={{
        maxWidth: "1000px",
        margin: "0 auto",
        textAlign: "center"
      }}>
        <h2 style={{ color: theme.text, marginBottom: spacing.xl }}>Join Our Mission</h2>
        <p style={{ color: theme.textLight, fontSize: "18px", lineHeight: "1.8", marginBottom: spacing.xl }}>
          Every action matters. Whether you're sharing food, requesting meals, or spreading the word about PlateShare, 
          you're making a real difference in your community.
        </p>
        <button style={{
          backgroundColor: theme.primary,
          color: "white",
          border: "none",
          padding: `${spacing.md} ${spacing.xl}`,
          borderRadius: "6px",
          fontSize: "16px",
          cursor: "pointer",
          fontWeight: "500",
          transition: "all 0.3s",
          minHeight: "44px",
          minWidth: "160px"
        }}
        onMouseEnter={(e) => {
          e.target.style.opacity = "0.9";
          e.target.style.transform = "translateY(-2px)";
        }}
        onMouseLeave={(e) => {
          e.target.style.opacity = "1";
          e.target.style.transform = "translateY(0)";
        }}>
          Get Started Today
        </button>
      </div>
    </div>
  );
}
