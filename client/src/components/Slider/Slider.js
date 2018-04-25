import React, {Component} from "react";
import "./Slider.css";

class Slider extends Component {
	state = {

	}

	componentDidMount(){

	}

	render(){
		return(
			<section id="home" className="slider fullscreen scrollspy">
				<ul className="slides">
					<li>
						<img src="/assets/img/background1-compressed.jpg" alt="By Noah Erickson from Pexels" />
						<div className="caption center-align">
							<h3 className="grey-text text-lighten-2">Welcome to Jonathan Pan&apos;s <strong className="blue-text text-lighten-2">Portfolio</strong>!</h3>
							<h5 className="light grey-text text-lighten-5 hide-on-small-only"><strong>Here you will find an individual who enjoys coding! That&apos;s right, I enjoy it!</strong></h5>
						</div>
					</li>
					<li>
						<img src="/assets/img/background2-compressed.jpg" alt="By Lorenzo Cafaro from Pexels" />
						<div className="caption left-align">
							<h3 className="black-text">I work with <strong className="red-text darken-text-4">&quot;Most&quot;</strong> budgets.</h3>
							<h5 className="white-text  hide-on-small-only">If you want quality work for a cheapish price, hit me up!</h5>
						</div>
					</li>
					<li>
						<img src="/assets/img/background3-compressed.jpg" alt="backgound 3" />
						<div className="caption right-align">
							<h3>Hire Me Full-Time!</h3>
							<h5 className="light grey-text text-lighten-5 hide-on-small-only">I do freelance work as well. Since I&apos;m currently funemployed, I am looking for a full-time job.</h5>
						</div>
					</li>

				</ul>
			</section>
		)
	}
}

export default Slider;

// <li>
// 	<img src="/assets/img/domo5.jpg" alt="MERNster coder" />
// 	<div className="caption right-align">
// 		<h3>The <strong><span className="red-text darken-text-4">MERNster</span></strong> Coder!</h3>
// 		<h5 className="light grey-text text-lighten-5 hide-on-small-only"><strong>Do you even flexbox?!? --Joe Faulstick</strong></h5>
// 	</div>
// </li>