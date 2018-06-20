import React, {Component} from "react";
import "./Details.css";

class Details extends Component {

	render(){
		return(
			<section id="technologies" className="section section-icons white lighten-4 center scrollspy">
				<div className="container">
					<h4 className="revealThis"><strong className="indigo-text darken-4">MERN</strong> Developer</h4>
					<div className="row revealThis">
						<div className="col s12 m6 l3">
							<div className="card-panel">
								<img className="responsive-img" src="/assets/img/mongodb.jpg" alt="mongodb" />
								<ul className="collection">
									<li className="collection-item">MongoDB/MySQL</li>
									<li className="collection-item">Mongoose</li>
									<li className="collection-item">Sequelize</li>
									<li className="collection-item">Custom ODM/ORM</li>
								</ul>
							</div>
						</div>
						<div className="col s12 m6 l3">
							<div className="card-panel">
								<img className="responsive-img" src="/assets/img/express.jpg" alt="express" />
								<ul className="collection">
									<li className="collection-item">Server Setup</li>
									<li className="collection-item">RESTful API</li>
									<li className="collection-item">Templating</li>
									<li className="collection-item">Routing</li>
								</ul>								
							</div>
						</div>
						<div className="col s12 m6 l3">
							<div className="card-panel">
								<img className="responsive-img" src="/assets/img/react.png" alt="react" />
								<ul className="collection">
									<li className="collection-item">Redux</li>
									<li className="collection-item">Mobile Styling</li>
									<li className="collection-item">Custom Styling</li>
									<li className="collection-item">State Management</li>
								</ul>								
							</div>
						</div>
						<div className="col s12 m6 l3">
							<div className="card-panel">
								<img className="responsive-img" src="/assets/img/nodejs.png" alt="nodejs" />
								<ul className="collection">
									<li className="collection-item">Package Manager</li>
									<li className="collection-item">Encryption</li>
									<li className="collection-item">Authentication</li>
									<li className="collection-item">Testing</li>
								</ul>
							</div>
						</div>						
					</div>
				</div>
			</section>
		)
	}
}
// <p>Powerful and fast database management. Can use relational MySQL instead.</p>
// <p>Modern server routing, custom API's, and server-side logic/authentication.</p>
export default Details;