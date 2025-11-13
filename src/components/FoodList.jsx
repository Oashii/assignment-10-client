import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";
import Loader from "./Loader";


const fetchFoods = async () => {
  const res = await axios.get("https://plateshare-beryl.vercel.app/foods");
  return res.data;
};

export default function FoodList() {
  const { data: foods = [], isLoading, isError } = useQuery({
    queryKey: ["foods"],
    queryFn: fetchFoods,
  });

  if (isLoading) return <Loader />;
  if (isError) return <p>Something went wrong!</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Available Foods</h2>
  <div style={{ display: "grid", gap: "20px", gridTemplateColumns: "repeat(3, 1fr)", alignItems: "start" }}>
        {foods.map((food) => (
          <Link
            to={`/food/${food._id}`}
            key={food._id}
            style={{ textDecoration: "none", color: "inherit", display: "block" }}
          >
            <div
              style={{
                border: "1px solid #ccc",
                borderRadius: "10px",
                padding: "10px",
                background: "#f9f9f9",
                cursor: "pointer",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              {food.image && (
                <img
                  src={food.image}
                  alt={food.name}
                  style={{ width: "100%", height: "180px", objectFit: "cover", borderRadius: "5px", display: "block" }}
                />
              )}
              <h3>{food.name}</h3>
              <p><b>Donator:</b> {food.donor} {food.donorPhotoURL && <img src={food.donorPhotoURL} alt={food.donor} style={{ width: "30px", height: "30px", borderRadius: "50%", display: "inline-block", marginLeft: "10px", verticalAlign: "middle" }} />}</p>
              <p><b>Location:</b> {food.location}</p>
              <p><b>Quantity:</b> {food.quantity}</p>
              <p><b>Status:</b> {food.food_status === "donated" ? "Donated" : "Available"}</p>
              {food.expireDate && <p><b>Expire Date:</b> {new Date(food.expireDate).toLocaleDateString()}</p>}
              <p>{food.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
