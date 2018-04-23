import React, {Component} from "react";
import "./AdditionalDetails.css";

class AdditionalDetails extends Component {
	render(){
		return(
			<section className="section grey lighten-4 center">
			<h4><span className="teal-text">Additional</span> Technologies</h4>
			<div className="container">
				<div className="row">
					<div className="col s10 offset-s1 m8 offset-m2">
						<ul className="collapsible">
							<li>
								<div className="collapsible-header"><i className="material-icons">computer</i>Front-End Technologies</div>
								<div className="collapsible-body white left-align">
									<ul>
										<li>HTML5</li>
										<li>HTML5 Canvas</li>
										<li>CSS3</li>
										<li>CSS Animation/Keyframes</li>
										<li>Bootstrap 3/4</li>
										<li>Materialize</li>
										<li>Handlebars</li>
										<li>JQuery</li>
										<li>Javascript ES5/ES6</li>
										<li>Animate.css</li>
									</ul>
								</div>
							</li>
							<li>
								<div className="collapsible-header"><i className="material-icons">build</i>Back-End Technologies</div>
								<div className="collapsible-body white left-align">
									<ul>
										<li>Passport</li>
										<li>CORS</li>
										<li>Jsonwebtoken</li>
										<li>Axios</li>
										<li>Mocha/Chai</li>
										<li>Nightmare</li>
										<li>Bcrypt</li>
										<li>Firebase</li>
									</ul>
								</div>
							</li>
							<li>
								<div className="collapsible-header"><i className="material-icons">devices_other</i>Other Technologies</div>
								<div className="collapsible-body white left-align">
									<ul>
										<li>Git</li>
										<li>Heroku</li>
										<li>Godaddy</li>
										<li>Trello</li>
										<li>Agile Development</li>
										<li>Fighter Factory</li>
									</ul>
								</div>
							</li>
						</ul>
					</div>
				</div>
			</div>
			</section>
		)
	}
}

export default AdditionalDetails;