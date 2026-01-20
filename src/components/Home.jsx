import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { ThemeContext } from "../provider/ThemeProvider";
import bannerImage from "../assets/banner.jpg";
import { motion } from "framer-motion";
import { spacing } from "../theme/theme";
import Loader from "./Loader";
import API_BASE_URL from "../api";

const fetchFoods = async () => {
  const res = await axios.get(`${API_BASE_URL}/foods`);
  return res.data;
};

export default function Home() {
  const { user } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const { data: foods = [], isLoading, isError } = useQuery({
    queryKey: ["foods"],
    queryFn: fetchFoods,
  });

  if (isLoading) return <Loader variant="grid" />;
  if (isError) return <div style={{ color: theme.error, padding: spacing.lg, textAlign: "center" }}>Error loading foods!</div>;


  const sortedFoods = [...foods].sort((a, b) => {
    const numA = parseInt(a.quantity.replace(/\D/g, "")) || 0;
    const numB = parseInt(b.quantity.replace(/\D/g, "")) || 0;
    return numB - numA;
  });

  const featured = sortedFoods.slice(0, 6);

  return (
    <div style={{ backgroundColor: theme.background, transition: "background-color 0.3s" }}>
      {/* Banner Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(0, 0, 0, 0.5) 0%, rgba(40, 167, 69, 0.4) 100%), url(${bannerImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "500px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          color: "white",
          padding: spacing.lg,
        }}
      >
        <motion.h1
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{ fontSize: "48px", marginBottom: spacing.lg, fontWeight: "bold" }}>
          Share Food, Build Community, Reduce Waste
        </motion.h1>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          style={{ fontSize: "18px", marginBottom: spacing.lg, maxWidth: "600px" }}>
          Connect with neighbors to share surplus food, reduce waste, and strengthen your local community.
        </motion.p>
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          style={{ display: "flex", gap: spacing.md, justifyContent: "center", flexWrap: "wrap" }}>
          <Link to="/foods" style={{ textDecoration: "none" }}>
            <button style={{
              padding: `${spacing.md} ${spacing.lg}`,
              fontSize: "16px",
              backgroundColor: theme.primary,
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
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
              Browse Available Food
            </button>
          </Link>
          <button
            onClick={() => {
              if (user) {
                navigate("/add-food");
              } else {
                navigate("/login");
              }
            }}
            style={{
              padding: `${spacing.md} ${spacing.lg}`,
              fontSize: "16px",
              backgroundColor: theme.secondary,
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
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
            }}
          >
            Donate Food
          </button>
        </motion.div>
      </motion.div>

      {/* Featured Foods Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        style={{ padding: spacing.lg, backgroundColor: theme.background }}>
        <h2 style={{ textAlign: "center", color: theme.text, marginBottom: spacing.lg }}>Featured Foods</h2>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: spacing.lg,
          maxWidth: "1200px",
          margin: "0 auto"
        }}>
          {featured.map((food, index) => (
            <motion.div
              key={food._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              style={{
                border: `1px solid ${theme.border}`,
                borderRadius: "10px",
                padding: spacing.md,
                backgroundColor: theme.surfaceLight,
                cursor: "pointer",
                transition: "all 0.3s",
                height: "100%",
                display: "flex",
                flexDirection: "column"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-8px)";
                e.currentTarget.style.boxShadow = "0 12px 24px rgba(0,0,0,0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}>
              <img src={food.image} alt={food.name} style={{
                width: "100%",
                height: "200px",
                objectFit: "cover",
                borderRadius: "8px",
                marginBottom: spacing.md
              }} />
              <h3 style={{ color: theme.text, marginBottom: spacing.sm }}>{food.name}</h3>
              <p style={{ color: theme.textLight, marginBottom: spacing.sm }}><b>Donor:</b> {food.donor}</p>
              <p style={{ color: theme.textLight, marginBottom: spacing.sm }}><b>Quantity:</b> {food.quantity}</p>
              <p style={{ color: theme.textLight, marginBottom: spacing.md }}><b>Location:</b> {food.location}</p>
              <Link to={`/food/${food._id}`} style={{ textDecoration: "none", marginTop: "auto" }}>
                <button style={{
                  width: "100%",
                  marginTop: spacing.md,
                  padding: `${spacing.sm} ${spacing.md}`,
                  backgroundColor: theme.primary,
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  transition: "all 0.3s"
                }}
                onMouseEnter={(e) => e.target.style.opacity = "0.9"}
                onMouseLeave={(e) => e.target.style.opacity = "1"}>
                  View Details
                </button>
              </Link>
            </motion.div>
          ))}
        </div>

        <div style={{ marginTop: "60px", paddingTop: spacing.xl, textAlign: "center" }}>
          <Link to="/foods" style={{ textDecoration: "none" }}>
            <button style={{
              padding: `${spacing.sm} ${spacing.lg}`,
              backgroundColor: theme.primary,
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              transition: "all 0.3s",
              fontSize: "16px"
            }}
            onMouseEnter={(e) => {
              e.target.style.opacity = "0.9";
              e.target.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.target.style.opacity = "1";
              e.target.style.transform = "translateY(0)";
            }}>
              Show All Foods
            </button>
          </Link>
        </div>
      </motion.div>

      {/* How It Works Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        style={{ padding: spacing.xl, backgroundColor: theme.surfaceLight }}>
        <h2 style={{
          textAlign: "center",
          marginBottom: spacing.xl,
          fontSize: "32px",
          fontWeight: "bold",
          color: theme.text
        }}>How It Works</h2>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: spacing.xl,
          maxWidth: "1200px",
          margin: "0 auto"
        }}>
          {[
            { icon: "📤", title: "Post Food", desc: "Share your surplus food with the community. Upload photos, describe the food, and let others know what's available." },
            { icon: "🔍", title: "Find Food", desc: "Browse available foods in your neighborhood. Filter by location, type, and quantity to find what you need." },
            { icon: "🤝", title: "Collect Food", desc: "Connect with donors, arrange pickup, and collect your food. Build meaningful relationships with your neighbors." }
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: idx === 0 ? -30 : idx === 2 ? 30 : 0, y: idx === 1 ? 30 : 0 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.6, delay: (idx * 0.2) }}
              viewport={{ once: true }}
              style={{
                backgroundColor: theme.background,
                padding: spacing.lg,
                borderRadius: "12px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                textAlign: "center",
                transition: "all 0.3s"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-8px)";
                e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.08)";
              }}>
              <div style={{ fontSize: "48px", marginBottom: spacing.md }}>{item.icon}</div>
              <h3 style={{ fontSize: "20px", marginBottom: spacing.md, color: theme.text }}>{item.title}</h3>
              <p style={{ fontSize: "14px", color: theme.textLight, lineHeight: "1.6" }}>{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Community Stats Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        style={{ padding: spacing.xl, backgroundColor: theme.background }}>
        <h2 style={{
          textAlign: "center",
          marginBottom: spacing.xl,
          fontSize: "32px",
          fontWeight: "bold",
          color: theme.text
        }}>Community Impact</h2>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: spacing.lg,
          maxWidth: "1200px",
          margin: "0 auto"
        }}>
          {[
            { num: "2,450+", label: "Foods Shared", sub: "Meals made available", color: theme.success },
            { num: "1,850+", label: "Active Members", sub: "Growing community", color: theme.secondary },
            { num: "12.5T", label: "Food Waste Reduced", sub: "Tons saved from landfill", color: theme.warning },
            { num: "45+", label: "Cities Connected", sub: "Spreading worldwide", color: theme.accent }
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              viewport={{ once: true }}
              style={{
                backgroundColor: theme.surfaceLight,
                padding: spacing.lg,
                borderRadius: "12px",
                textAlign: "center",
                borderLeft: `4px solid ${stat.color}`,
                transition: "all 0.3s"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
                e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "none";
              }}>
              <div style={{ fontSize: "36px", fontWeight: "bold", color: stat.color, marginBottom: spacing.sm }}>{stat.num}</div>
              <p style={{ fontSize: "16px", color: theme.text, fontWeight: "500" }}>{stat.label}</p>
              <p style={{ fontSize: "12px", color: theme.textLight, marginTop: "5px" }}>{stat.sub}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
