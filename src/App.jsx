import React, { useContext } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import Header from "./components/Header/Header";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Verify from "./pages/Auth/Verify";
import Footer from "./components/Footer/Footer";
import About from "./pages/About/About";
import Account from "./pages/Account/Account";
//import { UserData } from "./context/UserContext";
import { UserContext } from "./context/UserContext";
import Loading from "./components/Loading/Loading";

const App = () => {
  const { isAuth, user, loading } = useContext(UserContext);
  //const { isAuth, user } = UserData();
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <BrowserRouter>
          <Header isAuth={isAuth} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/account" element={isAuth ? <Account user={user} /> : <Login />} />
            <Route path="/login" element={isAuth ? <Home /> : <Login />} />
            <Route path="/register" element={isAuth ? <Home /> : <Register />} />
            <Route path="/verify" element={isAuth ? <Home /> : <Verify />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      )}
    </>
  );
};

export default App;
