import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import API_BASE_URL from "../api";

export default function FoodRequests() {
  const { user } = useContext(AuthContext);

 
  const { data: userRequests = [], isLoading, isError } = useQuery({
    queryKey: ["myRequests", user?.email],
    queryFn: async () => {
      const res = await axios.get(`${API_BASE_URL}/requests`);
   
      const filteredRequests = res.data.filter((req) => req.userEmail === user.email);
      

      const requestsWithFoodDetails = await Promise.all(
        filteredRequests.map(async (req) => {
          try {
            const foodRes = await axios.get(`${API_BASE_URL}/foods/${req.foodId}`);
            return { ...req, foodDetails: foodRes.data };
          } catch {
            return { ...req, foodDetails: null };
          }
        })
      );
      
      return requestsWithFoodDetails;
    },
    enabled: !!user?.email,
  });

  if (isLoading) return <p>Loading your requests...</p>;
  if (isError) return <p>Failed to load requests.</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>My Food Requests</h2>
      {userRequests.length === 0 ? (
        <p>You haven't requested any food yet.</p>
      ) : (
        <div style={{ display: "grid", gap: "20px", gridTemplateColumns: "repeat(3, 1fr)", alignItems: "start" }}>
          {userRequests.map((req) => (
            <div
              key={req._id}
              style={{
                border: "1px solid #ccc",
                borderRadius: "10px",
                padding: "15px",
                background: "#f9f9f9",
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
              {req.foodDetails?.image && (
                <img
                  src={req.foodDetails.image}
                  alt={req.foodDetails.name}
                  style={{ width: "100%", height: "180px", objectFit: "cover", borderRadius: "5px", display: "block", marginBottom: "10px" }}
                />
              )}
              <h3>{req.foodDetails?.name || "Unknown Food"}</h3>
              <p>{req.foodDetails?.description}</p>
              <p style={{ marginTop: "15px" }}>
                <b>Status:</b>{" "}
                <span style={{
                  padding: "4px 8px",
                  borderRadius: "4px",
                  backgroundColor: req.status === "accepted" ? "#d4edda" : req.status === "rejected" ? "#f8d7da" : "#cfe2ff",
                  color: req.status === "accepted" ? "#155724" : req.status === "rejected" ? "#721c24" : "#004085"
                }}>
                  {req.status}
                </span>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
