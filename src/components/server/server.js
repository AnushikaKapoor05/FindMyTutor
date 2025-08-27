const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bcrypt = require("bcrypt");

const app = express();
app.use(express.json());
app.use(cors());


const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "rootroot",
  database: "Project",
});

db.connect((err) => {
  if (err) {
    console.error("❌ MySQL Connection Error:", err);
  } else {
    console.log("✅ Connected to MySQL");
  }
});


app.get("/", (req, res) => {
  res.json("hello server");
});


app.get("/users", (req, res) => {
  const query = "SELECT * FROM users";
  db.query(query, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json(data);
  });
});

app.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password.trim(), 10);
    const cleanEmail = email.toLowerCase().trim();
    const sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
    db.query(sql, [name, cleanEmail, hashedPassword], (err, result) => {
      if (err) {
        console.error("❌ Signup error:", err);
        return res.status(500).json({ message: "Signup failed", error: err });
      }
      res.status(200).json({ message: "Signup successful", userId: result.insertId });
    });
  } catch (err) {
    res.status(500).json({ message: "Password hashing failed", error: err });
  }
});



app.post("/login", (req, res) => {
  const email = req.body.email?.toLowerCase().trim();
  const password = req.body.password?.trim();

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const sql = "SELECT * FROM users WHERE LOWER(email) = ?";
  db.query(sql, [email], async (err, data) => {
    if (err) return res.status(500).json({ message: "Server error", error: err });
    if (data.length === 0) return res.status(404).json({ message: "User not found" });

    const user = data[0];

    try {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(401).json({ message: "Incorrect password" });

      const { password: _, ...userWithoutPassword } = user;
      return res.status(200).json({ message: "Login successful", user: userWithoutPassword });
    } catch (error) {
      return res.status(500).json({ message: "Authentication failed", error: error.message });
    }
  });
});


app.post("/reviews", (req, res) => {
  const { name, course, reviewText, rating, improvement } = req.body;

  const sql = `
    INSERT INTO reviews (name, course, reviewText, rating, improvement)
    VALUES (?, ?, ?, ?, ?)`;

  db.query(sql, [name, course, reviewText, rating, improvement], (err, result) => {
    if (err) {
      console.error("Error inserting review:", err);
      return res.status(500).json({ error: "Failed to insert review" });
    }
    res.status(200).json({ message: "Review submitted successfully!" });
  });
});
app.get("/reviews", (req, res) => {
  const sql = "SELECT * FROM reviews";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching reviews:", err);
      return res.status(500).json({ error: "Failed to fetch reviews" });
    }
    res.status(200).json(results);
  });
});



app.post("/enroll/:courseId", (req, res) => {
  const { fullName, email, phoneNumber, courseName, batchSchedule, timeSlot } = req.body;

  if (!fullName || !email || !phoneNumber || !courseName || !batchSchedule || !timeSlot) {
    return res.status(400).json({ message: "All fields are required" });
  }
  const sql = `
    INSERT INTO enrolled_subjects 
    (full_name, user_email, phone_number, course_name, batch_schedule, time_slot)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [fullName, email, phoneNumber, courseName, batchSchedule, timeSlot],
    (err, result) => {
      if (err) {
        console.error("❌ Enrollment error:", err);
        return res.status(500).json({ message: "Enrollment failed", error: err });
      }
      res.status(200).json({ message: "Enrollment successful", enrollmentId: result.insertId });
    }
  );
});



app.post("/book", (req, res) => {
  const { name, email, date, time } = req.body;

  if (!name || !email || !date || !time) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const sql = `
    INSERT INTO booked_sessions 
    (full_name, user_email, session_date, session_time)
    VALUES (?, ?, ?, ?)
  `;

  db.query(sql, [name, email, date, time], (err, result) => {
    if (err) {
      console.error("❌ Booking error:", err);
      return res.status(500).json({ message: "Booking failed", error: err });
    }
    res.status(200).json({ message: "Booking successful", bookingId: result.insertId });
  });
});
app.get('/api/profile/:email', (req, res) => {
  const email = req.params.email;

  const sql = `
    SELECT 
        u.NAME AS name,
        u.EMAIL AS email,
        es.id AS enrolled_id,
        es.course_name,
        es.batch_schedule,
        es.time_slot,
        bs.id AS booked_id,
        bs.session_date,
        bs.session_time
    FROM users u
    LEFT JOIN enrolled_subjects es ON u.EMAIL = es.user_email
    LEFT JOIN booked_sessions bs ON u.EMAIL = bs.user_email
    WHERE u.EMAIL = ?;
  `;

  db.query(sql, [email], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json(result);
  });
});

app.listen(3001, () => {
  console.log("Server running on port 3001");
});


app.listen(5001, () => {
  console.log("🚀 Server running on port 5001");
});