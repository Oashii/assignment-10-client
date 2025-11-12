import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchFoods = async () => {
  const res = await axios.get("http://localhost:3000/foods");
  return res.data;
};

export default function FoodList() {
  const { data: foods = [], isLoading, isError } = useQuery({
    queryKey: ["foods"],
    queryFn: fetchFoods,
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong!</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Available Foods 🍱</h2>
      <div style={{ display: "grid", gap: "20px", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))" }}>
        {foods.map((food) => (
          <div
            key={food._id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "10px",
              padding: "10px",
              background: "#f9f9f9",
            }}
          >
            {food.image && (
              <img
                src={food.image}
                alt={food.name}
                style={{ width: "100%", height: "150px", objectFit: "cover", borderRadius: "5px" }}
              />
            )}
            <h3>{food.name}</h3>
            <p><b>Donor:</b> {food.donor}</p>
            <p><b>Location:</b> {food.location}</p>
            <p><b>Quantity:</b> {food.quantity}</p>
            <p>{food.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
