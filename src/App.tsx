import React, { FC, useEffect } from "react";
import { injectStyle } from "react-toastify/dist/inject-style";
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { Home, Login, Quiz, Register } from "./components/Pages";
import { Layout } from "./components/UI";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { selectCurrentUser } from "./redux/user/selectors";
import axios from "./axios";
import { setUser } from "./redux/user/slice";
import { User } from "./redux/user/types";

if (typeof window !== "undefined") {
  injectStyle();
}

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

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const isUserSaved = !!localStorage.getItem("rememberMe");
    if (isUserSaved) {
      axios
        .get<User>("users/get-saved-user")
        .then(({ data: user }) => dispatch(setUser(user)));
    }
  }, []);

  return (
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
