import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ErrorPage from "./ErrorPage";
import Home from "./Home";
import FoodList from "./FoodList";
import AddFood from "./AddFood";
import ManageMyFoods from "./ManageMyFoods";
import FoodDetails from "./FoodDetails";
import FoodRequests from "./FoodRequests";
import Login from "./Login";
import Register from "./Register";
import PrivateRoute from "./PrivateRoute";

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
