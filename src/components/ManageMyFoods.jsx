import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../provider/AuthProvider";

export default function ManageMyFoods() {
  const { user, loading } = useContext(AuthContext);
  const queryClient = useQueryClient();

  const [editingFood, setEditingFood] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    quantity: "",
    location: "",
    description: "",
  });

  const { data: foods = [], isLoading, isError } = useQuery({
    queryKey: ["myFoods", user?.email],
    queryFn: async () => {
      const res = await axios.get("https://plateshare-beryl.vercel.app/foods");
      return res.data.filter((food) => food.donorEmail === user.email);
    },
    enabled: !!user,
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axios.delete(`https://plateshare-beryl.vercel.app/foods/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["myFoods", user?.email]);
      toast.success("Food deleted successfully!");
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, updates }) => {
      const res = await axios.patch(`https://plateshare-beryl.vercel.app/foods/${id}`, updates);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["myFoods", user?.email]);
      toast.success("Food updated successfully!");
      setEditingFood(null);
      setFormData({ name: "", quantity: "", location: "", description: "" });
    },
  });

  const openEditModal = (food) => {
    setEditingFood(food._id);
    setFormData({
      name: food.name,
      quantity: food.quantity,
      location: food.location,
      description: food.description,
    });
  };

  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    updateMutation.mutate({ id: editingFood, updates: formData });
  };

  if (loading) return <p>Loading...</p>;
  if (!user) return <p>Please login to manage your foods.</p>;
  if (isLoading) return <p>Loading your foods...</p>;
  if (isError) return <p>Failed to load foods.</p>;

  return (
    <div>
      <h2 style={{textAlign:"center"}}>Manage My Foods</h2>
    <div style={{ padding: "20px", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px" }}>
      
      {foods.length === 0 && <p>No foods added yet.</p>}

      {foods.map((food) => (
        <div
          key={food._id}
          style={{
            border: "1px solid #ccc",
            borderRadius: "10px",
            padding: "10px",
            marginTop: "10px",
            
          }}
        >
          <img src={food.image} alt={food.name} style={{ width: "100%", height: "250px", objectFit: "cover", borderRadius: "10px" }} />
          <h3>{food.name}</h3>
          <p><b>Location:</b> {food.location}</p>
          <p><b>Quantity:</b> {food.quantity}</p>
          <p>{food.description}</p>
          <div style={{textAlign:"center"}}>
            <button
            onClick={() => {
              if (confirm("Are you sure you want to delete this food?")) {
                deleteMutation.mutate(food._id);
              }
            }}
            style={{ marginRight: "10px", background: "#dc3545", color: "white", border: "none", padding: "8px 12px", borderRadius: "5px", cursor: "pointer" }}
          >
            Delete
          </button>
          <button onClick={() => openEditModal(food)} style={{background: "#28a745", color: "white", border: "none", padding: "8px 12px", borderRadius: "5px", cursor: "pointer"}}>Update</button>
          </div>
        </div>
      ))}

      {/* Modal */}
      {editingFood && (
        <div style={{
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
        }}>
          <div style={{
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "10px",
            width: "400px",
            position: "relative",
            textAlign: "center"
          }}>
            <h3>Update Food</h3>
            <form onSubmit={handleUpdateSubmit}>
              <div style={{display:"flex", gap:"5px", alignItems:"center", justifyContent:"center"}}>
                <p>Food Name:</p>
              <input
                type="text"
                placeholder="Food Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
              </div>
              
              <div style={{display:"flex", gap:"23px", alignItems:"center", justifyContent:"center"}}>
                <p>Quantity:</p>
              <input
                type="text"
                placeholder="Quantity"
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                required
              />
              </div>
              
              <div style={{display:"flex", gap:"23px", alignItems:"center", justifyContent:"center"}}>
                <p>Location:</p>
              <input
                type="text"
                placeholder="Location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                required
              />
              </div>
              
              <div style={{display:"flex", gap:"5px", alignItems:"center", justifyContent:"center"}}>
              <p>Description:</p>
              <textarea
                placeholder="Description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
              ></textarea>
              </div>
              <br />
              <button type="submit" style={{background: "#28a745", color: "white", border: "none", padding: "8px 12px", borderRadius: "5px", cursor: "pointer"}}>Save Changes</button>
              <button
                type="button"
                onClick={() => setEditingFood(null)}
                style={{ marginLeft: "10px", background: "#dc3545", color: "white", border: "none", padding: "8px 12px", borderRadius: "5px", cursor: "pointer" }}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
    </div>
  );
}
