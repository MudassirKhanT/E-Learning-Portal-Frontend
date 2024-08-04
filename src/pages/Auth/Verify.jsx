import React, { useState } from "react";
import "./Auth.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { useContext } from "react";
const Verify = () => {
  const { btnLoading, verifyOtp } = useContext(UserContext);
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const submitHandler = async (e) => {
    e.preventDefault();
    await verifyOtp(Number(otp), navigate);
    console.log(otp);
  };
  return (
    <div className="auth-page">
      <div className="auth-form">
        <h2>Veify Account</h2>
        <form onSubmit={submitHandler}>
          <label htmlFor="otp">Otp</label>
          <input type="number" value={otp} onChange={(e) => setOtp(e.target.value)} required />
          <button disabled={btnLoading} type="submit" className="common-btn">
            {btnLoading ? "Please wait..." : "Verify"}
          </button>
        </form>
        <p>
          Go to <Link to="/login"> Login</Link> page
        </p>
      </div>
    </div>
  );
};

export default Verify;
