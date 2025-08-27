import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../components/Style/Style.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useUser } from "../components/UserContext";

function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { setUsername } = useUser();  // Context for storing user email

    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!email || !password) {
            setError("Please fill in both fields.");
            return;
        }

        try {
            const response = await fetch("http://localhost:5001/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.message || "Login failed.");
                return;
            }

            // ✅ Login successful
            setUsername(email);                        // Set in Context
            localStorage.setItem("userEmail", email);  // Optional: persist across reloads
            navigate("/profile");                      // Redirect to profile page

        } catch (err) {
            console.error("Login error:", err);
            setError("Something went wrong. Please try again.");
        }
    };

    return (
        <div className="container">
            {/* Left Login Panel */}
            <div className="left-panel">
                <h2>Login to FindMyTutor</h2>
                <form onSubmit={handleLogin}>
                    <div className="input-group">
                        <input
                            type="email"
                            placeholder="Enter Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <span className="eye-icon" onClick={togglePasswordVisibility}>
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                    </div>

                    {error && <p className="error-message">{error}</p>}

                    <div className="remember-forgot">
                        <label><input type="checkbox" /> Remember Me</label>
                        <a href="#">Forgot Password?</a>
                    </div>

                    <button type="submit" className="login-btn">Login</button>

                   

                    <button
                        type="button"
                        className="signup-btn"
                        onClick={() => navigate("/signup")}
                    >
                        Don't have an account? Sign Up
                    </button>
                </form>
            </div>

            {/* Right Branding Panel */}
            <div className="right-panel">
                <h3>Welcome to FindMyTutor!</h3>
                <p>Unlock a world of learning tailored just for you! Log in to access your personalized dashboard, set goals, and make learning an exciting journey. 🚀📚</p>
            </div>
        </div>
    );
}

export default Login;