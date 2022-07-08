import React from "react";
import { Routes, Route } from "react-router-dom";

import { Home } from "./components/Pages";
import { Layout } from "./components/UI";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
      </Route>
    </Routes>
  );
}

export default App;
