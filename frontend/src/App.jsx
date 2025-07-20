import React from "react";
import { useState } from "react";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import HomePage from "./pages/homepage";
import WikiDashboard from "./pages/wikidashboard";

import siteLogo from "./assets/icons8-tech-100.png";
import kgpLogo from "./assets/iitkgplogo.png";
import "./App.css";

function App() {
  return (
    <Router>
      {/* Navigation Bar */}

      <nav className="navbar navbar-expand-lg sticky-top bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Navigation
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">
                  Home Page
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/wiki">
                  WikiDashboard
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Route Definitions */}
      <main className="container mt-3">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/wiki" element={<WikiDashboard />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
