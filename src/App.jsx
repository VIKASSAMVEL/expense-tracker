import React from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./LandingPage";
import TrackerPage from "./TrackerPage";
import SplitterPage from "./SplitterPage";
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/tracker" element={<TrackerPage />} />
      <Route path="/splitter" element={<SplitterPage />} />
    </Routes>
  );
}

export default App;
