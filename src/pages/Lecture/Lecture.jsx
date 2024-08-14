import React, { useEffect, useState } from "react";
import "./Lecture.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { server } from "../../main";
import Loading from "../../components/Loading/Loading";
import toast from "react-hot-toast";
import { TiTick } from "react-icons/ti";
const Lecture = ({ user }) => {
  const [lectures, setLectures] = useState([]);
  const [lecture, setLecture] = useState([]);
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);
  const [lectureLoading, setLectureLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [vedio, setVedio] = useState("");
  const [vedioPreview, setVedioPreview] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);
  const params = useParams();
  const navigate = useNavigate();
  if (user && user.role !== "admin" && !user.subscription.includes(params.id)) {
    return navigate("/");
  }
  async function fetchLectures() {
    try {
      const { data } = await axios.get(`${server}/api/lectures/${params.id}`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      console.log("lectures are::", data);
      setLectures(data.lectures);
      setLecture(data.lectures[0]);
      // if (lectures.length > 0) {
      //   console.log("inside");
      //   setLecture(lectures[0]);
      //   console.log(`${server}/${lecture.video}`);
      // }
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(true);
    }
  }
  async function fetchLecture(id) {
    console.log("lecture id ::", id);
    setLectureLoading(true);
    try {
      const { data } = await axios.get(`${server}/api/lecture/${id}`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      console.log("individual lectuire::", data);
      setLecture(data.lecture);
      setLectureLoading(false);
    } catch (err) {
      console.log(err);
      setLectureLoading(true);
    }
  }

  const submitHandler = async (e) => {
    setBtnLoading(true);
    e.preventDefault();
    const myForm = new FormData();
    myForm.append("title", title);
    myForm.append("description", description);
    myForm.append("file", vedio);
    try {
      const { data } = await axios.post(`${server}/api/course/${params.id}`, myForm, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      toast.success(data.message);
      setBtnLoading(false);
      setShow(false);
      fetchLectures();
      setTitle("");
      setDescription("");
      setVedioPreview("");
      setVedio("");
    } catch (err) {
      toast.error(err.response.data.message);
      setBtnLoading(false);
    }
  };
  const deleteHandler = async (id) => {
    if (confirm("Are you sure you want to delete this lecture")) {
      try {
        const { data } = await axios.delete(`${server}/api/lecture/${id}`, {
          headers: {
            token: localStorage.getItem("token"),
          },
        });
        toast.success(data.message);
        fetchLectures();
      } catch (err) {
        toast.error(err.response.data.message);
      }
    }
  };
  const [completed, setCompleted] = useState("");
  const [completedlecture, setCompletedLecture] = useState("");
  const [lecLength, setLecLength] = useState("");
  const [progress, setProgress] = useState([]);

  async function fetchprogress() {
    try {
      const { data } = await axios.get(`${server}/api/user/progress?course=${params.id}`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      console.log("progress", data);
      setCompleted(data.courseProgressPercentage);
      setCompletedLecture(data.completedLectures);
      setLecLength(data.allLectures);
      setProgress(data.progress);
    } catch (error) {
      console.log(error);
    }
  }
  const addProgress = async (id) => {
    //console.log("Lecture Completed", id);
    try {
      const { data } = await axios.post(
        `${server}/api/user/progress?course=${params.id}&lectureId=${id}`,
        {},
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      console.log(data.message);
      fetchprogress();
    } catch (error) {
      console.log(error);
    }
  };
  const changeVideoHandler = async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setVedioPreview(reader.result);
      setVedio(file);
    };
  };
  console.log("progress", progress);

  useEffect(() => {
    fetchLectures();
    fetchprogress();
  }, []);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          {user && user.role !== "admin" && (
            <div className="progress">
              Lecture completed - {completedlecture} out of {lecLength} <br />
              <progress value={completed} max={100}></progress> {completed} %
            </div>
          )}
          <div className="lecture-page">
            <div className="left">
              {lectureLoading ? (
                <Loading />
              ) : (
                <>
                  {lecture ? (
                    <>
                      <video src={`${server}/${lecture.video}`} width={"100%"} controls controlsList="nodownload noremoteplayback" disablePictureInPicture disableRemotePlayback autoPlay onEnded={() => addProgress(lecture._id)}></video>
                      <h1>{lecture.title}</h1>
                      <h3>{lecture.description}</h3>
                    </>
                  ) : (
                    <h1 style={{ color: "#8a4baf" }}>Please Select a Lecture</h1>
                  )}
                </>
              )}
            </div>
            <div className="right">
              {user && user.role === "admin" && (
                <button onClick={() => setShow(!show)} className="common-btn">
                  {show ? "Close" : "Add Lecture +"}
                </button>
              )}
              {show && (
                <div className="lecture-form">
                  <h2>Add lecture</h2>
                  <form onSubmit={submitHandler}>
                    <label htmlFor="text">Title</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
                    <label htmlFor="text">Description</label>
                    <input type="text" required value={description} onChange={(e) => setDescription(e.target.value)} />
                    <input type="file" required placeholder="choose vedio" onChange={changeVideoHandler} />
                    {vedioPreview && <video src={vedioPreview} width={300} controls></video>} <br />
                    <button disabled={btnLoading} type="submit" className="common-btn">
                      {btnLoading ? "Please wait..." : "Add"}
                    </button>
                  </form>
                </div>
              )}

              {lectures && lectures.length > 0 ? (
                lectures.map((e, i) => (
                  <>
                    <div onClick={() => fetchLecture(e._id)} key={e._id} className={`lecture-number ${lecture._id === e._id && "active"}`}>
                      {i + 1}.{e.title}{" "}
                      {progress.length > 0 && progress[0].completedLectures.includes(e._id) && (
                        <span style={{ background: "red", padding: "2px", borderRadius: "6px", color: "greenyellow" }}>
                          <TiTick />
                        </span>
                      )}
                    </div>
                    {user && user.role === "admin" && (
                      <button onClick={() => deleteHandler(e._id)} className="common-btn" style={{ background: "red" }}>
                        Delete {e.title}
                      </button>
                    )}
                  </>
                ))
              ) : (
                <p style={{ color: "#8a4baf" }}>No Lectures Yet!!</p>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Lecture;
