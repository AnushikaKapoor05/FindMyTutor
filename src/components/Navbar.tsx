
import { Link } from "react-router-dom";
import "../components/Style/Navbar.css";

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="nav-logo">Find My Tutor</div>
            <ul className="nav-links">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/courses">Courses</Link></li>
                <li><Link to="/teachers">Teachers</Link></li>
                <li><Link to="/reviews">Reviews</Link></li>
            </ul>
            <div className="nav-buttons">
                <Link to="/login" className="nav-btn">Login</Link>
                <Link to="/signup" className="nav-btn">Sign Up</Link>
                <Link to="/profile" className="nav-btn profile-icon" title="Profile">👤</Link>
            </div>
        </nav>
    );
};

export default Navbar;