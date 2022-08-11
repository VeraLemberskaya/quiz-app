import { FC, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import {
  Home,
  Login,
  Quiz,
  Register,
  Settings,
  Statistics,
} from "./components/Pages";
import { Layout, Loader } from "./components/UI";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { selectCurrentUser } from "./redux/user/selectors";
import { setUser } from "./redux/user/slice";
import { initSettings } from "./redux/settings/slice";
import { selectCurrentSettings } from "./redux/settings/selectors";
import { getSavedUser } from "./api/requests";

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
  const { status } = useAppSelector(selectCurrentSettings);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initSettings());
    const isUserSaved = !!localStorage.getItem("rememberMe");
    if (isUserSaved) {
      getSavedUser().then((user) => dispatch(setUser(user)));
    }
  }, []);

  return status === "loading" ? (
    <Loader />
  ) : (
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
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/results" element={<Quiz />} />
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
      </Routes>
    </>
  );
}

export default App;
