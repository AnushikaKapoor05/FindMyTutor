import React, { useState } from "react";
import axios from "axios";
import "../components/Style/BookingPage.css";

const BookingPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    date: "",
    time: ""
  });

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5001/book", formData);
      if (res.status === 200) {
        setSuccess(true);
        setError("");
        setFormData({
          name: "",
          email: "",
          date: "",
          time: ""
        });
      }
    } catch (err) {
      console.error("Booking failed:", err);
      setError("Something went wrong. Please try again.");
      setSuccess(false);
    }
  };

  return (
    <div className="booking-container">
      <h2>📅 Book a Session</h2>
      <p>Select a date and time to book your session.</p>

      {success && <p className="success-message">✅ Booking confirmed!</p>}
      {error && <p className="error-message">❌ {error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />
        <input
          type="time"
          name="time"
          value={formData.time}
          onChange={handleChange}
          required
        />
        <button type="submit" className="book-btn">Confirm Booking ✅</button>
      </form>
    </div>
  );
};

export default BookingPage;