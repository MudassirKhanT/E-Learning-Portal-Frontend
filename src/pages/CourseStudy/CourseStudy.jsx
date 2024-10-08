import React, { useContext, useEffect } from "react";
import "./CourseStudy.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { CourseContext } from "../../context/CourseContext";
import { server } from "../../main";
const CourseStudy = ({ user }) => {
  const params = useParams();
  const { fetchCourse, course } = useContext(CourseContext);
  const navigate = useNavigate();
  if (user && user.role !== "admin" && !user.subscription.includes(params.id)) {
    return navigate("/");
  }
  useEffect(() => {
    fetchCourse(params.id);
  }, []);

  const move = async () => {
    navigate(`/lecture/${course._id}`);
  };
  return (
    <>
      {course && (
        <div className="course-study-page">
          <img className="course-image" src={`${server}/${course.image}`} alt="" width={350} />
          <h2>{course.title}</h2>
          <h4>{course.description}</h4>
          <h5>by - {course.createdBy}</h5>
          <h5>Duration - {course.duration} weeks</h5>

          <button onClick={move} className="common-btn">
            Lectures
          </button>
        </div>
      )}
    </>
  );
};

export default CourseStudy;
