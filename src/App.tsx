import React, { FC } from "react";
import { injectStyle } from "react-toastify/dist/inject-style";
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { Home, Login, Quiz, Register } from "./components/Pages";
import { Layout } from "./components/UI";
import { useAppSelector } from "./redux/hooks";
import { selectCurrentUser } from "./redux/user/selectors";

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
