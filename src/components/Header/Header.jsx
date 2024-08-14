import React, { useContext } from "react";
import "./header.css";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
const Header = () => {
  const { isAuth } = useContext(UserContext);
  console.log(isAuth);
  return (
    <header>
      <div className="logo">E-Learning</div>
      <div className="link">
        <Link to={"/"}> Home</Link>
        <Link to={"/courses"}> Courses</Link>
        <Link to={"/about"}> About</Link>
        {isAuth ? <Link to={"/account"}> Account</Link> : <Link to={"/login"}> Login</Link>}
      </div>
    </header>
  );
};

export default Header;
