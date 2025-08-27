import React, { useState, useEffect } from "react";
import axios from "axios";
import "../components/Style/ReviewPage.css";
interface Review {
  id?: number;
  studentName: string;
  course: string;
  reviewText: string;
  rating: number;
  improvement: string;
}
const ReviewPage: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newReview, setNewReview] = useState<Review>({
    studentName: "",
    course: "",
    reviewText: "",
    rating: 0,
    improvement: "",
  });
  useEffect(() => {
    axios.get("http://localhost:5001/reviews")
      .then((res) => {
        setReviews(res.data);
      })
      .catch((err) => {
        console.error("Error fetching reviews:", err);
      });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setNewReview({ ...newReview, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!newReview.studentName || !newReview.course || !newReview.reviewText || newReview.rating === 0) {
      alert("Please fill all fields before submitting.");
      return;
    }

    axios.post("http://localhost:5001/reviews", newReview)
      .then((res) => {
        alert("Review submitted successfully!");
        // Update UI
        setReviews([...reviews, newReview]);
        setNewReview({
          studentName: "",
          course: "",
          reviewText: "",
          rating: 0,
          improvement: "",
        });
      })
      .catch((err) => {
        console.error("Error submitting review:", err);
        alert("Something went wrong!");
      });
  };

  return (
    <div className="review-container">
      <h2>Student Reviews</h2>

      {/* Display Existing Reviews */}
      {reviews.map((review, index) => (
        <div key={index} className="review-card">
          <h3>{review.studentName}</h3>
          <p><strong>Course:</strong> {review.course}</p>
          <p className="review-text">"{review.reviewText}"</p>
          <div className="rating">
            {Array.from({ length: 5 }, (_, i) => (
              <span key={i} className={i < review.rating ? "star filled" : "star"}>★</span>
            ))}
          </div>
          <p><strong>Suggested Improvement:</strong> {review.improvement}</p>
        </div>
      ))}

      {/* Add New Review Form */}
      <div className="review-form">
        <h3>Leave a Review</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="studentName"
            placeholder="Your Name"
            value={newReview.studentName}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="course"
            placeholder="Course Name"
            value={newReview.course}
            onChange={handleChange}
            required
          />
          <textarea
            name="reviewText"
            placeholder="Your Review"
            value={newReview.reviewText}
            onChange={handleChange}
            required
          />
          <input
            
            name="rating"
            placeholder="Enter the ratiing (1-5)"
            value={newReview.rating}
            min="1"
            max="5"
            onChange={handleChange}
            required
          />
          <textarea
            name="improvement"
            placeholder="Any suggestions for improvement?"
            value={newReview.improvement}
            onChange={handleChange}
          />
          <button type="submit" className="submit-btn">Submit Review</button>
        </form>
      </div>
    </div>
  );
};
export default ReviewPage;