// Color Palette - 3 Primary Colors + Neutrals
export const colors = {
  // Primary Colors
  primary: "#28a745", // Green - Success/Main action
  secondary: "#007bff", // Blue - Secondary action
  accent: "#ff6b6b", // Red - Alerts/Danger
  
  // Neutral Colors
  background: "#ffffff",
  surfaceLight: "#f8f9fa",
  surfaceDark: "#e9ecef",
  text: "#333333",
  textLight: "#666666",
  textMuted: "#999999",
  border: "#e0e0e0",
  
  // Status Colors
  success: "#28a745",
  warning: "#ffc107",
  error: "#d32f2f",
  info: "#2196f3",
  
  // Social Colors
  google: "#1f2937",
  facebook: "#1877f2",
  twitter: "#1da1f2",
};

export const darkColors = {
  // Primary Colors (same in dark mode)
  primary: "#28a745",
  secondary: "#007bff",
  accent: "#ff6b6b",
  
  // Neutral Colors - Dark Mode
  background: "#1a1a1a",
  surfaceLight: "#2d2d2d",
  surfaceDark: "#3d3d3d",
  text: "#f5f5f5",
  textLight: "#d0d0d0",
  textMuted: "#a0a0a0",
  border: "#404040",
  
  // Status Colors
  success: "#4caf50",
  warning: "#ffb300",
  error: "#ef5350",
  info: "#42a5f5",
  
  // Social Colors
  google: "#ffffff",
  facebook: "#1877f2",
  twitter: "#1da1f2",
};

// Typography
export const typography = {
  fontFamily: "'Poppins', 'Segoe UI', sans-serif",
  sizes: {
    xs: "12px",
    sm: "14px",
    base: "16px",
    lg: "18px",
    xl: "20px",
    "2xl": "24px",
    "3xl": "32px",
    "4xl": "40px",
  },
  weights: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
};

// Spacing
export const spacing = {
  xs: "4px",
  sm: "8px",
  md: "16px",
  lg: "24px",
  xl: "32px",
  "2xl": "48px",
};

// Border Radius
export const borderRadius = {
  none: "0",
  sm: "4px",
  md: "8px",
  lg: "12px",
  xl: "16px",
  full: "9999px",
};

// Shadows
export const shadows = {
  sm: "0 1px 2px rgba(0, 0, 0, 0.05)",
  md: "0 4px 6px rgba(0, 0, 0, 0.1)",
  lg: "0 10px 15px rgba(0, 0, 0, 0.1)",
  xl: "0 20px 25px rgba(0, 0, 0, 0.1)",
};

// Transitions
export const transitions = {
  fast: "0.15s ease-in-out",
  base: "0.3s ease-in-out",
  slow: "0.5s ease-in-out",
};

// Responsive Breakpoints
export const breakpoints = {
  mobile: "480px",
  tablet: "768px",
  desktop: "1024px",
  wide: "1280px",
};
