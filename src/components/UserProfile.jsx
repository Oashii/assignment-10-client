import { useContext, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { ThemeContext } from "../provider/ThemeProvider";
import { spacing } from "../theme/theme";
import toast from "react-hot-toast";

export default function UserProfile() {
  const { user } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    displayName: user?.displayName || "",
    email: user?.email || "",
    photoURL: user?.photoURL || "",
    location: localStorage.getItem("userLocation") || "",
    phone: localStorage.getItem("userPhone") || "",
    bio: localStorage.getItem("userBio") || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    // Save to localStorage (in a real app, you'd send to backend)
    localStorage.setItem("userLocation", formData.location);
    localStorage.setItem("userPhone", formData.phone);
    localStorage.setItem("userBio", formData.bio);
    toast.success("✅ Profile updated!");
    setIsEditing(false);
  };

  return (
    <div style={{ maxWidth: "600px" }}>
      {/* Profile Header */}
      <div style={{
        backgroundColor: theme.surfaceLight,
        padding: spacing.xl,
        borderRadius: "12px",
        textAlign: "center",
        marginBottom: spacing.xl
      }}>
        {user?.photoURL && (
          <img
            src={user.photoURL}
            alt="profile"
            style={{
              width: "120px",
              height: "120px",
              borderRadius: "50%",
              border: `4px solid ${theme.primary}`,
              marginBottom: spacing.lg
            }}
          />
        )}
        <h1 style={{ color: theme.text, margin: `${spacing.md} 0` }}>
          {user?.displayName || "User"}
        </h1>
        <p style={{ color: theme.textLight, margin: 0 }}>{user?.email}</p>
      </div>

      {/* Profile Form */}
      <div style={{
        backgroundColor: theme.surfaceLight,
        padding: spacing.lg,
        borderRadius: "12px"
      }}>
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: spacing.lg
        }}>
          <h2 style={{ color: theme.text, margin: 0 }}>Profile Information</h2>
          <button
            onClick={() => setIsEditing(!isEditing)}
            style={{
              backgroundColor: theme.primary,
              color: "white",
              border: "none",
              padding: `${spacing.sm} ${spacing.md}`,
              borderRadius: "6px",
              cursor: "pointer",
              transition: "all 0.3s",
              minHeight: "40px",
              minWidth: "80px"
            }}
            onMouseEnter={(e) => e.target.style.opacity = "0.9"}
            onMouseLeave={(e) => e.target.style.opacity = "1"}
          >
            {isEditing ? "Cancel" : "Edit"}
          </button>
        </div>

        {/* Form Fields */}
        <div style={{ display: "grid", gap: spacing.md }}>
          {/* Name */}
          <div>
            <label style={{ color: theme.text, display: "block", marginBottom: spacing.sm }}>
              Full Name
            </label>
            <input
              type="text"
              name="displayName"
              value={formData.displayName}
              onChange={handleChange}
              disabled={!isEditing}
              style={{
                width: "100%",
                padding: spacing.md,
                border: `1px solid ${theme.border}`,
                borderRadius: "6px",
                backgroundColor: theme.background,
                color: theme.text,
                cursor: isEditing ? "text" : "default",
                opacity: isEditing ? 1 : 0.6,
                boxSizing: "border-box"
              }}
            />
          </div>

          {/* Email */}
          <div>
            <label style={{ color: theme.text, display: "block", marginBottom: spacing.sm }}>
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              disabled
              style={{
                width: "100%",
                padding: spacing.md,
                border: `1px solid ${theme.border}`,
                borderRadius: "6px",
                backgroundColor: theme.background,
                color: theme.text,
                cursor: "default",
                opacity: 0.6,
                boxSizing: "border-box"
              }}
            />
          </div>

          {/* Location */}
          <div>
            <label style={{ color: theme.text, display: "block", marginBottom: spacing.sm }}>
              📍 Location
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Enter your location"
              disabled={!isEditing}
              style={{
                width: "100%",
                padding: spacing.md,
                border: `1px solid ${theme.border}`,
                borderRadius: "6px",
                backgroundColor: theme.background,
                color: theme.text,
                cursor: isEditing ? "text" : "default",
                opacity: isEditing ? 1 : 0.6,
                boxSizing: "border-box"
              }}
            />
          </div>

          {/* Phone */}
          <div>
            <label style={{ color: theme.text, display: "block", marginBottom: spacing.sm }}>
              📱 Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
              disabled={!isEditing}
              style={{
                width: "100%",
                padding: spacing.md,
                border: `1px solid ${theme.border}`,
                borderRadius: "6px",
                backgroundColor: theme.background,
                color: theme.text,
                cursor: isEditing ? "text" : "default",
                opacity: isEditing ? 1 : 0.6,
                boxSizing: "border-box"
              }}
            />
          </div>

          {/* Bio */}
          <div>
            <label style={{ color: theme.text, display: "block", marginBottom: spacing.sm }}>
              Bio
            </label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              placeholder="Tell us about yourself"
              disabled={!isEditing}
              style={{
                width: "100%",
                padding: spacing.md,
                border: `1px solid ${theme.border}`,
                borderRadius: "6px",
                backgroundColor: theme.background,
                color: theme.text,
                cursor: isEditing ? "text" : "default",
                opacity: isEditing ? 1 : 0.6,
                boxSizing: "border-box",
                minHeight: "100px",
                fontFamily: "inherit",
                resize: "vertical"
              }}
            />
          </div>
        </div>

        {/* Save Button */}
        {isEditing && (
          <button
            onClick={handleSave}
            style={{
              width: "100%",
              backgroundColor: theme.primary,
              color: "white",
              border: "none",
              padding: spacing.md,
              borderRadius: "6px",
              cursor: "pointer",
              marginTop: spacing.lg,
              transition: "all 0.3s",
              fontSize: "16px",
              fontWeight: "500",
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
            ✅ Save Changes
          </button>
        )}
      </div>

      {/* Account Stats */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
        gap: spacing.lg,
        marginTop: spacing.xl
      }}>
        <div style={{
          backgroundColor: theme.surfaceLight,
          padding: spacing.lg,
          borderRadius: "12px",
          textAlign: "center"
        }}>
          <p style={{ color: theme.textLight, margin: "0 0 8px 0" }}>Foods Shared</p>
          <h3 style={{ color: theme.primary, margin: 0, fontSize: "28px" }}>12</h3>
        </div>
        <div style={{
          backgroundColor: theme.surfaceLight,
          padding: spacing.lg,
          borderRadius: "12px",
          textAlign: "center"
        }}>
          <p style={{ color: theme.textLight, margin: "0 0 8px 0" }}>Requests Received</p>
          <h3 style={{ color: theme.secondary, margin: 0, fontSize: "28px" }}>8</h3>
        </div>
        <div style={{
          backgroundColor: theme.surfaceLight,
          padding: spacing.lg,
          borderRadius: "12px",
          textAlign: "center"
        }}>
          <p style={{ color: theme.textLight, margin: "0 0 8px 0" }}>Member Since</p>
          <h3 style={{ color: theme.accent, margin: 0, fontSize: "14px" }}>Jan 2024</h3>
        </div>
      </div>
    </div>
  );
}
