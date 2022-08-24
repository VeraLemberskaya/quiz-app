import { FC, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Layout from "./components/UI/Layout";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { selectCurrentUser } from "./redux/user/selectors";
import { setUser } from "./redux/user/slice";
import { getSavedUser } from "./api/requests";
import ChangePassword from "./components/Pages/ChangePassword";
import Home from "./components/Pages/Home";
import Login from "./components/Pages/Login";
import Quiz from "./components/Pages/Quiz";
import Register from "./components/Pages/Register";
import Settings from "./components/Pages/Settings";
import Statistics from "./components/Pages/Statistics";
import { useGetSettingsQuery } from "./redux/settings/slice";
import Loader from "./components/UI/Loader";
import QuizController from "./components/Pages/Quiz/QuizController";
import QuizResultsController from "./components/Pages/Quiz/QuizResultsController";

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
  const { isLoading, isSuccess } = useGetSettingsQuery();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const isUserSaved = !!localStorage.getItem("rememberMe");
    if (isUserSaved) {
      getSavedUser().then((user) => dispatch(setUser(user)));
    }
  }, [dispatch]);

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
                  <Register />
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
