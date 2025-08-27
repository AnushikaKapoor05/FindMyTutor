import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../components/Style/Style.css";
import axios from "axios";

function Signup() {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: ''
    });

    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    };

    const handleSignup = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            const res = await axios.post("http://localhost:5001/signup", values, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (res.status === 200) {
                // ✅ Signup successful, navigate to login
                navigate("/login");
            }
        } catch (err: any) {
            console.error("Signup error:", err);
            setError(err.response?.data?.message || "Signup failed. Try again.");
        }
    };

    const goToLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        navigate("/login");
    };

    return (
        <div className="container">
            {/* Left Signup Panel */}
            <div className="left-panel">
                <h2>Create an Account</h2>
                <form onSubmit={handleSignup}>
                    <div className="input-group">
                        <input
                            type="text"
                            placeholder="Username"
                            name="name"
                            value={values.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <input
                            type="email"
                            placeholder="Email"
                            name="email"
                            value={values.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={values.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {error && <p className="error-message">{error}</p>}

                    <button type="submit" className="signup-btn">
                        Register
                    </button>

                    <button className="login-btn" onClick={goToLogin}>
                        Already have an account? Log in
                    </button>
                </form>
            </div>

            {/* Right Branding Panel */}
            <div className="right-panel">
                <h3>Welcome to FindMyTutor</h3>
                <p>Create an account to start your learning journey with expert tutors and personalized guidance.</p>
                <p>📚 Gain access to top tutors.</p>
                <p>🎯 Set learning goals and track progress.</p>
                <p>💡 Make learning engaging and interactive.</p>
                <p>Sign up today and take the first step toward success! 🚀</p>
            </div>
        </div>
    );
}

export default Signup;