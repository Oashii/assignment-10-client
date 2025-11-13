import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import bannerImage from "../assets/banner.jpg";
import { motion } from "framer-motion";

const fetchFoods = async () => {
  const res = await axios.get("http://localhost:3000/foods");
  return res.data;
};

export default function Home() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { data: foods = [], isLoading, isError } = useQuery({
    queryKey: ["foods"],
    queryFn: fetchFoods,
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong!</p>;

  // sort foods by quantity (assumes quantity string like "Serves 5 people")
  const sortedFoods = [...foods].sort((a, b) => {
    const numA = parseInt(a.quantity.replace(/\D/g, "")) || 0;
    const numB = parseInt(b.quantity.replace(/\D/g, "")) || 0;
    return numB - numA;
  });

  const featured = sortedFoods.slice(0, 6);

  return (
    <div>
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
          padding: "20px",
        }}
      >
        <motion.h1
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{ fontSize: "48px", marginBottom: "20px", fontWeight: "bold" }}>
          Share Food, Build Community, Reduce Waste
        </motion.h1>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          style={{ fontSize: "18px", marginBottom: "30px", maxWidth: "600px" }}>
          Connect with neighbors to share surplus food, reduce waste, and strengthen your local community.
        </motion.p>
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          style={{ display: "flex", gap: "15px", justifyContent: "center" }}>
          <Link to="/foods" style={{ textDecoration: "none" }}>
            <button style={{ padding: "12px 30px", fontSize: "16px", backgroundColor: "#28a745", color: "white", border: "none", borderRadius: "5px", cursor: "pointer", transition: "background 0.3s" }} onMouseEnter={(e) => e.target.style.backgroundColor = "#218838"} onMouseLeave={(e) => e.target.style.backgroundColor = "#28a745"}>
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
            style={{ padding: "12px 30px", fontSize: "16px", backgroundColor: "#28a745", color: "white", border: "none", borderRadius: "5px", cursor: "pointer", transition: "background 0.3s" }}
            onMouseEnter={(e) => e.target.style.backgroundColor = "#218838"}
            onMouseLeave={(e) => e.target.style.backgroundColor = "#28a745"}
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
        style={{ padding: "20px" }}>
        <h2 style={{textAlign: "center"}}>Featured Foods</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
          {featured.map((food, index) => (
            <motion.div
              key={food._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              style={{ border: "1px solid #ccc", borderRadius: "10px", padding: "10px" }}>
              <img src={food.image} alt={food.name} style={{ width: "100%", height: "250px", objectFit: "cover", borderRadius: "10px" }} />
              <h3>{food.name}</h3>
              <p><b>Donor:</b> {food.donor}</p>
              <p><b>Quantity:</b> {food.quantity}</p>
              <p><b>Location:</b> {food.location}</p>
              <Link to={`/food/${food._id}`}>
                <button style={{ marginTop: "10px", padding: "8px 16px", backgroundColor: "#28a745", color: "white", border: "none", borderRadius: "5px", cursor: "pointer", transition: "background 0.3s" }} onMouseEnter={(e) => e.target.style.backgroundColor = "#218838"} onMouseLeave={(e) => e.target.style.backgroundColor = "#28a745"}>View Details</button>
              </Link>
            </motion.div>
          ))}
        </div>

        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <Link to="/foods">
            <button style={{ padding: "10px 20px", backgroundColor: "#28a745", color: "white", border: "none", borderRadius: "5px", cursor: "pointer", transition: "background 0.3s" }} onMouseEnter={(e) => e.target.style.backgroundColor = "#218838"} onMouseLeave={(e) => e.target.style.backgroundColor = "#28a745"}>Show All Foods</button>
          </Link>
        </div>
      </motion.div>

      {/* How It Works Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        style={{ padding: "60px 20px", backgroundColor: "#f8f9fa" }}>
        <h2 style={{ textAlign: "center", marginBottom: "50px", fontSize: "32px", fontWeight: "bold", color: "#333" }}>How It Works</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "40px", maxWidth: "1200px", margin: "0 auto" }}>
          {/* Step 1 */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            style={{
              backgroundColor: "#fff",
              padding: "30px 25px",
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              textAlign: "center",
              transition: "transform 0.3s, box-shadow 0.3s"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-8px)";
              e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.08)";
            }}>
            <div style={{ fontSize: "48px", marginBottom: "15px", color: "#28a745" }}>📤</div>
            <h3 style={{ fontSize: "20px", marginBottom: "15px", color: "#333" }}>Post Food</h3>
            <p style={{ fontSize: "14px", color: "#666", lineHeight: "1.6" }}>Share your surplus food with the community. Upload photos, describe the food, and let others know what's available.</p>
          </motion.div>

          {/* Step 2 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            style={{
              backgroundColor: "#fff",
              padding: "30px 25px",
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              textAlign: "center",
              transition: "transform 0.3s, box-shadow 0.3s"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-8px)";
              e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.08)";
            }}>
            <div style={{ fontSize: "48px", marginBottom: "15px", color: "#28a745" }}>🔍</div>
            <h3 style={{ fontSize: "20px", marginBottom: "15px", color: "#333" }}>Find Food</h3>
            <p style={{ fontSize: "14px", color: "#666", lineHeight: "1.6" }}>Browse available foods in your neighborhood. Filter by location, type, and quantity to find what you need.</p>
          </motion.div>

          {/* Step 3 */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
            style={{
              backgroundColor: "#fff",
              padding: "30px 25px",
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              textAlign: "center",
              transition: "transform 0.3s, box-shadow 0.3s"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-8px)";
              e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.08)";
            }}>
            <div style={{ fontSize: "48px", marginBottom: "15px", color: "#28a745" }}>🤝</div>
            <h3 style={{ fontSize: "20px", marginBottom: "15px", color: "#333" }}>Collect Food</h3>
            <p style={{ fontSize: "14px", color: "#666", lineHeight: "1.6" }}>Connect with donors, arrange pickup, and collect your food. Build meaningful relationships with your neighbors.</p>
          </motion.div>
        </div>
      </motion.div>

      {/* Community Stats Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        style={{ padding: "60px 20px" }}>
        <h2 style={{ textAlign: "center", marginBottom: "50px", fontSize: "32px", fontWeight: "bold", color: "#333" }}>Community Impact</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "30px", maxWidth: "1200px", margin: "0 auto" }}>
          {/* Stat 1: Foods Shared */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            style={{
              backgroundColor: "#e8f5e9",
              padding: "40px 25px",
              borderRadius: "12px",
              textAlign: "center",
              border: "2px solid #28a745",
              transition: "transform 0.3s, box-shadow 0.3s"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
              e.currentTarget.style.boxShadow = "0 8px 20px rgba(40, 167, 69, 0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "none";
            }}>
            <div style={{ fontSize: "36px", fontWeight: "bold", color: "#28a745", marginBottom: "10px" }}>2,450+</div>
            <p style={{ fontSize: "16px", color: "#333", fontWeight: "500" }}>Foods Shared</p>
            <p style={{ fontSize: "12px", color: "#666", marginTop: "5px" }}>Meals made available</p>
          </motion.div>

          {/* Stat 2: Active Members */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            style={{
              backgroundColor: "#e3f2fd",
              padding: "40px 25px",
              borderRadius: "12px",
              textAlign: "center",
              border: "2px solid #2196f3",
              transition: "transform 0.3s, box-shadow 0.3s"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
              e.currentTarget.style.boxShadow = "0 8px 20px rgba(33, 150, 243, 0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "none";
            }}>
            <div style={{ fontSize: "36px", fontWeight: "bold", color: "#2196f3", marginBottom: "10px" }}>1,850+</div>
            <p style={{ fontSize: "16px", color: "#333", fontWeight: "500" }}>Active Members</p>
            <p style={{ fontSize: "12px", color: "#666", marginTop: "5px" }}>Growing community</p>
          </motion.div>

          {/* Stat 3: Food Waste Reduced */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            style={{
              backgroundColor: "#fff3e0",
              padding: "40px 25px",
              borderRadius: "12px",
              textAlign: "center",
              border: "2px solid #ff9800",
              transition: "transform 0.3s, box-shadow 0.3s"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
              e.currentTarget.style.boxShadow = "0 8px 20px rgba(255, 152, 0, 0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "none";
            }}>
            <div style={{ fontSize: "36px", fontWeight: "bold", color: "#ff9800", marginBottom: "10px" }}>12.5T</div>
            <p style={{ fontSize: "16px", color: "#333", fontWeight: "500" }}>Food Waste Reduced</p>
            <p style={{ fontSize: "12px", color: "#666", marginTop: "5px" }}>Tons saved from landfill</p>
          </motion.div>

          {/* Stat 4: Cities Connected */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            style={{
              backgroundColor: "#f3e5f5",
              padding: "40px 25px",
              borderRadius: "12px",
              textAlign: "center",
              border: "2px solid #9c27b0",
              transition: "transform 0.3s, box-shadow 0.3s"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
              e.currentTarget.style.boxShadow = "0 8px 20px rgba(156, 39, 176, 0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "none";
            }}>
            <div style={{ fontSize: "36px", fontWeight: "bold", color: "#9c27b0", marginBottom: "10px" }}>45+</div>
            <p style={{ fontSize: "16px", color: "#333", fontWeight: "500" }}>Cities Connected</p>
            <p style={{ fontSize: "12px", color: "#666", marginTop: "5px" }}>Spreading worldwide</p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
