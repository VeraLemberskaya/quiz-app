import React from "react";
import { Routes, Route } from "react-router-dom";

import { Home, Login, Quiz } from "./components/Pages";
import { Layout } from "./components/UI";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/results" element={<Quiz />} />
      </Route>
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
