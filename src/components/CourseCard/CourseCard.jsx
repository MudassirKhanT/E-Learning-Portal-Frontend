import React from "react";
import "./CourseCard.css";
import { server } from "../../main";
const CourseCard = ({ course }) => {
  return (
    <div className="course-card">
      <img src={`${server}/${course.image}`} alt="course-image" className="course-image" />
      <h3>{course.title}</h3>
      <p>Instructor - {course.createdBy}</p>
      <p>Duration - {course.duration}</p>
      <p>Price - {course.price}</p>
      <button className="common-btn">Get Stared</button>
    </div>
  );
};

export default CourseCard;
