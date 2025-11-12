import FoodList from "./components/FoodList";
import AddFood from "./components/AddFood";

function App() {
  return (
    <div>
      <h1>🍽️ PlateShare</h1>
      <AddFood />
      <hr />
      <FoodList />
    </div>
  );
}

export default App;
