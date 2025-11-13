import { useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../provider/AuthProvider";

export default function FoodDetails() {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const queryClient = useQueryClient();
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [requestData, setRequestData] = useState({
    location: "",
    reason: "",
    contact: "",
  });

  // Fetch single food
  const { data: food, isLoading, isError } = useQuery({
    queryKey: ["food", id],
    queryFn: async () => {
      const res = await axios.get(`https://plateshare-beryl.vercel.app/foods/${id}`);
      return res.data;
    },
  });

  // Fetch requests for this specific food
  const { data: foodRequests = [] } = useQuery({
    queryKey: ["foodRequests", id],
    queryFn: async () => {
      const res = await axios.get(`https://plateshare-beryl.vercel.app/requests`);
      // Filter requests to only show those for this specific food
      return (res.data || []).filter((req) => req.foodId === id);
    },
    enabled: !!id,
  });

  // Submit request mutation
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

  // Mutation for accepting/rejecting requests
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

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Failed to load food details.</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>{food.name}</h2>
      <img src={food.image} alt={food.name} style={{ maxWidth: "300px" }} />
      <p><b>Donor:</b> {food.donor}</p>
      <p><b>Quantity:</b> {food.quantity}</p>
      <p><b>Location:</b> {food.location}</p>
      <p><b>Status:</b> {food.food_status === "donated" ? "Donated" : "Available"}</p>
      <p>{food.description}</p>

      {user && (
        <>
          <button style={{background: "#28a745", color: "white", border: "none", padding: "8px 12px", borderRadius: "5px", cursor: "pointer"}} onClick={() => setShowRequestModal(true)}>Request Food</button>

          {showRequestModal && (
            <div style={modalStyles.overlay}>
              <div style={modalStyles.modal}>
                <h3 style={{textAlign:"center"}}>Request Food</h3>
                <form onSubmit={handleSubmit}>
                  <div style={{display:"flex", gap:"5px", alignItems:"center", justifyContent:"center"}}>
                    <p>Location:</p>
                    <input
                    type="text"
                    placeholder="Your Pickup Location"
                    value={requestData.location}
                    onChange={(e) => setRequestData({ ...requestData, location: e.target.value })}
                    required
                  />
                  </div>
                  <br />
                  <div style={{display:"flex", gap:"5px", alignItems:"center", justifyContent:"center"}}>
                    <p>Reason:</p>
                    <textarea
                    placeholder="Why do you need this food?"
                    value={requestData.reason}
                    onChange={(e) => setRequestData({ ...requestData, reason: e.target.value })}
                    required
                  ></textarea>
                  </div>
                  <br />
                  <div style={{display:"flex", gap:"5px", alignItems:"center", justifyContent:"center"}}>
                    <p>Contact:</p>
                    <input
                    type="text"
                    placeholder="Your Contact Number"
                    value={requestData.contact}
                    onChange={(e) => setRequestData({ ...requestData, contact: e.target.value })}
                    required
                  />
                  </div>
                  <br />
                  <div style={{ marginTop: "10px", textAlign: "center" }}>
                    <button type="submit" style={{background: "#28a745", color: "white", border: "none", padding: "8px 12px", borderRadius: "5px", cursor: "pointer"}}>Submit Request</button>
                    <button type="button" onClick={() => setShowRequestModal(false)} style={{ marginLeft: "10px", background: "#dc3545", color: "white", border: "none", padding: "8px 12px", borderRadius: "5px", cursor: "pointer" }}>
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </>
      )}

      {/* Food Requests Table - Only visible to food owner */}
      {user && food && user.email === food.donorEmail && (
        <div style={{ marginTop: "40px" }}>
          <h3>Food Requests for this item</h3>
          {foodRequests.length === 0 ? (
            <p>No requests yet.</p>
          ) : (
            <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
              <thead>
                <tr style={{ backgroundColor: "#f5f5f5" }}>
                  <th style={{ padding: "12px", textAlign: "left", borderBottom: "2px solid #ccc" }}>Requester Name</th>
                  <th style={{ padding: "12px", textAlign: "left", borderBottom: "2px solid #ccc" }}>Email</th>
                  <th style={{ padding: "12px", textAlign: "left", borderBottom: "2px solid #ccc" }}>Pickup Location</th>
                  <th style={{ padding: "12px", textAlign: "left", borderBottom: "2px solid #ccc" }}>Reason</th>
                  <th style={{ padding: "12px", textAlign: "left", borderBottom: "2px solid #ccc" }}>Contact</th>
                  <th style={{ padding: "12px", textAlign: "left", borderBottom: "2px solid #ccc" }}>Status</th>
                  <th style={{ padding: "12px", textAlign: "left", borderBottom: "2px solid #ccc" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {foodRequests.map((req) => (
                  <tr key={req._id} style={{ borderBottom: "1px solid #eee" }}>
                    <td style={{ padding: "12px" }}><b>{req.userName}</b></td>
                    <td style={{ padding: "12px" }}>{req.userEmail}</td>
                    <td style={{ padding: "12px" }}>{req.location}</td>
                    <td style={{ padding: "12px" }}>{req.reason}</td>
                    <td style={{ padding: "12px" }}>{req.contact}</td>
                    <td style={{ padding: "12px" }}>
                      <span style={{
                        padding: "4px 8px",
                        borderRadius: "4px",
                        backgroundColor: req.status === "accepted" ? "#d4edda" : req.status === "rejected" ? "#f8d7da" : "#cfe2ff",
                        color: req.status === "accepted" ? "#155724" : req.status === "rejected" ? "#721c24" : "#004085"
                      }}>
                        {req.status}
                      </span>
                    </td>
                    <td style={{ padding: "12px" }}>
                      {req.status === "pending" && (
                        <>
                          <button
                            onClick={() => requestActionMutation.mutate({ requestId: req._id, status: "accepted" })}
                            style={{
                              marginRight: "5px",
                              padding: "6px 12px",
                              backgroundColor: "#28a745",
                              color: "white",
                              border: "none",
                              borderRadius: "4px",
                              cursor: "pointer",
                              transition: "background 0.2s"
                            }}
                            onMouseEnter={(e) => e.target.style.backgroundColor = "#218838"}
                            onMouseLeave={(e) => e.target.style.backgroundColor = "#28a745"}
                          >
                            Accept
                          </button>
                          <button
                            onClick={() => requestActionMutation.mutate({ requestId: req._id, status: "rejected" })}
                            style={{
                              padding: "6px 12px",
                              backgroundColor: "#dc3545",
                              color: "white",
                              border: "none",
                              borderRadius: "4px",
                              cursor: "pointer",
                              transition: "background 0.2s"
                            }}
                            onMouseEnter={(e) => e.target.style.backgroundColor = "#c82333"}
                            onMouseLeave={(e) => e.target.style.backgroundColor = "#dc3545"}
                          >
                            Reject
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
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
    background: "#fff",
    padding: "20px",
    borderRadius: "8px",
    width: "90%",
    maxWidth: "400px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
  },
};
