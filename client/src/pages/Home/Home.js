import React, {Component} from "react";
import Slider from "../../components/Slider";
import Details from "../../components/Details";
import Pushdown from "../../components/Pushdown";
import Portfolio from "../../components/Portfolio";
import AdditionalDetails from "../../components/AdditionalDetails";
import Recommendations from "../../components/Recommendations";
import Follow from "../../components/Follow";
import Contact from "../../components/Contact";

class Home extends Component {
	state = {

	}

	render(){
		return (
			<div>
				<Slider />
				<Pushdown />
				<Details />
				<AdditionalDetails />
				<Recommendations />
				<Portfolio />
				<Follow />
				<Contact />
			</div>
		)
	}
}

export default Home;