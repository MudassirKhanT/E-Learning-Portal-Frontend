import React, { useState } from "react";
import "./Auth.css";
import { useNavigate, useParams } from "react-router-dom";
import { server } from "../../main";
import toast from "react-hot-toast";
import axios from "axios";
const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);
  const navigate = useNavigate();
  const params = useParams();

  const submitHandler = async (e) => {
    e.preventDefault();
    setBtnLoading(true);
    try {
      const { data } = await axios.post(`${server}/api/user/reset?token=${params.token}`, { password });
      toast.success(data.message);
      navigate("/login");
      setBtnLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setBtnLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-form">
        <h2>Reset Password</h2>
        <form onSubmit={submitHandler}>
          <label htmlFor="text">Enter Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button disabled={btnLoading} className="common-btn">
            {btnLoading ? "Please Wait..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
