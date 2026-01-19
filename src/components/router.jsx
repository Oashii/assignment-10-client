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
import Dashboard from "./Dashboard";
import DashboardHome from "./DashboardHome";
import UserProfile from "./UserProfile";
import About from "./About";
import Contact from "./Contact";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/foods",
        element: <FoodList />,
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
            <FoodDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "/requests",
        element: (
          <PrivateRoute>
            <FoodRequests />
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
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <DashboardHome />,
      },
      {
        path: "my-foods",
        element: <ManageMyFoods />,
      },
      {
        path: "add-food",
        element: <AddFood />,
      },
      {
        path: "requests",
        element: <FoodRequests />,
      },
      {
        path: "profile",
        element: <UserProfile />,
      },
    ],
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);
