export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{
      backgroundColor: "#f8f9fa",
      borderTop: "1px solid #ddd",
      padding: "30px 20px 15px",
      marginTop: "40px"
    }}>
    
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        maxWidth: "1200px",
        margin: "0 auto",
        paddingBottom: "30px",
        borderBottom: "1px solid #eee"
      }}>

        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ fontSize: "24px" }}>🍽️</span>
          <h2 style={{ margin: "0", fontSize: "20px", fontWeight: "bold", color: "#333" }}>
            PlateShare
          </h2>
        </div>


        <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: "20px",
              textDecoration: "none",
              color: "#1877f2",
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
              color: "#1da1f2",
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
              color: "#0a66c2",
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
        padding: "20px 0",
        color: "#666",
        fontSize: "14px"
      }}>
        <p style={{ margin: "0" }}>
          &copy; {currentYear} PlateShare. All rights reserved. | Sharing food, building communities.
        </p>
      </div>
    </footer>
  );
}
