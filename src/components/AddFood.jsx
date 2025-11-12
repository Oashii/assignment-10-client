import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState, useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";

export default function AddFood() {
  const { user, loading } = useContext(AuthContext);
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    name: "",
    location: "",
    quantity: "",
    description: "",
    image: "", // will store imgbb URL
  });
  const [file, setFile] = useState(null);

  const mutation = useMutation({
    mutationFn: async (newFood) => {
      const res = await axios.post("http://localhost:3000/foods", newFood);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["foods"]);
      alert("✅ Food added successfully!");
      setFormData({
        name: "",
        location: "",
        quantity: "",
        description: "",
        image: "",
      });
      setFile(null);
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
    return res.data.data.url; // returned image URL
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return alert("❌ You must be logged in to add food.");

    let imageUrl = formData.image;
    if (file) {
      imageUrl = await handleFileUpload();
    }

    // Add donor info from Firebase user
    const newFood = {
      ...formData,
      image: imageUrl,
      donor: user.displayName || user.email,
      donorEmail: user.email,
      donorPhoto: user.photoURL || "",
      status: "Available",
    };

    mutation.mutate(newFood);
  };

  if (loading) return <p>Loading...</p>;
  if (!user) return <p>Please login to add food.</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Add Food 🍲</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Food Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
        <br />
        <input
          type="text"
          placeholder="Pickup Location"
          value={formData.location}
          onChange={(e) =>
            setFormData({ ...formData, location: e.target.value })
          }
          required
        />
        <br />
        <input
          type="text"
          placeholder="Serves (e.g. 2 people)"
          value={formData.quantity}
          onChange={(e) =>
            setFormData({ ...formData, quantity: e.target.value })
          }
          required
        />
        <br />
        <textarea
          placeholder="Additional Notes"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          required
        ></textarea>
        <br />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <br />
        <button type="submit">Add Food</button>
      </form>
    </div>
  );
}
