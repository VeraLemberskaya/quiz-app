import { Routes, Route } from "react-router-dom";

import Layout from "../components/UI/Layout";
import Account from "../pages/Account";
import ChangePassword from "../pages/ChangePassword";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Quiz from "../pages/Quiz";
import Register from "../pages/Register";
import Settings from "../pages/Settings";
import Statistics from "../pages/Statistics";
import AdminRoute from "./AdminRoute";
import NotAuthenticatedRoute from "./NotAuthenticatedRoute";
import PrivateRoute from "./PrivateRoute";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/results" element={<Quiz isResultPage={true} />} />
        <Route path="/statistics" element={<Statistics />} />
        <Route
          path="/settings"
          element={
            <AdminRoute>
              <Settings />
            </AdminRoute>
          }
        />
      </Route>
      <Route
        path="/login"
        element={
          <NotAuthenticatedRoute>
            <Login />
          </NotAuthenticatedRoute>
        }
      />
      <Route
        path="/register"
        element={
          <NotAuthenticatedRoute>
            <Register />
          </NotAuthenticatedRoute>
        }
      />
      <Route
        path="/account"
        element={
          <PrivateRoute>
            <Account />
          </PrivateRoute>
        }
      />
      <Route
        path="/change-password"
        element={
          <PrivateRoute>
            <ChangePassword />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
