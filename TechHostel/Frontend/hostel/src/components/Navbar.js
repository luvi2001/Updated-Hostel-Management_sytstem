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
			    <Link to="/">home</Link>
				<Link to="/search">search student</Link>
				<Link to="/gp">View gatepasses</Link>
				<Link to="/allstudents">View students</Link>
				<a href="/#">security</a>
				<a href="/#">health</a>
				<a href="/#">food</a>
				
			</nav>
			
		</header>
		</div>
	);
}

export default Navbar;
