import React from "react";
import "./testimonals.css";
const Testimonals = () => {
  const testimonialsData = [
    {
      id: 1,
      name: "Mudassir Khan",
      position: "Student",
      message: "This platform helped me learn so effectively. The courses are amazing and the instructors are top-notch.",
      image: "https://th.bing.com/th?q=Current+Bachelor&w=120&h=120&c=1&rs=1&qlt=90&cb=1&dpr=1.3&pid=InlineBlock&mkt=en-IN&cc=IN&setlang=en&adlt=moderate&t=1&mw=247",
    },
    {
      id: 2,
      name: "Noushin Pathan",
      position: "Student",
      message: "I've learned more here than in any other place. The interactive lessons and quizzes make learning enjoyable.",
      image: "https://th.bing.com/th/id/OIP.GKAiW3oc2TWXVEeZAzrWOAHaJF?w=135&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    },
    {
      id: 3,
      name: "MMD Yaseen",
      position: "Student",
      message: "This platform helped me learn so effectively. The courses are amazing and the instructors are top-notch.",
      image: "https://th.bing.com/th?q=Current+Bachelor&w=120&h=120&c=1&rs=1&qlt=90&cb=1&dpr=1.3&pid=InlineBlock&mkt=en-IN&cc=IN&setlang=en&adlt=moderate&t=1&mw=247",
    },
    {
      id: 4,
      name: "Meghana Kulala",
      position: "Student",
      message: "I've learned more here than in any other place. The interactive lessons and quizzes make learning enjoyable.",
      image: "https://th.bing.com/th/id/OIP.GKAiW3oc2TWXVEeZAzrWOAHaJF?w=135&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    },
  ];
  return (
    <section className="testimonals">
      <h2>What our students say</h2>
      <div className="testimonals-cards">
        {testimonialsData.map((e) => (
          <div className="testimonals-card" key={e.id}>
            <div className="student-image">
              <img src={e.image} alt="student-image" />
            </div>
            <p className="message">{e.message}</p>
            <div className="info">
              <p className="name">{e.name}</p>
              <p className="position">{e.position}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonals;
