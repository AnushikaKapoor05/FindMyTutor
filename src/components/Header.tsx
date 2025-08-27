import { Link } from 'react-router-dom';
import '../components/Style/global.css';

const Header = () => {
  return (
    <header className="header">
      <div className="logo">Find My Tutor</div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/tutors">Tutors</Link>
        <Link to="/login">Login</Link>
        <Link to="/signup">Signup</Link>
      </nav>
    </header>
  );
};

export default Header;