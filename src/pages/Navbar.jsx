import { Link } from "react-router-dom";
import '../styles/navbar.css';

const Navbar = () => {
    return (
        <nav className='navbar'>
            <h1>Festivity Forge</h1>
            <div className="links">
                <Link to="/">Home</Link>
                <Link to="/create-event">Create Event</Link>
                <Link to="/view-events">View Events</Link>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
            </div>
        </nav>
    );
}

export default Navbar;