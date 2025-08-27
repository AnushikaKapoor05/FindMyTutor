//import { Request, Response } from 'express';
import { Link } from "react-router-dom";
import "./Style/Home.css";
import heroImage from "../assets/hero-image.jpeg";
import bookImage from "../assets/aa.jpeg";
import { useUser } from "../components/UserContext";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
const courses = [
  {
    title: "Advanced Mathematics",
    description: "Master calculus, algebra, and trigonometry with in-depth lessons.",
  },
  {
    title: "Classical & Modern Physics",
    description: "Explore Newtonian mechanics, quantum physics, and electromagnetism.",
  },
  {
    title: "English Literature & Analysis",
    description: "Deep dive into poetry, prose, and critical literary analysis.",
  },
  {
    title: "Programming & Data Structures",
    description: "Master coding, algorithms, and web development.",
  },
];

const Home: React.FC = () => {
  const { username } = useUser();
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axios.get(`http://localhost:5001/profile?username=${username}`);
        setUserData(res.data);
      } catch (err) {
        console.error(err);
      }
    };
  
    fetchUserData();
  }, [username]);

    
  return (
    <div className="homepage">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-text">
          <h1>
            Your Journey to <span className="highlight">Success</span> Starts Here.
          </h1>
          <p>Welcome back to FindMyTutor! 🎓 Let’s keep learning and growing.</p>
        </div>
        <img src={heroImage} alt="Success Illustration" className="hero-image" />
      </section>

      {/* Explore Courses Section */}
      <section className="explore-courses">
        <h2>Explore Courses</h2>
        <div className="course-cards">
          {courses.map((course, index) => (
            <div key={index} className="course-card">
              <h3>{course.title}</h3>
              <p>{course.description}</p>
            </div>
          ))}
        </div>
        <Link to="/courses" className="explore-button">
          Explore Our Courses
        </Link>
      </section>

      {/* Book a Demo Section */}
      <section className="book-demo">
        <div className="book-demo-container">
          <div className="book-demo-text">
            <h2>
              Book your <span className="highlight">Free Demo</span> session
            </h2>
            <p>Get a free academic counselling session</p>
            <Link to="/teachers" className="demo-button">
              Book a Free Demo
            </Link>
          </div>
          <div className="book-demo-image">
            <img src={bookImage} alt="Book a Demo" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>
          &copy; 2025 <span className="brand">Find My Tutor</span>. All rights reserved.
        </p>
        <div className="footer-links">
          <Link to="/privacy-policy">Privacy policy</Link>
          <Link to="/terms">Terms and conditions</Link>
        </div>
      </footer>
    </div>
  );
};
export default Home;