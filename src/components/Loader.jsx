import React, { useContext } from 'react';
import { GridSkeleton } from './Skeleton';
import { ThemeContext } from '../provider/ThemeProvider';

const Loader = ({ variant = "grid", count = 6 }) => {
  const { theme } = useContext(ThemeContext);

  if (variant === "grid") {
    return <GridSkeleton count={count} />;
  }

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "200px"
    }}>
      <div style={{
        width: "40px",
        height: "40px",
        border: `4px solid ${theme.surfaceLight}`,
        borderTop: `4px solid ${theme.primary}`,
        borderRadius: "50%",
        animation: "spin 1s linear infinite"
      }} />
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

export default Loader;
