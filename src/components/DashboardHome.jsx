import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ThemeContext } from "../provider/ThemeProvider";
import { spacing } from "../theme/theme";
import API_BASE_URL from "../api";

export default function DashboardHome() {
  const { theme } = useContext(ThemeContext);

  const { data: allFoods = [] } = useQuery({
    queryKey: ["allFoods"],
    queryFn: async () => {
      const res = await axios.get(`${API_BASE_URL}/foods`);
      return res.data;
    },
  });

  // Calculate stats
  const totalFoods = allFoods.length;
  const donatedFoods = allFoods.filter(f => f.food_status === "donated").length;
  const availableFoods = allFoods.filter(f => f.food_status === "available").length;

  const stats = [
    { label: "Total Foods", value: totalFoods, icon: "🍽️", color: theme.primary },
    { label: "Available", value: availableFoods, icon: "✅", color: theme.success },
    { label: "Donated", value: donatedFoods, icon: "💝", color: theme.secondary },
    { label: "Total Users", value: "1,850+", icon: "👥", color: theme.accent },
  ];

  return (
    <div>
      {/* Stats Cards */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
        gap: spacing.lg,
        marginBottom: spacing.xl
      }}>
        {stats.map((stat, idx) => (
          <div
            key={idx}
            style={{
              backgroundColor: theme.surfaceLight,
              padding: spacing.lg,
              borderRadius: "12px",
              border: `2px solid ${stat.color}`,
              transition: "all 0.3s",
              cursor: "pointer"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-8px)";
              e.currentTarget.style.boxShadow = "0 12px 24px rgba(0,0,0,0.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <p style={{ color: theme.textLight, margin: "0 0 8px 0" }}>{stat.label}</p>
                <h3 style={{ color: stat.color, margin: 0, fontSize: "32px" }}>{stat.value}</h3>
              </div>
              <div style={{ fontSize: "40px" }}>{stat.icon}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Foods Section */}
      <div style={{
        backgroundColor: theme.surfaceLight,
        padding: spacing.lg,
        borderRadius: "12px",
        marginBottom: spacing.xl
      }}>
        <h2 style={{ color: theme.text, marginTop: 0 }}>Recent Foods Posted</h2>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: spacing.lg
        }}>
          {allFoods.slice(0, 6).map((food) => (
            <div
              key={food._id}
              style={{
                backgroundColor: theme.background,
                padding: spacing.md,
                borderRadius: "8px",
                border: `1px solid ${theme.border}`,
                transition: "all 0.3s"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              {food.image && (
                <img
                  src={food.image}
                  alt={food.name}
                  style={{
                    width: "100%",
                    height: "150px",
                    objectFit: "cover",
                    borderRadius: "6px",
                    marginBottom: spacing.md
                  }}
                />
              )}
              <h4 style={{ color: theme.text, margin: `0 0 ${spacing.sm} 0` }}>{food.name}</h4>
              <p style={{ color: theme.textLight, margin: `0 0 ${spacing.sm} 0`, fontSize: "13px" }}>
                <b>Location:</b> {food.location}
              </p>
              <p style={{ color: theme.textLight, margin: `0 0 ${spacing.sm} 0`, fontSize: "13px" }}>
                <b>Quantity:</b> {food.quantity}
              </p>
              <span style={{
                display: "inline-block",
                padding: "4px 8px",
                backgroundColor: food.food_status === "donated" ? theme.error : theme.success,
                color: "white",
                borderRadius: "4px",
                fontSize: "11px"
              }}>
                {food.food_status === "donated" ? "Donated" : "Available"}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Stats */}
      <div style={{
        backgroundColor: theme.surfaceLight,
        padding: spacing.lg,
        borderRadius: "12px",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: spacing.lg
      }}>
        <div>
          <p style={{ color: theme.textLight, margin: "0 0 8px 0" }}>Completion Rate</p>
          <div style={{
            width: "100%",
            height: "8px",
            backgroundColor: theme.border,
            borderRadius: "4px",
            overflow: "hidden"
          }}>
            <div style={{
              height: "100%",
              backgroundColor: theme.primary,
              width: "72%",
              transition: "width 0.3s"
            }} />
          </div>
          <p style={{ color: theme.text, margin: "8px 0 0 0", fontWeight: "bold" }}>72%</p>
        </div>
        <div>
          <p style={{ color: theme.textLight, margin: "0 0 8px 0" }}>User Engagement</p>
          <div style={{
            width: "100%",
            height: "8px",
            backgroundColor: theme.border,
            borderRadius: "4px",
            overflow: "hidden"
          }}>
            <div style={{
              height: "100%",
              backgroundColor: theme.secondary,
              width: "85%",
              transition: "width 0.3s"
            }} />
          </div>
          <p style={{ color: theme.text, margin: "8px 0 0 0", fontWeight: "bold" }}>85%</p>
        </div>
      </div>
    </div>
  );
}
