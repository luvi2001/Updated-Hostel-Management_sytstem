import { useRef } from "react";
import "../css/nav.css";
import { Link } from 'react-router-dom'

function Navbar() {
	const navRef = useRef();



	return (
		<div className="bar">
		<header>
			<h3>HOSTEL MANANGEMENT SYSTEM</h3>
			<nav ref={navRef}>
			    <Link to="/">Register hostler</Link>
				<Link to="/securitysearch">Search student</Link>
				<Link to="/securityhome">Gate passes</Link>
				<Link to="/login">login</Link>
				
				
			</nav>
			
		</header>
		</div>
	);
}

export default Navbar;
