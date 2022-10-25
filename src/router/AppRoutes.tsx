import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import Layout from "../components/Layouts/Layout";
import Loader from "../components/UI/Loader";
import PersistLogin from "../features/auth/components/PersistLogin";

import { authModulePath } from "./AuthRouter/routes";
import { userModulePath } from "./UserRouter/routes";
import UserRouter from "./UserRouter/UserRouter";
import AuthRouter from "./AuthRouter";

const Home = lazy(() => import("../pages/Home"));
const Quiz = lazy(() => import("../pages/Quiz"));
const Settings = lazy(() => import("../pages/Settings"));
const Statistics = lazy(() => import("../pages/Statistics"));

const AppRoutes = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route element={<PersistLogin />}>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/results" element={<Quiz isResultPage={true} />} />
            <Route path="/statistics" element={<Statistics />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
          <Route path={`/${userModulePath}/*`} element={<UserRouter />} />
          <Route path={`/${authModulePath}/*`} element={<AuthRouter />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
