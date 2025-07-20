import { useState } from "react";
import siteLogo from "../assets/icons8-tech-100.png";
import kgpLogo from "../assets/iitkgplogo.png";
import "../App.css";

function HomePage() {
  return (
    <>
      <header>
        <h1 className="title-heading">
          <a
            href="https://www.iitkgp.ac.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="logo-link"
          >
            <img src={kgpLogo} alt="KGP Logo" className="logo-image" />
          </a>
          <span>TSG Secretary: Web</span>
        </h1>
      </header>
      <div class="card text-center">
        <div class="card-header">Web Deployment Task</div>
        <div class="card-body">
          <h5 class="card-title">Shubham Krishan</h5>
          <p class="card-text">
            This is a simple webapp deployed to be viewed on any device.
          </p>
          <a
            href="https://www.iitkgp.ac.in/welcome-freshers"
            target="_blank"
            rel="noopener noreferrer"
            class="btn btn-primary"
          >
            IITKgp Freshers Page
          </a>
        </div>
        <div class="card-footer text-body-secondary">
          This page has been seen 69 times!
        </div>
      </div>
    </>
  );
}

export default HomePage;
