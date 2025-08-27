import React from "react";
import { Link } from "react-router-dom";
import "./Style/courses.css"; // Ensure this CSS file exists

// Sample course data based on teacher subjects
const coursesList=[
  { id: 1, name: "Advanced Mathematics", subject: "Mathematics", description: "Master calculus, algebra, and trigonometry with in-depth lessons.", price: "$1,499/month" },
  { id: 2, name: "Classical & Modern Physics", subject: "Physics", description: "Explore Newtonian mechanics, quantum physics, and electromagnetism.", price: "$2,099/month" },
  { id: 3, name: "English Literature & Analysis", subject: "English Literature", description: "Deep dive into poetry, prose, and critical literary analysis.", price: "$1,299/month" },
  { id: 4, name: "Organic & Inorganic Chemistry", subject: "Chemistry", description: "Understand the fundamentals of chemical reactions and structures.", price: "$1,599/month" },
  { id: 5, name: "Biology & Human Anatomy", subject: "Biology", description: "Learn genetics, human biology, and environmental science.", price: "$1,599/month" },
  { id: 6, name: "Programming & Data Structures", subject: "Computer Science", description: "Master coding, algorithms, and web development.", price: "$1,999/month" },
  { id: 7, name: "World History & Civilization", subject: "History", description: "Explore ancient to modern history through engaging narratives.", price: "$1,299/month" },
  { id: 8, name: "Micro & Macroeconomics", subject: "Economics", description: "Understand financial systems, global markets, and trade.", price: "$1,799/month" },
  { id: 9, name: "Political Science & Governance", subject: "Political Science", description: "Analyze global politics, governance structures, and policies.", price: "$1,499/month" },
  { id: 10, name: "Psychology & Behavioral Studies", subject: "Psychology", description: "Study cognitive processes, human behavior, and mental health.", price: "$1,699/month" },
  { id: 11, name: "Music Theory & Composition", subject: "Music", description: "Learn the art of music composition, piano, and theory.", price: "$1,199/month" },
  { id: 12, name: "French Language & Culture", subject: "French", description: "Achieve fluency in spoken and written French.", price: "$1,399/month" },
];
const Courses: React.FC = () => {
  return (
    <div className="courses-container">
      <h2>Our Courses</h2>
      <div className="scroll-container">
        <div className="grid-container">
          {coursesList.map((course) => (
            <div className="grid-card" key={course.id}>
              <h3>{course.name}</h3>
              <h5>{course.subject}</h5>
              <p>{course.description}</p>
              <p><strong>{course.price}</strong></p>
              
              {/* Link to the Enroll Page */}
              <Link to={`/enroll/${course.id}`}>
                <button className="enroll-button">Enroll Now</button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Courses;