import React, {Component} from "react";
import "./ParallaxDetails.css";

class ParallaxDetails extends Component {

	render(){
		return(
			<div id="services" className="parallax-container parallax-custom scrollspy">
				<div className="parallax parallax-custom"><img src="/assets/img/parallax1.jpg" /></div>
				<div className="section">
					<div className="container">
						<div className="row">
							<h3 className="revealThis weight-100 center white-text huge-bottom-margin">SERVICES</h3>
							<br />
							<div className="revealThis col s12 m6 l4 center">
								<i className="material-icons large white-text">desktop_windows</i>
								<h5 className="white-text weight-100 large-margins">DESKTOP</h5>
								<p className="white-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed risus ultrices, iaculis diam vel, rutrum massa. Donec odio urna, tristique eget mi luctus, consequat eleifend nisl. Nunc sed quam vulputate justo efficitur blandit sed nec mauris. Quisque gravida porttitor nunc, a ullamcorper odio gravida at.</p>
								<br className="hide-on-large-only" />
							</div>
							<div className="revealThis col s12 m6 l4 center">
								<i className="material-icons large white-text">phone_iphone</i>
								<h5 className="white-text weight-100 large-margins">MOBILE</h5>
								<p className="white-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed risus ultrices, iaculis diam vel, rutrum massa. Donec odio urna, tristique eget mi luctus, consequat eleifend nisl. Nunc sed quam vulputate justo efficitur blandit sed nec mauris. Quisque gravida porttitor nunc, a ullamcorper odio gravida at.</p>
								<br className="hide-on-large-only" />
							</div>
							<div className="revealThis col s12 m6 l4 center">
								<i className="material-icons large white-text">games</i>
								<h5 className="white-text weight-100 large-margins">GAMES</h5>
								<p className="white-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed risus ultrices, iaculis diam vel, rutrum massa. Donec odio urna, tristique eget mi luctus, consequat eleifend nisl. Nunc sed quam vulputate justo efficitur blandit sed nec mauris. Quisque gravida porttitor nunc, a ullamcorper odio gravida at.</p>
								<br className="hide-on-large-only" />
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}
// <p>Powerful and fast database management. Can use relational MySQL instead.</p>
// <p>Modern server routing, custom API's, and server-side logic/authentication.</p>
export default ParallaxDetails;