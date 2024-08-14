import CourseCard from "../../components/CourseCard/CourseCard";
import { CourseContext } from "../../context/CourseContext";
import Layout from "../Utils/Layout";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminCourses.css";
import axios from "axios";
import { server } from "../../main";
import toast from "react-hot-toast";

const categories = ["Web Development", "App Development", "Game Development", "Data Science", "Artificial Intelligence"];
const AdminCourses = ({ user }) => {
  const navigate = useNavigate();
  if (user && user.role !== "admin") {
    return navigate("/");
  }
  const [title, setTilte] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [duration, setDuration] = useState("");
  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);

  const { courses, fetchCourses } = useContext(CourseContext);

  const changeImageHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImagePreview(reader.result);
      setImage(file);
    };
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    setBtnLoading(true);

    const myForm = new FormData();
    myForm.append("title", title);
    myForm.append("description", description);
    myForm.append("category", category);
    myForm.append("price", price);
    myForm.append("createdBy", createdBy);
    myForm.append("duration", duration);
    myForm.append("file", image);

    try {
      const { data } = await axios.post(`${server}/api/course/new`, myForm, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      toast.success(data.message);
      setBtnLoading(false);
      await fetchCourses();
      setImage("");
      setDescription("");
      setTilte("");
      setImagePreview("");
      setDuration("");
      setCategory("");
      setPrice("");
      setCategory("");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <Layout>
      <div className="admin-courses">
        <div className="left">
          <h1>All Courses</h1>
          <div className="dashboard-content">
            {courses && courses.length > 0 ? (
              courses.map((e) => {
                return <CourseCard key={e._id} course={e} />;
              })
            ) : (
              <p>No Courses Yet!!</p>
            )}
          </div>
        </div>
        <div className="right">
          <div className="add-course">
            <div className="course-form">
              <h2>Add Course</h2>
              <form onSubmit={submitHandler}>
                <label htmlFor="text">Title</label>
                <input type="text" value={title} onChange={(e) => setTilte(e.target.value)} required />
                <label htmlFor="text">Description</label>
                <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} required />
                <label htmlFor="text">Price</label>
                <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
                <label htmlFor="text">CreatedBy</label>
                <input type="text" value={createdBy} onChange={(e) => setCreatedBy(e.target.value)} required />
                <select value={category} onChange={(e) => setCategory(e.target.value)}>
                  <option value={""}>Select Category</option>
                  {categories.map((e) => (
                    <option value={e} key={e}>
                      {e}
                    </option>
                  ))}
                </select>
                <label htmlFor="text">Duration</label>
                <input type="number" value={duration} onChange={(e) => setDuration(e.target.value)} required />
                {imagePreview && <img src={imagePreview} alt="preview" width={300} className="image"></img>} <br />
                <button type="submit" disabled={btnLoading} className="common-btn" style={{ marginBottom: "5px" }}>
                  {btnLoading ? "Please Wait.." : "Add"}
                </button>
                <input type="file" onChange={changeImageHandler} required />
              </form>
            </div>
          </div>
          <form action=""></form>
        </div>
      </div>
    </Layout>
  );
};

export default AdminCourses;
