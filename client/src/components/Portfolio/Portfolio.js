import React, {Component} from "react";
import "./Portfolio.css";
import PortfolioCard from "../PortfolioCard";
import portfolioObjects from "../../utils/portfolioObjects.js";

class Portfolio extends Component {
	render(){
		return(
			<section id="portfolio" className="section indigo lighten-5 scrollspy">
				<div className="container">
					<h4 className="revealThis center">My Recent <strong className="indigo-text">Portfolio</strong> Pieces!</h4>
					<h5 className="revealThis center">Click on arrows, drag, or swipe!</h5>
					<div className="revealThis slick-carousel">
						{portfolioObjects.map((portfolioObject,index)=>{
							return(
								<PortfolioCard
									img={portfolioObject.img}
									title={portfolioObject.title}
									description={portfolioObject.description}
									urlDemo={portfolioObject.urlDemo}
									urlCode={portfolioObject.urlCode}
									details={portfolioObject.details}
									key={index}
								/>
							)
						})}
					</div>
				</div>
			</section>
		)
	}
}

export default Portfolio;