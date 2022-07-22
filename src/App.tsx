import React from "react";
import { Routes, Route } from "react-router-dom";

import { Home, Quiz, Results } from "./components/Pages";
import { Layout } from "./components/UI";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/results" element={<Results />} />
      </Route>
    </Routes>
  );
}

export default App;
