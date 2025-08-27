import React from "react";
import { Container } from "react-bootstrap";
import "./Style/teachers.css";
import { Link } from "react-router-dom";

const teachersList = [
  { 
    id: 1, 
    name: "Dr. Ananya Sharma", 
    experience: "10 years", 
    subject: "Mathematics", 
    bio: "Passionate educator specializing in calculus and algebra with a decade of teaching experience.", 
    hourlyRate: "$40/hour"
  },
  { 
    id: 2, 
    name: "Mr. Rajesh Kumar", 
    experience: "8 years", 
    subject: "Physics", 
    bio: "Expert in classical mechanics and quantum physics, helping students understand complex concepts with ease.", 
    hourlyRate: "$35/hour"
  },
  { 
    id: 3, 
    name: "Ms. Priya Mehta", 
    experience: "5 years", 
    subject: "English Literature", 
    bio: "Enthusiastic English teacher with a focus on poetry, prose, and literary analysis.", 
    hourlyRate: "$30/hour"
  },
  { 
    id: 4, 
    name: "Dr. Suresh Reddy", 
    experience: "12 years", 
    subject: "Chemistry", 
    bio: "Ph.D. in Organic Chemistry, guiding students through concepts with real-world applications.", 
    hourlyRate: "$50/hour"
  },
  { 
    id: 5, 
    name: "Mrs. Neha Verma", 
    experience: "7 years", 
    subject: "Biology", 
    bio: "Passionate about genetics and human biology, making learning engaging and interactive.", 
    hourlyRate: "$45/hour"
  },
  { 
    id: 6, 
    name: "Mr. Arjun Patel", 
    experience: "6 years", 
    subject: "Computer Science", 
    bio: "Software engineer turned educator, specializing in algorithms, data structures, and web development.", 
    hourlyRate: "$55/hour"
  },
  { 
    id: 7, 
    name: "Ms. Kavita Das", 
    experience: "9 years", 
    subject: "History", 
    bio: "Loves making history come alive through engaging storytelling and deep analysis.", 
    hourlyRate: "$32/hour"
  },
  { 
    id: 8, 
    name: "Dr. Ramesh Iyer", 
    experience: "15 years", 
    subject: "Economics", 
    bio: "Experienced professor with expertise in micro and macroeconomics, making concepts easy to grasp.", 
    hourlyRate: "$60/hour"
  },
  { 
    id: 9, 
    name: "Mr. Vikram Joshi", 
    experience: "7 years", 
    subject: "Political Science", 
    bio: "Deep understanding of global politics, governance, and international relations.", 
    hourlyRate: "$38/hour"
  },
  { 
    id: 10, 
    name: "Mrs. Sunita Kapoor", 
    experience: "10 years", 
    subject: "Psychology", 
    bio: "Clinical psychologist with a passion for teaching behavioral psychology and cognitive sciences.", 
    hourlyRate: "$48/hour"
  },
  { 
    id: 11, 
    name: "Mr. Aditya Sengupta", 
    experience: "4 years", 
    subject: "Music", 
    bio: "Pianist and composer, teaching classical and contemporary music theory.", 
    hourlyRate: "$28/hour"
  },
  { 
    id: 12, 
    name: "Ms. Rina Malhotra", 
    experience: "6 years", 
    subject: "French", 
    bio: "Certified French tutor with a strong focus on conversational and written proficiency.", 
    hourlyRate: "$35/hour"
  }
];

function TeachersList() {
    return (
      <Container fluid className="teachers-container">
        <h1 className="text-primary mb-4 text-center">Available Teachers</h1>
        <div className="grid-container">
          {teachersList.map((teacher) => (
            <div key={teacher.id} className="grid-card">
              <h3>{teacher.name}</h3>
              <h5>📚 {teacher.subject}</h5>
              <p>📝 Experience: {teacher.experience}</p>
              <p>📖 Bio: {teacher.bio}</p>
              <p>💰 Hourly Rate: {teacher.hourlyRate}</p>
              
              {/* Use Link to navigate to the BookingForm page */}
              <Link to={`/book/${teacher.id}`}>
                <button className="apply-button">Book a Session</button>
              </Link>
            </div>
          ))}
        </div>
      </Container>
    );
  }
  
  export default TeachersList;