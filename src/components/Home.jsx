import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import bannerImage from "../assets/banner.jpg";

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
      <div
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
        <h1 style={{ fontSize: "48px", marginBottom: "20px", fontWeight: "bold" }}>
          Share Food, Build Community, Reduce Waste
        </h1>
        <p style={{ fontSize: "18px", marginBottom: "30px", maxWidth: "600px" }}>
          Connect with neighbors to share surplus food, reduce waste, and strengthen your local community.
        </p>
        <div style={{ display: "flex", gap: "15px", justifyContent: "center" }}>
          <Link to="/foods" style={{ textDecoration: "none" }}>
            <button style={{ padding: "12px 30px", fontSize: "16px", backgroundColor: "#28a745", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}>
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
            style={{ padding: "12px 30px", fontSize: "16px", backgroundColor: "#28a745", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}
          >
            Donate Food
          </button>
        </div>
      </div>

      {/* Featured Foods Section */}
      <div style={{ padding: "20px" }}>
        <h2>Featured Foods</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
          {featured.map((food) => (
            <div key={food._id} style={{ border: "1px solid #ccc", borderRadius: "10px", padding: "10px" }}>
              <img src={food.image} alt={food.name} style={{ width: "100%", height: "250px", objectFit: "cover", borderRadius: "10px" }} />
              <h3>{food.name}</h3>
              <p><b>Donor:</b> {food.donor}</p>
              <p><b>Quantity:</b> {food.quantity}</p>
              <p><b>Location:</b> {food.location}</p>
              <Link to={`/food/${food._id}`}>
                <button style={{ marginTop: "10px" }}>View Details</button>
              </Link>
            </div>
          ))}
        </div>

        <div style={{ marginTop: "20px" }}>
          <Link to="/foods">
            <button>Show All Foods</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
