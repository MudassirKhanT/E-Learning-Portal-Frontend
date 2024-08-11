import React, { useContext, useState } from "react";
import "./Auth.css";
import { Link, useNavigate } from "react-router-dom";
//import { UserData } from "../../context/UserContext";
import { UserContext } from "../../context/UserContext";
import { CourseContext } from "../../context/CourseContext";

const Login = () => {
  const { btnLoading, loginUser } = useContext(UserContext);
  //const { btnLoading, loginUser } = UserData();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { fetchMyCourse } = useContext(CourseContext);
  const submitHandler = async (e) => {
    e.preventDefault();
    await loginUser(email, password, navigate, "");
  };
  return (
    <div className="auth-page">
      <div className="auth-form">
        <h2>Login</h2>
        <form onSubmit={submitHandler}>
          <label htmlFor="email">Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <label htmlFor="password">Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <button disabled={btnLoading} type="submit" className="common-btn">
            {btnLoading ? "Please Wait..." : "Login"}
          </button>
        </form>
        <p>
          Don't have an account?
          <Link to="/register"> Register</Link>
        </p>
        <p>
          <Link to={"/forgot"}>Forgot password?</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
