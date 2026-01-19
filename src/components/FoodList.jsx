import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link, useSearchParams } from "react-router-dom";
import Loader from "./Loader";
import { useContext, useState } from "react";
import { ThemeContext } from "../provider/ThemeProvider";
import { spacing, breakpoints } from "../theme/theme";


const fetchFoods = async () => {
  const res = await axios.get("https://plateshare-beryl.vercel.app/foods");
  return res.data;
};

export default function FoodList() {
  const { theme } = useContext(ThemeContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "");
  const [filterLocation, setFilterLocation] = useState(searchParams.get("location") || "");
  const [filterStatus, setFilterStatus] = useState(searchParams.get("status") || "");
  const [sortBy, setSortBy] = useState(searchParams.get("sort") || "newest");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const { data: foods = [], isLoading, isError } = useQuery({
    queryKey: ["foods"],
    queryFn: fetchFoods,
  });

  // Filter & Search
  let filtered = foods.filter((food) => {
    const matchesSearch = food.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      food.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = !filterLocation || food.location.toLowerCase().includes(filterLocation.toLowerCase());
    const matchesStatus = !filterStatus || food.food_status === filterStatus;
    return matchesSearch && matchesLocation && matchesStatus;
  });

  // Sort
  filtered.sort((a, b) => {
    if (sortBy === "quantity") {
      const quantityA = parseInt(a.quantity) || 0;
      const quantityB = parseInt(b.quantity) || 0;
      return quantityB - quantityA;
    }
    if (sortBy === "expiry") {
      return new Date(b.expireDate) - new Date(a.expireDate);
    }
    return 0; // newest by default
  });

  // Pagination
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const start = (currentPage - 1) * itemsPerPage;
  const paginatedFoods = filtered.slice(start, start + itemsPerPage);

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    setCurrentPage(1);
  };

  if (isLoading) return <Loader variant="grid" count={12} />;
  if (isError) return <div style={{ color: theme.error, textAlign: "center", padding: spacing.lg }}>Error loading foods!</div>;

  return (
    <div style={{ padding: spacing.lg, backgroundColor: theme.background, minHeight: "100vh", transition: "background-color 0.3s" }}>
      <h1 style={{ color: theme.text, marginBottom: spacing.lg }}>Available Foods</h1>

      {/* Search & Filters */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: spacing.md,
        marginBottom: spacing.lg,
        backgroundColor: theme.surfaceLight,
        padding: spacing.lg,
        borderRadius: "8px"
      }}>
        <input
          type="text"
          placeholder="Search foods..."
          value={searchTerm}
          onChange={handleSearch}
          style={{
            padding: spacing.md,
            border: `1px solid ${theme.border}`,
            borderRadius: "6px",
            fontSize: "14px",
            backgroundColor: theme.background,
            color: theme.text
          }}
        />
        <input
          type="text"
          placeholder="Filter by location..."
          value={filterLocation}
          onChange={(e) => { setFilterLocation(e.target.value); setCurrentPage(1); }}
          style={{
            padding: spacing.md,
            border: `1px solid ${theme.border}`,
            borderRadius: "6px",
            fontSize: "14px",
            backgroundColor: theme.background,
            color: theme.text
          }}
        />
        <select
          value={filterStatus}
          onChange={(e) => { setFilterStatus(e.target.value); setCurrentPage(1); }}
          style={{
            padding: spacing.md,
            border: `1px solid ${theme.border}`,
            borderRadius: "6px",
            fontSize: "14px",
            backgroundColor: theme.background,
            color: theme.text
          }}
        >
          <option value="">All Status</option>
          <option value="available">Available</option>
          <option value="donated">Donated</option>
        </select>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          style={{
            padding: spacing.md,
            border: `1px solid ${theme.border}`,
            borderRadius: "6px",
            fontSize: "14px",
            backgroundColor: theme.background,
            color: theme.text
          }}
        >
          <option value="newest">Newest</option>
          <option value="quantity">Most Quantity</option>
          <option value="expiry">Expiry Date</option>
        </select>
      </div>

      {/* Results Count */}
      <p style={{ color: theme.textLight, marginBottom: spacing.lg }}>
        Found {filtered.length} food(s)
      </p>

      {/* Cards Grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
        gap: spacing.lg,
        marginBottom: spacing.xl
      }}>
        {paginatedFoods.length > 0 ? (
          paginatedFoods.map((food) => (
            <Link
              to={`/food/${food._id}`}
              key={food._id}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div
                style={{
                  border: `1px solid ${theme.border}`,
                  borderRadius: "10px",
                  padding: spacing.md,
                  background: theme.surfaceLight,
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
                }}
              >
                {food.image && (
                  <img
                    src={food.image}
                    alt={food.name}
                    style={{
                      width: "100%",
                      height: "200px",
                      objectFit: "cover",
                      borderRadius: "8px",
                      display: "block",
                      marginBottom: spacing.md
                    }}
                  />
                )}
                <h3 style={{ color: theme.text, marginBottom: spacing.sm }}>{food.name}</h3>
                <p style={{ color: theme.textLight, marginBottom: spacing.sm, fontSize: "13px" }}>
                  <b>Donator:</b> {food.donor}
                </p>
                <p style={{ color: theme.textLight, marginBottom: spacing.sm, fontSize: "13px" }}>
                  <b>Location:</b> {food.location}
                </p>
                <p style={{ color: theme.textLight, marginBottom: spacing.sm, fontSize: "13px" }}>
                  <b>Quantity:</b> {food.quantity}
                </p>
                <span
                  style={{
                    display: "inline-block",
                    padding: "4px 8px",
                    backgroundColor: food.food_status === "donated" ? theme.error : theme.success,
                    color: "white",
                    borderRadius: "4px",
                    fontSize: "12px",
                    marginBottom: spacing.md,
                    width: "fit-content"
                  }}
                >
                  {food.food_status === "donated" ? "Donated" : "Available"}
                </span>
                {food.expireDate && (
                  <p style={{ color: theme.textLight, fontSize: "12px", marginBottom: spacing.md }}>
                    <b>Expires:</b> {new Date(food.expireDate).toLocaleDateString()}
                  </p>
                )}
                <p style={{ color: theme.textMuted, fontSize: "13px", flex: 1, marginBottom: spacing.md }}>
                  {food.description.substring(0, 80)}...
                </p>
                <button style={{
                  backgroundColor: theme.primary,
                  color: "white",
                  border: "none",
                  padding: `${spacing.sm} ${spacing.md}`,
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontSize: "14px",
                  fontWeight: "500",
                  transition: "opacity 0.3s",
                  minHeight: "40px",
                  minWidth: "110px"
                }}
                onMouseEnter={(e) => e.target.style.opacity = "0.9"}
                onMouseLeave={(e) => e.target.style.opacity = "1"}
                >
                  View Details
                </button>
              </div>
            </Link>
          ))
        ) : (
          <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: spacing.xl, color: theme.textLight }}>
            <p>No foods found matching your criteria.</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div style={{
          display: "flex",
          justifyContent: "center",
          gap: spacing.sm,
          marginTop: spacing.xl,
          paddingTop: spacing.lg
        }}>
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
              style={{
                padding: `${spacing.sm} ${spacing.md}`,
                border: `1px solid ${theme.border}`,
                backgroundColor: currentPage === i + 1 ? theme.primary : theme.background,
                color: currentPage === i + 1 ? "white" : theme.text,
                borderRadius: "6px",
                cursor: "pointer",
                transition: "all 0.3s"
              }}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
