import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState, useContext } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../provider/AuthProvider";
import { motion as Motion } from "framer-motion";

export default function AddFood() {
  const { user } = useContext(AuthContext);
  const queryClient = useQueryClient();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    location: "",
    quantity: "",
    description: "",
    image: "",
    expireDate: "",
  });
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const mutation = useMutation({
    mutationFn: async (newFood) => {
      const res = await axios.post("https://plateshare-beryl.vercel.app/foods", newFood);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["foods"]);
      toast.success("✅ Food added successfully!");
      setFormData({
        name: "",
        location: "",
        quantity: "",
        description: "",
        image: "",
        expireDate: "",
      });
      setFile(null);
      setPreviewUrl(null);
      setIsSubmitting(false);
    },
    onError: () => {
      toast.error("Failed to add food");
      setIsSubmitting(false);
    },
  });

  const handleFileUpload = async () => {
    if (!file) return;
    const form = new FormData();
    form.append("image", file);
    const apiKey = "45281896da0a2a23eb77b773b33396c1";
    const res = await axios.post(
      `https://api.imgbb.com/1/upload?key=${apiKey}`,
      form
    );
    return res.data.data.url;
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    let imageUrl = formData.image;
    if (file) {
      imageUrl = await handleFileUpload();
    }

    mutation.mutate({
      ...formData,
      image: imageUrl,
      donor: user.displayName,
      donorEmail: user.email,
      donorPhotoURL: user.photoURL,
    });
  };

  const inputStyle = {
    width: "100%",
    padding: "12px 16px",
    border: "1px solid #e0e0e0",
    borderRadius: "8px",
    fontSize: "14px",
    fontFamily: "inherit",
    transition: "border-color 0.3s, box-shadow 0.3s",
    boxSizing: "border-box",
  };

  const inputFocusStyle = {
    borderColor: "#28a745",
    boxShadow: "0 0 0 3px rgba(40, 167, 69, 0.1)",
  };

  return (
    <div style={{
      minHeight: "100vh",
      backgroundColor: "#f8f9fa",
      padding: "40px 20px",
    }}>
      <Motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{
          maxWidth: "700px",
          margin: "0 auto",
          backgroundColor: "#fff",
          borderRadius: "16px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          padding: "40px 35px",
        }}
      >
        {/* Header */}
        <Motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{ marginBottom: "35px", textAlign: "center" }}
        >
          <h1 style={{
            fontSize: "32px",
            fontWeight: "bold",
            color: "#333",
            marginBottom: "8px"
          }}>
            Share Your Food
          </h1>
          <p style={{
            fontSize: "14px",
            color: "#666",
            marginBottom: "0"
          }}>
            Help reduce food waste and support your community
          </p>
        </Motion.div>

        <form onSubmit={handleSubmit}>
          {/* Food Name */}
          <Motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            style={{ marginBottom: "20px" }}
          >
            <label style={{
              display: "block",
              fontSize: "13px",
              fontWeight: "600",
              color: "#333",
              marginBottom: "8px"
            }}>
              Food Name *
            </label>
            <input
              type="text"
              placeholder="ex. Homemade Pizza, Fresh Vegetables"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
              onBlur={(e) => e.target.style.borderColor = "#e0e0e0"}
              style={inputStyle}
              required
            />
          </Motion.div>

          {/* Location */}
          <Motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{ marginBottom: "20px" }}
          >
            <label style={{
              display: "block",
              fontSize: "13px",
              fontWeight: "600",
              color: "#333",
              marginBottom: "8px"
            }}>
              Pickup Location *
            </label>
            <input
              type="text"
              placeholder="ex. Dhaka, Rajshahi"
              value={formData.location}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
              onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
              onBlur={(e) => e.target.style.borderColor = "#e0e0e0"}
              style={inputStyle}
              required
            />
          </Motion.div>

          {/* Quantity */}
          <Motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            style={{ marginBottom: "20px" }}
          >
            <label style={{
              display: "block",
              fontSize: "13px",
              fontWeight: "600",
              color: "#333",
              marginBottom: "8px"
            }}>
              Serves (Quantity) *
            </label>
            <input
              type="text"
              placeholder="ex. 2 people, 6 pieces, 1 box"
              value={formData.quantity}
              onChange={(e) =>
                setFormData({ ...formData, quantity: e.target.value })
              }
              onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
              onBlur={(e) => e.target.style.borderColor = "#e0e0e0"}
              style={inputStyle}
              required
            />
          </Motion.div>

          {/* Description */}
          <Motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            style={{ marginBottom: "20px" }}
          >
            <label style={{
              display: "block",
              fontSize: "13px",
              fontWeight: "600",
              color: "#333",
              marginBottom: "8px"
            }}>
              Description *
            </label>
            <textarea
              placeholder="Add details about the food (freshness, ingredients, storage conditions, etc.)"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
              onBlur={(e) => e.target.style.borderColor = "#e0e0e0"}
              style={{
                ...inputStyle,
                minHeight: "100px",
                resize: "vertical",
                fontFamily: "inherit",
              }}
              required
            ></textarea>
          </Motion.div>

          {/* Expire Date */}
          <Motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            style={{ marginBottom: "20px" }}
          >
            <label style={{
              display: "block",
              fontSize: "13px",
              fontWeight: "600",
              color: "#333",
              marginBottom: "8px"
            }}>
              Expiry Date *
            </label>
            <input
              type="date"
              value={formData.expireDate}
              onChange={(e) =>
                setFormData({ ...formData, expireDate: e.target.value })
              }
              onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
              onBlur={(e) => e.target.style.borderColor = "#e0e0e0"}
              style={inputStyle}
              required
            />
          </Motion.div>

          {/* Image Upload */}
          <Motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            style={{ marginBottom: "25px" }}
          >
            <label style={{
              display: "block",
              fontSize: "13px",
              fontWeight: "600",
              color: "#333",
              marginBottom: "12px"
            }}>
              Food Image *
            </label>
            <div style={{
              border: "2px dashed #28a745",
              borderRadius: "8px",
              padding: "30px",
              textAlign: "center",
              backgroundColor: "#f0f8f5",
              cursor: "pointer",
              transition: "all 0.3s"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#218838";
              e.currentTarget.style.backgroundColor = "#e8f5e9";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "#28a745";
              e.currentTarget.style.backgroundColor = "#f0f8f5";
            }}
            onClick={() => document.getElementById("fileInput").click()}>
              {previewUrl ? (
                <div>
                  <img src={previewUrl} alt="preview" style={{
                    maxWidth: "100%",
                    maxHeight: "200px",
                    borderRadius: "8px",
                    marginBottom: "12px"
                  }} />
                  <p style={{ color: "#666", fontSize: "13px", marginBottom: "0" }}>
                    Click to change image
                  </p>
                </div>
              ) : (
                <div>
                  <div style={{ fontSize: "32px", marginBottom: "10px" }}>📸</div>
                  <p style={{ color: "#666", fontSize: "13px", marginBottom: "0" }}>
                    Click to upload or drag and drop
                  </p>
                </div>
              )}
            </div>
            <input
              id="fileInput"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
          </Motion.div>

          {/* Submit Button */}
          <Motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isSubmitting}
            style={{
              width: "100%",
              padding: "14px",
              backgroundColor: isSubmitting ? "#a0c77d" : "#28a745",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontSize: "15px",
              fontWeight: "600",
              cursor: isSubmitting ? "not-allowed" : "pointer",
              transition: "background 0.3s",
              marginTop: "10px",
              minHeight: "44px"
            }}
            onMouseEnter={(e) => !isSubmitting && (e.target.style.backgroundColor = "#218838")}
            onMouseLeave={(e) => !isSubmitting && (e.target.style.backgroundColor = "#28a745")}
          >
            {isSubmitting ? "Adding Food..." : "Add Food to Community"}
          </Motion.button>
        </form>
      </Motion.div>
    </div>
  );
}
