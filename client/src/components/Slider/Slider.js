import React, {Component} from "react";
import "./Slider.css";

class Slider extends Component {
	state = {

	}

	componentDidMount(){

	}

	render(){
		return(
			<section className="slider fullscreen">
				<ul className="slides">
					<li>
						<img src="/assets/img/resort1.jpg" alt="resort1" />
						<div className="caption center-align">
							<h2>Take Your Dream Vacation</h2>
							<h5 className="light grey-text text-lighten-3 hide-on-small-only">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem, provident eos dicta unde debitis</h5>
						</div>
					</li>
					<li>
						<img src="/assets/img/resort2.jpg" alt="resort2" />
						<div className="caption left-align">
							<h2>We Work With All Budgets</h2>
							<h5 className="light grey-text text-lighten-3 hide-on-small-only">Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus delectus inventore neque impedit</h5>
						</div>
					</li>
					<li>
						<img src="/assets/img/resort3.jpg" alt="resort3" />
						<div className="caption right-align">
							<h2>Group & Individual Getaways</h2>
							<h5 className="light grey-text text-lighten-3 hide-on-small-only">Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt ipsum molestias excepturi doloremque</h5>
						</div>
					</li>
				</ul>
			</section>
		)
	}
}

export default Slider;