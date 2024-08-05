import React, { useContext } from "react";
import "./Dashboard.css";
import { CourseContext } from "../../context/CourseContext";
import CourseCard from "../../components/CourseCard/CourseCard";
const Dashboard = () => {
  const { myCourse } = useContext(CourseContext);

  return (
    <div className="student-dahsboard">
      <h2 className="heading">All Enrolled Courses</h2>
      <div className="dashboard-content">{myCourse && myCourse.length > 0 ? myCourse.map((e) => <CourseCard key={e._id} course={e} />) : <p>No Course Enrolled Yet!!</p>}</div>
    </div>
  );
};

export default Dashboard;
