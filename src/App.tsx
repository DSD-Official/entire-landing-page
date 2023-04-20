import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "pages/Dashboard";
import Home from "pages/Home";
import Liquidity from "pages/Liquidity";
import Swap from "pages/Swap";
import Claim from "pages/Claim/Claim";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/app" element={<Dashboard />} />
        <Route path="/claim" element={<Claim />} />
        <Route path="/swap" element={<Swap />} />
        <Route path="/liquidity" element={<Liquidity />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
