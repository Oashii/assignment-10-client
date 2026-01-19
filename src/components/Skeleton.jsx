import { useContext } from "react";
import { ThemeContext } from "../provider/ThemeProvider";
import { spacing, borderRadius } from "../theme/theme";

export function CardSkeleton() {
  const { theme } = useContext(ThemeContext);

  return (
    <div style={{
      border: `1px solid ${theme.border}`,
      borderRadius: borderRadius.lg,
      padding: spacing.md,
      background: theme.background,
      animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite"
    }}>
      <div style={{
        width: "100%",
        height: "180px",
        backgroundColor: theme.surfaceLight,
        borderRadius: borderRadius.md,
        marginBottom: spacing.md
      }} />
      <div style={{
        height: "20px",
        backgroundColor: theme.surfaceLight,
        borderRadius: borderRadius.sm,
        marginBottom: spacing.md,
        width: "80%"
      }} />
      <div style={{
        height: "16px",
        backgroundColor: theme.surfaceLight,
        borderRadius: borderRadius.sm,
        marginBottom: spacing.md,
        width: "60%"
      }} />
      <div style={{
        height: "16px",
        backgroundColor: theme.surfaceLight,
        borderRadius: borderRadius.sm,
        width: "70%"
      }} />
    </div>
  );
}

export function DetailsSkeleton() {
  const { theme } = useContext(ThemeContext);

  return (
    <div style={{
      maxWidth: "900px",
      margin: "0 auto",
      padding: spacing.lg,
      animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite"
    }}>
      <div style={{
        width: "100%",
        height: "400px",
        backgroundColor: theme.surfaceLight,
        borderRadius: borderRadius.lg,
        marginBottom: spacing.lg
      }} />
      <div style={{
        height: "32px",
        backgroundColor: theme.surfaceLight,
        borderRadius: borderRadius.md,
        marginBottom: spacing.md,
        width: "60%"
      }} />
      <div style={{
        height: "16px",
        backgroundColor: theme.surfaceLight,
        borderRadius: borderRadius.sm,
        marginBottom: spacing.md,
        width: "40%"
      }} />
      <div style={{
        height: "16px",
        backgroundColor: theme.surfaceLight,
        borderRadius: borderRadius.sm,
        marginBottom: spacing.lg,
        width: "100%"
      }} />
      <div style={{
        height: "16px",
        backgroundColor: theme.surfaceLight,
        borderRadius: borderRadius.sm,
        marginBottom: spacing.lg,
        width: "95%"
      }} />
    </div>
  );
}

export function GridSkeleton({ count = 6 }) {
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
      gap: spacing.lg
    }}>
      {Array.from({ length: count }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  );
}

// Add CSS for pulse animation
const styleSheet = document.createElement("style");
styleSheet.textContent = `
  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }
`;
document.head.appendChild(styleSheet);
