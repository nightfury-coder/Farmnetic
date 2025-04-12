import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Component Imports
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import CommonDiseasesPage from "./components/commonDiseases";
import Home from "./pages/Home";
import AgricultureOfficer from "./pages/AgricultureOfficer";

function App() {
  return (
    <Router>
      <Routes>
        {/* Main Auth & Dashboard Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/common-diseases" element={<CommonDiseasesPage />} />

        {/* Additional Pages */}
        <Route path="/home" element={<Home />} />
        <Route path="/agriculture-officer" element={<AgricultureOfficer />} />
      </Routes>
    </Router>
  );
}

export default App;
