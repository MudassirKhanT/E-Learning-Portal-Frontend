import React from "react";
import { useNavigate } from "react-router-dom";
import "./home.css";
import Testimonals from "../../components/Testimonals/Testimonals";
const Home = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="home">
        <div className="home-content">
          <h1>Welcome to out E-learing Platform</h1>
          <p>Learn, Grow, Excel</p>
          <button className="common-btn" onClick={() => navigate("/courses")}>
            Get Started
          </button>
        </div>
      </div>
      <Testimonals />
    </div>
  );
};

export default Home;
