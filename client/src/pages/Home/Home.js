import React, {Component} from "react";
import Slider from "../../components/Slider";
import Details from "../../components/Details";
import Pushdown from "../../components/Pushdown";
import Portfolio from "../../components/Portfolio";
import AdditionalDetails from "../../components/AdditionalDetails";
import Recommendations from "../../components/Recommendations";
import Follow from "../../components/Follow";
import Contact from "../../components/Contact";
import AboutMe from "../../components/AboutMe";
// import TestItems from "../../components/TestItems";
// import ParallaxDetails from "../../components/ParallaxDetails";

class Home extends Component {
	state = {

	}

	render(){
		return (
			<div>
				<Slider />
				<Pushdown />
				<AboutMe />
				{/*<TestItems />*/}
				{/*<ParallaxDetails />*/}
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