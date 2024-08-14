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
import { UserContext } from "./context/UserContext";
import Loading from "./components/Loading/Loading";
import Courses from "./pages/Courses/Courses";
import CourseDescription from "./pages/CourseDescription/CourseDescription";
import PaymentSuccess from "./pages/PaymentSuccess/PaymentSuccess";
import Dashboard from "./pages/Dashboard/Dashboard";
import CourseStudy from "./pages/CourseStudy/CourseStudy";
import Lecture from "./pages/Lecture/Lecture";
import AdminDashboard from "./admin/Dashboard/AdminDashboard";
import AdminCourses from "./admin/Courses/AdminCourses";
import AdminUsers from "./admin/Users/AdminUsers";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import ResetPassword from "./pages/Auth/ResetPassword";

const App = () => {
  const { isAuth, user, loading } = useContext(UserContext);
  //const { isAuth, user } = UserData();
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/account" element={isAuth ? <Account user={user} /> : <Login />} />
            <Route path="/login" element={isAuth ? <Home /> : <Login />} />
            <Route path="/register" element={isAuth ? <Home /> : <Register />} />
            <Route path="/verify" element={isAuth ? <Home /> : <Verify />} />
            <Route path="/forgot" element={isAuth ? <Home /> : <ForgotPassword />} />
            <Route path="/reset-password/:token" element={isAuth ? <Home /> : <ResetPassword />} />
            <Route path="/course/:id" element={isAuth ? <CourseDescription user={user} /> : <Login />} />
            <Route path="/payment-success/:id" element={isAuth ? <PaymentSuccess user={user} /> : <Login />} />
            <Route path="/:id/dashboard" element={isAuth ? <Dashboard user={user} /> : <Login />} />
            <Route path="/course/study/:id" element={isAuth ? <CourseStudy user={user} /> : <Login />} />
            <Route path="/lecture/:id" element={isAuth ? <Lecture user={user} /> : <Login />} />
            <Route path="/admin/dashboard" element={isAuth ? <AdminDashboard user={user} /> : <Login />} />
            <Route path="/admin/course" element={isAuth ? <AdminCourses user={user} /> : <Login />} />
            <Route path="/admin/users" element={isAuth ? <AdminUsers user={user} /> : <Login />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      )}
    </>
  );
};

export default App;
