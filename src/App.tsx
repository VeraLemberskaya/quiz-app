import { FC } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Layout from "./components/UI/Layout";
import { useAppSelector } from "./services/hooks";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Settings from "./pages/Settings";
import Statistics from "./pages/Statistics";
import Loader from "./components/UI/Loader";
import { useGetSettingsQuery } from "./features/settings/services/slice";
import { useGetSavedUserQuery } from "./features/user/services/slice";
import { selectCurrentUser } from "./features/user/services/selectors";
import Account from "./pages/Account";
import ChangePassword from "./pages/ChangePassword";
import Home from "./pages/Home";
import QuizController from "./features/quiz/components/QuizController";
import QuizResultsController from "./features/quiz/components/QuizResultsController";

type Props = {
  children: JSX.Element;
};

const NotAuthenticatedRoute: FC<Props> = ({ children }) => {
  const user = useAppSelector(selectCurrentUser);
  if (user) {
    return <Navigate to="/" />;
  }
  return children;
};

const PrivateRoute: FC<Props> = ({ children }) => {
  const user = useAppSelector(selectCurrentUser);
  if (!user) {
    return <Navigate to="/login" />;
  }
  return children;
};

const AdminRoute: FC<Props> = ({ children }) => {
  const user = useAppSelector(selectCurrentUser);
  if (user && user.role === "ADMIN") {
    return children;
  }
  return <Navigate to="/" />;
};

function App() {
  useGetSavedUserQuery(undefined, {
    skip: !Boolean(localStorage.getItem("rememberMe")),
  });

  const { isLoading, isSuccess } = useGetSettingsQuery();

  return isLoading ? (
    <Loader />
  ) : (
    <>
      {isSuccess && (
        <>
          <ToastContainer
            position="bottom-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="/quiz" element={<QuizController />} />
              <Route path="/results" element={<QuizController />} />
              <Route
                path="/results/:userId/:gameId"
                element={<QuizResultsController />}
              />
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
        </>
      )}
    </>
  );
}

export default App;
