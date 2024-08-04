import { createContext } from "react";
import axios from "axios";
import { server } from "../main";
import React, { useEffect, useState } from "react";
const CourseContext = createContext();

const CourseContextProvider = ({ children }) => {
  const [courses, setCourses] = useState([]);

  async function fetchCourses() {
    try {
      const { data } = await axios.get(`${server}/api/course/all`);
      setCourses(data.courses);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchCourses();
  }, []);
  return <CourseContext.Provider value={{ courses, fetchCourses }}>{children}</CourseContext.Provider>;
};

export { CourseContext, CourseContextProvider };
