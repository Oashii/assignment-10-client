import { useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../provider/AuthProvider";
import { motion } from "framer-motion";
import { ThemeContext } from "../provider/ThemeProvider";
import { spacing } from "../theme/theme";

export default function FoodDetails() {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);
  const queryClient = useQueryClient();
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [requestData, setRequestData] = useState({
    location: "",
    reason: "",
    contact: "",
  });

  const { data: food, isLoading, isError } = useQuery({
    queryKey: ["food", id],
    queryFn: async () => {
      const res = await axios.get(`https://plateshare-beryl.vercel.app/foods/${id}`);
      return res.data;
    },
  });

  const { data: foodRequests = [] } = useQuery({
    queryKey: ["foodRequests", id],
    queryFn: async () => {
      const res = await axios.get(`https://plateshare-beryl.vercel.app/requests`);
      return (res.data || []).filter((req) => req.foodId === id);
    },
    enabled: !!id,
  });

  const { data: relatedFoods = [] } = useQuery({
    queryKey: ["relatedFoods", food?.location],
    queryFn: async () => {
      if (!food?.location) return [];
      const res = await axios.get(`https://plateshare-beryl.vercel.app/foods`);
      return (res.data || [])
        .filter((f) => f._id !== id && f.location === food.location && f.food_status !== "donated")
        .slice(0, 4);
    },
    enabled: !!food?.location && !!id,
  });

  const requestMutation = useMutation({
    mutationFn: async (newRequest) => {
      const res = await axios.post("https://plateshare-beryl.vercel.app/requests", newRequest);
      return res.data;
    },
    onSuccess: () => {
      toast.success("✅ Request submitted!");
      setShowRequestModal(false);
      setRequestData({ location: "", reason: "", contact: "" });
      queryClient.invalidateQueries(["requests"]);
    },
  });

  const requestActionMutation = useMutation({
    mutationFn: async ({ requestId, status }) => {
      await axios.patch(`https://plateshare-beryl.vercel.app/requests/${requestId}`, { status });
      if (status === "accepted") {
        await axios.patch(`https://plateshare-beryl.vercel.app/foods/${id}`, { food_status: "donated" });
      }
    },
    onSuccess: (_, { status }) => {
      toast.success(`✅ Request ${status}!`);
      queryClient.invalidateQueries(["foodRequests", id]);
      queryClient.invalidateQueries(["food", id]);
    },
    onError: () => {
      toast.error("❌ Failed to update request");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    requestMutation.mutate({
      ...requestData,
      userEmail: user.email,
      userName: user.displayName,
      userPhoto: user.photoURL,
      foodId: id,
      status: "pending",
    });
  };

  if (isLoading) return <p style={{ padding: "20px", textAlign: "center" }}>Loading...</p>;
  if (isError) return <p style={{ padding: "20px", textAlign: "center" }}>Failed to load food details.</p>;

  const images = [food.image, ...(food.additionalImages || [])].filter(Boolean);
  const mainImage = images[currentImageIndex] || food.image;

  return (
    <div style={{ 
      padding: spacing.lg, 
      maxWidth: "1200px", 
      margin: "0 auto",
      backgroundColor: theme.background,
      color: theme.text,
      minHeight: "100vh"
    }}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8" style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: spacing.xl,
        marginBottom: spacing.xl
      }}>
        {/* Image Gallery */}
        <div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            style={{
              width: "100%",
              height: "400px",
              backgroundColor: theme.surfaceLight,
              borderRadius: "12px",
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: spacing.lg,
              border: `2px solid ${theme.border}`
            }}
          >
            <motion.img
              key={currentImageIndex}
              src={mainImage}
              alt={food.name}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover"
              }}
            />
          </motion.div>

          {/* Image Navigation */}
          {images.length > 1 && (
            <div style={{
              display: "flex",
              gap: spacing.sm,
              justifyContent: "center",
              alignItems: "center",
              flexWrap: "wrap"
            }}>
              {/* Previous Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)}
                style={{
                  padding: spacing.sm,
                  backgroundColor: theme.primary,
                  color: "white",
                  border: "none",
                  borderRadius: "50%",
                  width: "44px",
                  height: "44px",
                  cursor: "pointer",
                  fontSize: "18px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.3s"
                }}
              >
                ❮
              </motion.button>

              {/* Thumbnails */}
              <div style={{ display: "flex", gap: spacing.sm, overflowX: "auto", padding: `0 ${spacing.sm}` }}>
                {images.map((img, idx) => (
                  <motion.div
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    whileHover={{ scale: 1.05 }}
                    style={{
                      width: "60px",
                      height: "60px",
                      borderRadius: "8px",
                      overflow: "hidden",
                      cursor: "pointer",
                      border: idx === currentImageIndex ? `3px solid ${theme.primary}` : `2px solid ${theme.border}`,
                      opacity: idx === currentImageIndex ? 1 : 0.6,
                      transition: "all 0.2s",
                      flexShrink: 0
                    }}
                  >
                    <img
                      src={img}
                      alt={`${food.name} ${idx}`}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover"
                      }}
                    />
                  </motion.div>
                ))}
              </div>

              {/* Next Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentImageIndex((prev) => (prev + 1) % images.length)}
                style={{
                  padding: spacing.sm,
                  backgroundColor: theme.primary,
                  color: "white",
                  border: "none",
                  borderRadius: "50%",
                  width: "44px",
                  height: "44px",
                  cursor: "pointer",
                  fontSize: "18px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.3s"
                }}
              >
                ❯
              </motion.button>
            </div>
          )}
        </div>

        {/* Food Details */}
        <div>
          <h2 style={{ fontSize: "28px", fontWeight: "700", marginBottom: spacing.lg }}>{food.name}</h2>
          <div style={{ display: "flex", alignItems: "center", gap: spacing.md, marginBottom: spacing.lg }}>
            <span style={{
              padding: `${spacing.sm} ${spacing.md}`,
              backgroundColor: food.food_status === "donated" ? "#f8d7da" : "#d4edda",
              color: food.food_status === "donated" ? "#721c24" : "#155724",
              borderRadius: "6px",
              fontSize: "14px",
              fontWeight: "600"
            }}>
              {food.food_status === "donated" ? "🎁 Donated" : "✅ Available"}
            </span>
          </div>

          <div style={{ backgroundColor: theme.surfaceLight, padding: spacing.lg, borderRadius: "8px", marginBottom: spacing.lg }}>
            <p style={{ marginBottom: spacing.md, fontSize: "16px" }}>
              <b>Donor:</b> <span style={{ color: theme.primary }}>{food.donor}</span>
            </p>
            <p style={{ marginBottom: spacing.md, fontSize: "16px" }}>
              <b>Quantity:</b> {food.quantity}
            </p>
            <p style={{ marginBottom: spacing.md, fontSize: "16px" }}>
              <b>Location:</b> 📍 {food.location}
            </p>
            <p style={{ fontSize: "16px" }}>
              <b>Description:</b> {food.description}
            </p>
          </div>

          {user && (
            <>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowRequestModal(true)}
                style={{
                  width: "100%",
                  padding: `${spacing.md} ${spacing.lg}`,
                  backgroundColor: theme.primary,
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontSize: "16px",
                  fontWeight: "600",
                  transition: "all 0.3s",
                  minHeight: "44px"
                }}
              >
                🍽️ Request Food
              </motion.button>

              {showRequestModal && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    ...modalStyles.overlay,
                    backgroundColor: "rgba(0, 0, 0, 0.6)"
                  }}
                  onClick={() => setShowRequestModal(false)}
                >
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    style={{
                      ...modalStyles.modal,
                      backgroundColor: theme.background,
                      color: theme.text,
                      border: `2px solid ${theme.border}`
                    }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <h3 style={{ textAlign: "center", fontSize: "20px", fontWeight: "700", marginBottom: spacing.lg }}>Request Food</h3>
                    <form onSubmit={handleSubmit}>
                      <div style={{ marginBottom: spacing.md }}>
                        <label style={{ display: "block", marginBottom: spacing.sm, fontWeight: "600" }}>Pickup Location</label>
                        <input
                          type="text"
                          placeholder="Where can we deliver?"
                          value={requestData.location}
                          onChange={(e) => setRequestData({ ...requestData, location: e.target.value })}
                          required
                          style={{
                            width: "100%",
                            padding: spacing.md,
                            borderRadius: "6px",
                            border: `2px solid ${theme.border}`,
                            backgroundColor: theme.surfaceLight,
                            color: theme.text,
                            fontSize: "16px",
                            fontFamily: "inherit",
                            boxSizing: "border-box",
                            minHeight: "44px"
                          }}
                        />
                      </div>
                      <div style={{ marginBottom: spacing.md }}>
                        <label style={{ display: "block", marginBottom: spacing.sm, fontWeight: "600" }}>Reason</label>
                        <textarea
                          placeholder="Why do you need this food?"
                          value={requestData.reason}
                          onChange={(e) => setRequestData({ ...requestData, reason: e.target.value })}
                          required
                          style={{
                            width: "100%",
                            padding: spacing.md,
                            borderRadius: "6px",
                            border: `2px solid ${theme.border}`,
                            backgroundColor: theme.surfaceLight,
                            color: theme.text,
                            fontSize: "16px",
                            fontFamily: "inherit",
                            minHeight: "80px",
                            boxSizing: "border-box",
                            resize: "vertical"
                          }}
                        ></textarea>
                      </div>
                      <div style={{ marginBottom: spacing.lg }}>
                        <label style={{ display: "block", marginBottom: spacing.sm, fontWeight: "600" }}>Contact Number</label>
                        <input
                          type="text"
                          placeholder="Your phone number"
                          value={requestData.contact}
                          onChange={(e) => setRequestData({ ...requestData, contact: e.target.value })}
                          required
                          style={{
                            width: "100%",
                            padding: spacing.md,
                            borderRadius: "6px",
                            border: `2px solid ${theme.border}`,
                            backgroundColor: theme.surfaceLight,
                            color: theme.text,
                            fontSize: "16px",
                            fontFamily: "inherit",
                            boxSizing: "border-box",
                            minHeight: "44px"
                          }}
                        />
                      </div>
                      <div style={{ display: "flex", gap: spacing.md, justifyContent: "center" }}>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          type="submit"
                          style={{
                            flex: 1,
                            padding: `${spacing.md} ${spacing.lg}`,
                            backgroundColor: theme.primary,
                            color: "white",
                            border: "none",
                            borderRadius: "6px",
                            cursor: "pointer",
                            fontWeight: "600",
                            fontSize: "16px",
                            transition: "all 0.3s",
                            minHeight: "44px"
                          }}
                        >
                          Submit Request
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          type="button"
                          onClick={() => setShowRequestModal(false)}
                          style={{
                            flex: 1,
                            padding: `${spacing.md} ${spacing.lg}`,
                            backgroundColor: theme.error,
                            color: "white",
                            border: "none",
                            borderRadius: "6px",
                            cursor: "pointer",
                            fontWeight: "600",
                            fontSize: "16px",
                            transition: "all 0.3s",
                            minHeight: "44px"
                          }}
                        >
                          Cancel
                        </motion.button>
                      </div>
                    </form>
                  </motion.div>
                </motion.div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Related Foods Section */}
      {relatedFoods.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            marginBottom: spacing.xl,
            padding: spacing.lg,
            backgroundColor: theme.surfaceLight,
            borderRadius: "12px",
            border: `2px solid ${theme.border}`
          }}
        >
          <h3 style={{ fontSize: "22px", fontWeight: "700", marginBottom: spacing.lg }}>🔗 Similar Foods in {food.location}</h3>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: spacing.lg
          }}>
            {relatedFoods.map((relatedFood, idx) => (
              <motion.div
                key={relatedFood._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.3 }}
                style={{
                  backgroundColor: theme.background,
                  borderRadius: "10px",
                  overflow: "hidden",
                  border: `2px solid ${theme.border}`,
                  transition: "all 0.3s",
                  cursor: "pointer"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow = `0 8px 16px rgba(0,0,0,0.15)`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
                onClick={() => window.location.href = `/food/${relatedFood._id}`}
              >
                <div style={{
                  width: "100%",
                  height: "150px",
                  overflow: "hidden",
                  backgroundColor: theme.surfaceLight
                }}>
                  <img
                    src={relatedFood.image}
                    alt={relatedFood.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover"
                    }}
                  />
                </div>
                <div style={{ padding: spacing.md }}>
                  <h4 style={{ fontSize: "16px", fontWeight: "600", marginBottom: spacing.sm }}>{relatedFood.name}</h4>
                  <p style={{ fontSize: "13px", color: theme.textSecondary, marginBottom: spacing.sm }}>
                    📍 {relatedFood.location}
                  </p>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: "13px", color: theme.primary, fontWeight: "600" }}>
                      Qty: {relatedFood.quantity}
                    </span>
                    <span style={{
                      padding: "4px 8px",
                      backgroundColor: relatedFood.food_status === "donated" ? "#f8d7da" : "#d4edda",
                      color: relatedFood.food_status === "donated" ? "#721c24" : "#155724",
                      borderRadius: "4px",
                      fontSize: "11px",
                      fontWeight: "600"
                    }}>
                      {relatedFood.food_status === "donated" ? "Donated" : "Available"}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Food Requests Section (for donor) */}
      {user && food && user.email === food.donorEmail && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          style={{
            marginTop: spacing.xl,
            padding: spacing.lg,
            backgroundColor: theme.surfaceLight,
            borderRadius: "12px",
            border: `2px solid ${theme.border}`
          }}
        >
          <h3 style={{ fontSize: "22px", fontWeight: "700", marginBottom: spacing.lg }}>Food Requests for this item</h3>
          {foodRequests.length === 0 ? (
            <p style={{ color: theme.textSecondary }}>No requests yet.</p>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ backgroundColor: theme.background }}>
                    <th style={{ padding: spacing.md, textAlign: "left", borderBottom: `2px solid ${theme.border}`, fontWeight: "600" }}>Requester Name</th>
                    <th style={{ padding: spacing.md, textAlign: "left", borderBottom: `2px solid ${theme.border}`, fontWeight: "600" }}>Email</th>
                    <th style={{ padding: spacing.md, textAlign: "left", borderBottom: `2px solid ${theme.border}`, fontWeight: "600" }}>Location</th>
                    <th style={{ padding: spacing.md, textAlign: "left", borderBottom: `2px solid ${theme.border}`, fontWeight: "600" }}>Reason</th>
                    <th style={{ padding: spacing.md, textAlign: "left", borderBottom: `2px solid ${theme.border}`, fontWeight: "600" }}>Contact</th>
                    <th style={{ padding: spacing.md, textAlign: "left", borderBottom: `2px solid ${theme.border}`, fontWeight: "600" }}>Status</th>
                    <th style={{ padding: spacing.md, textAlign: "left", borderBottom: `2px solid ${theme.border}`, fontWeight: "600" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {foodRequests.map((req) => (
                    <tr key={req._id} style={{ borderBottom: `1px solid ${theme.border}` }}>
                      <td style={{ padding: spacing.md }}><b>{req.userName}</b></td>
                      <td style={{ padding: spacing.md }}>{req.userEmail}</td>
                      <td style={{ padding: spacing.md }}>{req.location}</td>
                      <td style={{ padding: spacing.md, maxWidth: "150px", overflow: "hidden", textOverflow: "ellipsis" }}>{req.reason}</td>
                      <td style={{ padding: spacing.md }}>{req.contact}</td>
                      <td style={{ padding: spacing.md }}>
                        <span style={{
                          padding: "4px 8px",
                          borderRadius: "4px",
                          backgroundColor: req.status === "accepted" ? "#d4edda" : req.status === "rejected" ? "#f8d7da" : "#cfe2ff",
                          color: req.status === "accepted" ? "#155724" : req.status === "rejected" ? "#721c24" : "#004085",
                          fontSize: "12px",
                          fontWeight: "600"
                        }}>
                          {req.status}
                        </span>
                      </td>
                      <td style={{ padding: spacing.md }}>
                        {req.status === "pending" && (
                          <div style={{ display: "flex", gap: spacing.sm }}>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => requestActionMutation.mutate({ requestId: req._id, status: "accepted" })}
                              style={{
                                padding: `${spacing.sm} ${spacing.md}`,
                                backgroundColor: "#28a745",
                                color: "white",
                                border: "none",
                                borderRadius: "4px",
                                cursor: "pointer",
                                transition: "background 0.2s",
                                fontSize: "14px",
                                fontWeight: "600",
                                minHeight: "36px",
                                minWidth: "70px"
                              }}
                              onMouseEnter={(e) => e.target.style.backgroundColor = "#218838"}
                              onMouseLeave={(e) => e.target.style.backgroundColor = "#28a745"}
                            >
                              Accept
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => requestActionMutation.mutate({ requestId: req._id, status: "rejected" })}
                              style={{
                                padding: `${spacing.sm} ${spacing.md}`,
                                backgroundColor: "#dc3545",
                                color: "white",
                                border: "none",
                                borderRadius: "4px",
                                cursor: "pointer",
                                transition: "background 0.2s",
                                fontSize: "14px",
                                fontWeight: "600",
                                minHeight: "36px",
                                minWidth: "70px"
                              }}
                              onMouseEnter={(e) => e.target.style.backgroundColor = "#c82333"}
                              onMouseLeave={(e) => e.target.style.backgroundColor = "#dc3545"}
                            >
                              Reject
                            </motion.button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}

const modalStyles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  modal: {
    padding: "20px",
    borderRadius: "8px",
    width: "90%",
    maxWidth: "400px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
  },
};
