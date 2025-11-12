import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ErrorPage from "./ErrorPage";
import Home from "./components/Home";
import FoodList from "./components/FoodList";
import AddFood from "./components/AddFood";
import ManageMyFoods from "./components/ManageMyFoods";
import FoodDetails from "./components/FoodDetails";
import FoodRequests from "./components/FoodRequests";
import Login from "./components/Login";
import Register from "./components/Register";
import PrivateRoute from "./components/PrivateRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />, // Banner + Featured Foods
      },
      {
        path: "/foods",
        element: <FoodList />, // Available Foods
      },
      {
        path: "/add-food",
        element: (
          <PrivateRoute>
            <AddFood />
          </PrivateRoute>
        ),
      },
      {
        path: "/my-foods",
        element: (
          <PrivateRoute>
            <ManageMyFoods />
          </PrivateRoute>
        ),
      },
      {
        path: "/food/:id",
        element: (
          <PrivateRoute>
            <FoodDetails /> {/* Shows food info + request button */}
          </PrivateRoute>
        ),
      },
      {
        path: "/requests",
        element: (
          <PrivateRoute>
            <FoodRequests /> {/* Food owner sees incoming requests */}
          </PrivateRoute>
        ),
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
  {
    path: "*",
    element: <ErrorPage />, // 404 page
  },
]);
