import { useContext, useState } from "react";
import { ThemeContext } from "../provider/ThemeProvider";
import { spacing } from "../theme/theme";
import toast from "react-hot-toast";

export default function Contact() {
  const { theme } = useContext(ThemeContext);
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      toast.success("✅ Message sent! We'll get back to you soon.");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } else {
      toast.error("❌ Please fill in all fields");
    }
  };

  return (
    <div style={{ backgroundColor: theme.background, minHeight: "100vh", padding: spacing.xl }}>
      {/* Header */}
      <div style={{
        textAlign: "center",
        marginBottom: spacing.xl * 2,
        maxWidth: "700px",
        margin: "0 auto"
      }}>
        <h1 style={{ color: theme.text, fontSize: "48px", marginBottom: spacing.lg }}>
          Contact Us
        </h1>
        <p style={{ color: theme.textLight, fontSize: "18px" }}>
          Have a question or suggestion? We'd love to hear from you. Reach out anytime!
        </p>
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: spacing.xl,
        maxWidth: "1200px",
        margin: "0 auto"
      }}>
        {/* Contact Info */}
        <div>
          <h3 style={{ color: theme.text, marginBottom: spacing.lg }}>Get In Touch</h3>
          <div style={{ marginBottom: spacing.lg }}>
            <p style={{ color: theme.textLight, marginBottom: spacing.sm }}>
              <strong>📍 Address</strong>
            </p>
            <p style={{ color: theme.textLight, margin: 0 }}>
              123 Food Street, Community City, CC 12345
            </p>
          </div>
          <div style={{ marginBottom: spacing.lg }}>
            <p style={{ color: theme.textLight, marginBottom: spacing.sm }}>
              <strong>📧 Email</strong>
            </p>
            <p style={{ color: theme.textLight, margin: 0 }}>
              hello@plateshare.com
            </p>
          </div>
          <div style={{ marginBottom: spacing.lg }}>
            <p style={{ color: theme.textLight, marginBottom: spacing.sm }}>
              <strong>📱 Phone</strong>
            </p>
            <p style={{ color: theme.textLight, margin: 0 }}>
              +1 (555) 123-4567
            </p>
          </div>

          {/* Social Links */}
          <div style={{ marginTop: spacing.xl }}>
            <p style={{ color: theme.text, marginBottom: spacing.md }}>Follow us</p>
            <div style={{ display: "flex", gap: spacing.md }}>
              {[
                { icon: "f", color: "#1877f2" },
                { icon: "𝕏", color: "#1da1f2" },
                { icon: "in", color: "#0a66c2" }
              ].map((social, idx) => (
                <a
                  key={idx}
                  href="#"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "50px",
                    height: "50px",
                    borderRadius: "50%",
                    backgroundColor: theme.surfaceLight,
                    color: social.color,
                    textDecoration: "none",
                    fontSize: "20px",
                    transition: "all 0.3s"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = social.color;
                    e.currentTarget.style.color = "white";
                    e.currentTarget.style.transform = "translateY(-4px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = theme.surfaceLight;
                    e.currentTarget.style.color = social.color;
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div style={{
          backgroundColor: theme.surfaceLight,
          padding: spacing.lg,
          borderRadius: "12px"
        }}>
          <h3 style={{ color: theme.text, marginBottom: spacing.lg }}>Send us a Message</h3>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: spacing.md }}>
              <label style={{ color: theme.text, display: "block", marginBottom: spacing.sm }}>
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
                style={{
                  width: "100%",
                  padding: spacing.md,
                  border: `1px solid ${theme.border}`,
                  borderRadius: "6px",
                  backgroundColor: theme.background,
                  color: theme.text,
                  boxSizing: "border-box"
                }}
              />
            </div>
            <div style={{ marginBottom: spacing.md }}>
              <label style={{ color: theme.text, display: "block", marginBottom: spacing.sm }}>
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your email"
                style={{
                  width: "100%",
                  padding: spacing.md,
                  border: `1px solid ${theme.border}`,
                  borderRadius: "6px",
                  backgroundColor: theme.background,
                  color: theme.text,
                  boxSizing: "border-box"
                }}
              />
            </div>
            <div style={{ marginBottom: spacing.md }}>
              <label style={{ color: theme.text, display: "block", marginBottom: spacing.sm }}>
                Subject
              </label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Message subject"
                style={{
                  width: "100%",
                  padding: spacing.md,
                  border: `1px solid ${theme.border}`,
                  borderRadius: "6px",
                  backgroundColor: theme.background,
                  color: theme.text,
                  boxSizing: "border-box"
                }}
              />
            </div>
            <div style={{ marginBottom: spacing.lg }}>
              <label style={{ color: theme.text, display: "block", marginBottom: spacing.sm }}>
                Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your message"
                style={{
                  width: "100%",
                  padding: spacing.md,
                  border: `1px solid ${theme.border}`,
                  borderRadius: "6px",
                  backgroundColor: theme.background,
                  color: theme.text,
                  boxSizing: "border-box",
                  minHeight: "150px",
                  fontFamily: "inherit",
                  resize: "vertical"
                }}
              />
            </div>
            <button
              type="submit"
              style={{
                width: "100%",
                backgroundColor: theme.primary,
                color: "white",
                border: "none",
                padding: spacing.md,
                borderRadius: "6px",
                cursor: "pointer",
                fontSize: "16px",
                fontWeight: "500",
                transition: "all 0.3s",
                minHeight: "44px"
              }}
              onMouseEnter={(e) => {
                e.target.style.opacity = "0.9";
                e.target.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.target.style.opacity = "1";
                e.target.style.transform = "translateY(0)";
              }}
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
