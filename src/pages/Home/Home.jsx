import React from "react";
import { useNavigate } from "react-router-dom";
import "./home.css";
const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="home">
      <div className="home-content">
        <h1>Welcome to out E-learing Platform</h1>
        <p>Learn, Grow, Excel</p>
        <button className="common-btn" onClick={() => navigate("/courses")}>
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Home;
