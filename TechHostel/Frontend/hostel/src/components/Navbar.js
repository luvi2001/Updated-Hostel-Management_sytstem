import { useRef } from "react";
import { Link, useNavigate } from 'react-router-dom'; // Import useHistory to navigate programmatically
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import "../css/nav.css";

function Navbar() {
    const navRef = useRef();
    const navigate = useNavigate(); // Get history object for programmatic navigation

    const handleLogout = () => {
        // Perform logout actions here (e.g., clear session)
        // Navigate to the login page
        navigate('/');
    };

    return (
        <div className="bar">
            <header>
                <h3>HOSTEL MANAGEMENT SYSTEM</h3>
                <nav ref={navRef}>
                    <Link to="/register">Register hostler</Link>
                    <Link to="/search">Search student</Link>
                    <Link to="/gp">View gatepasses</Link>
                    <Link to="/allstudents">View students</Link>
                    <Link to="/assigntask">Assign task</Link>
                    <Link to="/tasksall">All tasks</Link>
                    {/* Logout button with FontAwesome icon */}
                    <button className="logout-button" onClick={handleLogout}>
                        <FontAwesomeIcon icon={faSignOutAlt} />
                    </button>
                </nav>
            </header>
        </div>
    );
}

export default Navbar;
