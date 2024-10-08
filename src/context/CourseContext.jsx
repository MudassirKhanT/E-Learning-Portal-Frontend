import { createContext } from "react";
import axios from "axios";
import { server } from "../main";
import React, { useEffect, useState } from "react";
//import { useContext } from "react";
const CourseContext = createContext();
const CourseContextProvider = ({ children }) => {
  const [courses, setCourses] = useState([]);
  const [course, setCourse] = useState([]);
  const [myCourse, setMyCourse] = useState([]);

  async function fetchCourses() {
    try {
      const { data } = await axios.get(`${server}/api/course/all`);
      setCourses(data.courses);
    } catch (error) {
      console.log(error);
    }
  }
  async function fetchCourse(id) {
    try {
      //const { data } = axios.get(`${server}/api/course/${id}`);
      const { data } = await axios.get(`${server}/api/course/${id}`);
      console.log("Data:", data);

      setCourse(data.course);
    } catch (error) {
      console.log(error);
    }
  }
  async function fetchMyCourse() {
    try {
      const { data } = await axios.get(`${server}/api/mycourse`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      setMyCourse(data.courses);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchCourses();
    fetchMyCourse();
  }, []);
  return <CourseContext.Provider value={{ courses, fetchCourses, fetchCourse, course, myCourse, fetchMyCourse }}>{children}</CourseContext.Provider>;
};
//export const CourseData = () => useContext(CourseContext);
export { CourseContext, CourseContextProvider };
