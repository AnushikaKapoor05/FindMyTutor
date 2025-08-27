import React, { useEffect, useState } from 'react';
import "../components/Style/Profile.css";
import axios from 'axios';

interface ProfileData {
  name: string;
  email: string;
  enrolled_id: number;
  course_name: string;
  batch_schedule: string;
  time_slot: string;
  booked_id: number;
  session_date: string;
  session_time: string;
}

const App1: React.FC = () => {
  const [profile, setProfile] = useState<ProfileData[]>([]);
  const email = localStorage.getItem("userEmail");

  useEffect(() => {
    if (email) {
      axios.get(`http://localhost:3001/api/profile/${email}`)
        .then(res => setProfile(res.data))
        .catch(err => console.error(err));
    }
  }, [email]);

  return (
    <div className="profile-container">
      {profile.length > 0 && (
        <>
        <h2>{profile[0].name}'s Profile</h2>
        <p>Email: {profile[0].email}</p>
      
        <div className="profile-section-wrapper">
          <div className="profile-section">
            <h3>Enrolled Subjects</h3>
            {profile.map((entry, idx) => (
              <div key={`enrolled-${idx}`} className="profile-card">
                <p><strong>ID:</strong> {entry.enrolled_id}</p>
                <p><strong>Course:</strong> {entry.course_name}</p>
                <p><strong>Schedule:</strong> {entry.batch_schedule}</p>
                <p><strong>Time Slot:</strong> {entry.time_slot}</p>
              </div>
            ))}
          </div>
      
          <div className="profile-section">
            <h3>Booked Sessions</h3>
            {profile.map((entry, idx) => (
              entry.booked_id && (
                <div key={`booked-${idx}`} className="profile-card">
                  <p><strong>ID:</strong> {entry.booked_id}</p>
                  <p><strong>Date:</strong> {entry.session_date}</p>
                  <p><strong>Time:</strong> {entry.session_time}</p>
                </div>
              )
            ))}
          </div>
        </div>
      </>
      
      )}
    </div>
  );
};

export default App1;