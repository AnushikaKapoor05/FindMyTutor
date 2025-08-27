import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";

import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import TeachersList from "./components/TeachersList";
import Courses from "./components/Courses";
import EnrollNow from "./components/EnrollNow";
import BookingPage from "./components/BookingPage";
import ReviewPage from "./components/ReviewPage";

import "./components/Style/Navbar.css";
import "./components/Style/Style.css";
import "./components/Style/Home.css";
import App1 from "./components/App1";
import { UserProvider } from "./components/UserContext";

const AppContent: React.FC = () => {
  const location = useLocation();

  
  const hideHeaderFooter = location.pathname === "/login" || location.pathname === "/signup";

  return (
    <div className="app-container">
      {!hideHeaderFooter && <Navbar />}

      <Routes>
  <Route path="/" element={<Home />} />
  <Route path="/login" element={<Login />} />
  <Route path="/signup" element={<Signup />} />
  <Route path="/teachers" element={<TeachersList />} />
  <Route path="/courses" element={<Courses />} />
  <Route path="/enroll/:courseId" element={<EnrollNow />} />
  <Route path="/book/:tutorId" element={<BookingPage />} />
  <Route path="/reviews" element={<ReviewPage />} />
  <Route path="/profile" element={<App1 />} /> 
</Routes>

      
    </div>
  );
};

const App: React.FC = () => {
  return (
    <UserProvider><Router>
    <AppContent />
  </Router></UserProvider>
    
  );
};

export default App;