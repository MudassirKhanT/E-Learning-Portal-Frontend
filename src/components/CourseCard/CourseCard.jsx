import React from "react";
import "./CourseCard.css";
import { server } from "../../main";
import { FaRupeeSign } from "react-icons/fa";
import { UserContext } from "../../context/UserContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { CourseContext } from "../../context/CourseContext";
const CourseCard = ({ course }) => {
  const navigate = useNavigate();
  const { user, isAuth } = useContext(UserContext);
  const { fetchCourses } = useContext(CourseContext);
  const deleteHandler = async (id) => {
    if (confirm("Are you sure you want to delete this course")) {
      try {
        const { data } = await axios.delete(`${server}/api/course/${id}`, {
          headers: {
            token: localStorage.getItem("token"),
          },
        });
        toast.success(data.message);
        fetchCourses();
      } catch (err) {
        toast.error(err.response.data.message);
      }
    }
  };
  return (
    <div className="course-card">
      <img src={`${server}/${course.image}`} alt="course-image" className="course-image" />
      <h3>{course.title}</h3>
      <p>Instructor - {course.createdBy}</p>
      <p>Duration - {course.duration} weeks</p>
      <p>
        Price - <FaRupeeSign />
        {course.price}
      </p>
      {isAuth ? (
        <>
          {user && user.role !== "admin" ? (
            <>
              {user.subscription.includes(course._id) ? (
                <button onClick={() => navigate(`/course/study/${course._id}`)} className="common-btn">
                  Study
                </button>
              ) : (
                <button onClick={() => navigate(`/course/${course._id}`)} className="common-btn">
                  Get Stared
                </button>
              )}
            </>
          ) : (
            <button onClick={() => navigate(`/course/study/${course._id}`)} className="common-btn">
              Study
            </button>
          )}
        </>
      ) : (
        <button onClick={() => navigate("/login")} className="common-btn">
          Get Stared
        </button>
      )}
      <br />
      {user && user.role === "admin" && (
        <button onClick={() => deleteHandler(course._id)} className="common-btn" style={{ background: "red" }}>
          Delete
        </button>
      )}
    </div>
  );
};

export default CourseCard;
