import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "../components/Style/EnrollNow.css";

const EnrollNow: React.FC = () => {
  const { courseId } = useParams();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    courseId: courseId || "",
    batchType: "",
    timeSlot: "",
  });  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
  
    try {
      const response = await fetch("http://localhost:5001/enroll/:courseId",{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: formData.name,
          email: formData.email,
          phoneNumber: formData.phone,
          courseName: formData.courseId,
          batchSchedule: formData.batchType,
          timeSlot: formData.timeSlot,
        }),
      });
  
      if (response.ok) {
        setFormSubmitted(true);
        setTimeout(() => {
          setFormSubmitted(false);
          setFormData({
            name: "",
            email: "",
            phone: "",
            courseId: courseId || "",
            batchType: "",
            timeSlot: "",
          });
        }, 3000);
      } else {
        alert("Enrollment failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during enrollment:", error);
      alert("Server error. Please try later.");
    } finally {
      setIsSubmitting(false);
    }
  };
  // Batch schedules
  const batchOptions = [
    { value: "monday-wednesday-friday", label: "Batch A: Monday, Wednesday, Friday" },
    { value: "tuesday-thursday-saturday", label: "Batch B: Tuesday, Thursday, Saturday" }
  ];

  // Time slot options
  const timeSlotOptions = [
    { value: "morning", label: "Morning: 9:00 AM - 11:00 AM" },
    { value: "afternoon", label: "Afternoon: 2:00 PM - 4:00 PM" },
    { value: "evening", label: "Evening: 6:00 PM - 8:00 PM" }
  ];

  return (
    <div className="enroll-fullscreen-container">
      <div className="enroll-card">
        <div className="enroll-header">
          <div className="enroll-icon">📚</div>
          <h2>Enroll Now</h2>
        </div>
        
        {formSubmitted ? (
          <div className="success-message">
            <div className="success-icon">✅</div>
            <h3>Enrollment Successful!</h3>
            <p>We've sent confirmation details to your email.</p>
            <p className="success-details">
              You've enrolled for the {formData.batchType.includes("monday") ? "Monday-Wednesday-Friday" : "Tuesday-Thursday-Saturday"} batch <br />
              Time: {timeSlotOptions.find(slot => slot.value === formData.timeSlot)?.label || formData.timeSlot}
            </p>
          </div>
        ) : (
          <>
            <p className="enroll-description">
              Complete the form below to secure your spot in this course.
            </p>
            
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Full Name</label>
                  <input 
                    type="text" 
                    id="name"
                    name="name" 
                    placeholder="Enter your full name" 
                    value={formData.name} 
                    onChange={handleChange} 
                    required 
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input 
                    type="email" 
                    id="email"
                    name="email" 
                    placeholder="your.email@example.com" 
                    value={formData.email} 
                    onChange={handleChange} 
                    required 
                  />
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input 
                    type="tel" 
                    id="phone"
                    name="phone" 
                    placeholder="Your contact number" 
                    value={formData.phone} 
                    onChange={handleChange} 
                    required 
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="batchType">Select Batch Schedule</label>
                  <select
                    id="batchType"
                    name="batchType"
                    value={formData.batchType}
                    onChange={handleChange}
                    required
                  >
                    <option value="">-- Select Batch Days --</option>
                    {batchOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-group time-slot-group">
                <label htmlFor="timeSlot">Select Time Slot</label>
                <select
                  id="timeSlot"
                  name="timeSlot"
                  value={formData.timeSlot}
                  onChange={handleChange}
                  required
                >
                  <option value="">-- Select Preferred Time --</option>
                  {timeSlotOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="schedule-info">
                <h4>Class Schedule Overview</h4>
                <div className="schedule-grid">
                  <div className="schedule-item">
                    <span className="day">Monday</span>
                    <span className="batch">Batch A</span>
                  </div>
                  <div className="schedule-item">
                    <span className="day">Tuesday</span>
                    <span className="batch">Batch B</span>
                  </div>
                  <div className="schedule-item">
                    <span className="day">Wednesday</span>
                    <span className="batch">Batch A</span>
                  </div>
                  <div className="schedule-item">
                    <span className="day">Thursday</span>
                    <span className="batch">Batch B</span>
                  </div>
                  <div className="schedule-item">
                    <span className="day">Friday</span>
                    <span className="batch">Batch A</span>
                  </div>
                  <div className="schedule-item">
                    <span className="day">Saturday</span>
                    <span className="batch">Batch B</span>
                  </div>
                </div>
              </div>
              
              <button 
                type="submit" 
                className={`enroll-btn ${isSubmitting ? 'submitting' : ''}`} 
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Processing...' : 'Enroll Now'} 
                {!isSubmitting && <span className="btn-icon">🚀</span>}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default EnrollNow;