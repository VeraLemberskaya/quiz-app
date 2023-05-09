import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import Layout from "../components/Layouts/Layout";
import Loader from "../components/UI/Loader";
import PersistLogin from "../features/auth/components/PersistLogin";

import QuizGame from "../features/quiz/components/QuizGame";

import QuizReview from "../features/quiz/components/QuizReview";

import { authModulePath } from "./AuthRouter/routes";
import { userModulePath } from "./UserRouter/routes";
import UserRouter from "./UserRouter/UserRouter";
import AuthRouter from "./AuthRouter";
import AuthGuard from "./guards/AuthGuard";

const Home = lazy(() => import("../pages/Home"));
// const Settings = lazy(() => import("../pages/Settings"));
// const Statistics = lazy(() => import("../pages/Statistics"));

const AppRoutes = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route element={<PersistLogin />}>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            {/* <Route path="/statistics" element={<Statistics />} />
            <Route path="/settings" element={<Settings />} /> */}
            <Route element={<AuthGuard />}>
              <Route path="/quiz" element={<QuizGame />} />
              <Route path="/quiz/:id" element={<QuizReview />} />
            </Route>
          </Route>
          <Route path={`/${userModulePath}/*`} element={<UserRouter />} />
          <Route path={`/${authModulePath}/*`} element={<AuthRouter />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
