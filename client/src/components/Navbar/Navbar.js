import React, {Component} from "react";
import "./Navbar.css";

class Navbar extends Component {
	state = {

	}

	componentDidMount(){

	}

	render(){
		return (
		<div>
			<div className="navbar-fixed">
				<nav className="teal">
					<div className="container">
						<div className="nav-wrapper">
							<a href="#" className="brand-logo">Travelville</a>
							<a href="#" data-target="mobile-nav" className="sidenav-trigger">
								<i className="material-icons">menu</i>
							</a>
							<ul className="right hide-on-med-and-down">
								<li>
									<a href="#home">Home</a>
								</li>
								<li>
									<a href="#search">Search</a>
								</li>
								<li>
									<a href="#popular">Popular Places</a>
								</li>
								<li>
									<a href="#gallery">Gallery</a>
								</li>
								<li>
									<a href="#contact">Contact</a>
								</li>
							</ul>
						</div>
					</div>
				</nav>
			</div>
			<ul className="sidenav" id="mobile-nav">
				<li>
					<a href="#home">Home</a>
				</li>
				<li>
					<a href="#search">Search</a>
				</li>
				<li>
					<a href="#popular">Popular Places</a>
				</li>
				<li>
					<a href="#gallery">Gallery</a>
				</li>
				<li>
					<a href="#contact">Contact</a>
				</li>
			</ul>
		</div>
		)
	}
}

export default Navbar;