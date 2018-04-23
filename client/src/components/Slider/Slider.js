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
						<img src="/assets/img/quizit-team.png" alt="quizit-team" />
						<div className="caption center-align">
							<h2 className="grey-text text-lighten-2">Welcome to Jonathan Pan&apos;s <strong className="blue-text text-lighten-2">Portfolio</strong>!</h2>
							<h5 className="light grey-text text-lighten-5 hide-on-small-only"><strong>Here you will find an individual who enjoys coding! That&apos;s right, I enjoy it! Come@MeBro</strong></h5>
						</div>
					</li>
					<li>
						<img src="/assets/img/domo3.jpg" alt="domo3" />
						<div className="caption right-align">
							<h2>The <strong><span className="red-text darken-text-4">MERNster</span></strong> Coder!</h2>
							<h5 className="light grey-text text-lighten-5 hide-on-small-only"><strong>Do you even flexbox?!? --Joe Faulstick</strong></h5>
						</div>
					</li>
					<li>
						<img src="/assets/img/resort2.jpg" alt="domo" />
						<div className="caption left-align">
							<h2 className="black-text">I work with <strong className="red-text darken-text-4">&quot;Most&quot;</strong> budgets.</h2>
							<h5 className="white-text  hide-on-small-only"><strong>I hate being picky but I do need to pay mortgage and eat. If you want quality work for a cheapish price, hit me up!</strong></h5>
						</div>
					</li>
					<li>
						<img src="/assets/img/resort3.jpg" alt="resort3" />
						<div className="caption right-align">
							<h2>Hire Me Full-Time! (Please)</h2>
							<h5 className="light grey-text text-lighten-5 hide-on-small-only"><strong>I do freelance work as well. Since I&apos;m currently funemployed, I am definitely looking for a full-time job.</strong></h5>
						</div>
					</li>
				</ul>
			</section>
		)
	}
}

export default Slider;