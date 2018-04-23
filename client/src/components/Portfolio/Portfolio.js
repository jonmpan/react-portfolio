import React, {Component} from "react";
import "./Portfolio.css";
import PortfolioCard from "../PortfolioCard";
import portfolioObjects from "../../utils/portfolioObjects.js";

class Portfolio extends Component {
	render(){
		return(
			<section id="portfolio" className="section section-popular indigo lighten-5 scrollspy">
				<div className="container">
					<h4 className="center">My Recent <strong className="indigo-text darken-4">Portfolio</strong> Pieces!</h4>
					<div className="slick-carousel">
						{portfolioObjects.map((portfolioObject,index)=>{
							return(
								<PortfolioCard
									img={portfolioObject.img}
									title={portfolioObject.title}
									description={portfolioObject.description}
									urlDemo={portfolioObject.urlDemo}
									urlCode={portfolioObject.urlCode}
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

					// <div className="row">
					// 	<h4 className="center">My <strong className="indigo-text darken-4">Portfolio</strong></h4>
					// 	<div className="col s12 m6 l4">
					// 		<div className="card">
					// 			<div className="card-image">
					// 				<img src="/assets/img/resort1.jpg" alt="" />
					// 			</div>
					// 			<div className="card-content">
					// 				<h5 className="no-top-margin"><strong className="indigo-text darken-4">QuizIt!</strong></h5>
					// 				QuizIt is a live, multiplayer trivia game. Utilizing socket.io, QuizIt ensures that all users are seeing the same question and playing at the same time!
					// 			</div>
					// 			<div class="card-action">
					// 				<a target="_blank" href="https://fierce-oasis-31783.herokuapp.com/" class="waves-effect waves-light btn small-margins btn-custom-portfolio indigo darken-4"><i class="material-icons left">play_arrow</i><strong>DEMO</strong></a>
					// 				<a target="_blank" href="https://github.com/Binary-Squad/QuizIt" class="waves-effect waves-light btn small-margins btn-custom-portfolio indigo darken-4"><i class="material-icons right">code</i><strong>CODE</strong></a>
					// 			</div>
					// 		</div>
					// 	</div>
					// 	<div className="col s12 m6 l4">
					// 		<div className="card">
					// 			<div className="card-image">
					// 				<img src="/assets/img/resort1.jpg" alt="" />
					// 			</div>
					// 			<div className="card-content">
					// 				<h5 className="no-top-margin"><strong className="indigo-text darken-4">JP&apos;s Portfolio</strong></h5>
					// 				This portfolio site is also a portfolio piece. It is built with a full MERN stack. Perhaps I will add some server/client functionality to this site later.
					// 			</div>
					// 			<div class="card-action">
					// 				<a target="_blank" href="https://peaceful-inlet-20360.herokuapp.com/" class="waves-effect waves-light btn small-margins btn-custom-portfolio indigo darken-4"><i class="material-icons left">play_arrow</i><strong>DEMO</strong></a>
					// 				<a target="_blank" href="https://github.com/jonmpan/new-portfolio" class="waves-effect waves-light btn small-margins btn-custom-portfolio indigo darken-4"><i class="material-icons right">code</i><strong>CODE</strong></a>
					// 			</div>
					// 		</div>
					// 	</div>
					// 	<div className="col s12 m6 l4">
					// 		<div className="card">
					// 			<div className="card-image">
					// 				<img src="/assets/img/resort1.jpg" alt="" />
					// 			</div>
					// 			<div className="card-content">
					// 				<h5 className="no-top-margin"><strong className="indigo-text darken-4">Closets x3</strong></h5>
					// 				Closets Closets Closets is a silly site where you can post items you may own. The authentication system for this site was never completed but you can still make a snazzy collection.
					// 			</div>
					// 			<div class="card-action">
					// 				<a target="_blank" href="https://floating-thicket-42503.herokuapp.com/" class="waves-effect waves-light btn small-margins btn-custom-portfolio indigo darken-4"><i class="material-icons left">play_arrow</i><strong>DEMO</strong></a>
					// 				<a target="_blank" href="https://github.com/the-bristools/closetsclosetsclosets" class="waves-effect waves-light btn small-margins btn-custom-portfolio indigo darken-4"><i class="material-icons right">code</i><strong>CODE</strong></a>
					// 			</div>
					// 		</div>
					// 	</div>
					// 	<div className="col s12 m6 l4">
					// 		<div className="card">
					// 			<div className="card-image">
					// 				<img src="/assets/img/resort1.jpg" alt="" />
					// 			</div>
					// 			<div className="card-content">
					// 				<h5 className="no-top-margin"><strong className="indigo-text darken-4">cApi-Paste</strong></h5>
					// 				CApi-Paste was my first project. Made entirely with static HTML, this site demonstrates some common use cases for some API&apos;s.
					// 			</div>
					// 			<div class="card-action">
					// 				<a target="_blank" href="https://first-project-tom-jon-suneetha.github.io/cAPI-PASTE/" class="waves-effect waves-light btn small-margins btn-custom-portfolio indigo darken-4"><i class="material-icons left">play_arrow</i><strong>DEMO</strong></a>
					// 				<a target="_blank" href="https://github.com/First-Project-Tom-Jon-Suneetha/cAPI-PASTE" class="waves-effect waves-light btn small-margins btn-custom-portfolio indigo darken-4"><i class="material-icons right">code</i><strong>CODE</strong></a>
					// 			</div>
					// 		</div>
					// 	</div>
					// 	<div className="col s12 m6 l4">
					// 		<div className="card">
					// 			<div className="card-image">
					// 				<img src="/assets/img/resort1.jpg" alt="" />
					// 			</div>
					// 			<div className="card-content">
					// 				<h5 className="no-top-margin"><strong className="indigo-text darken-4">JP&apos;s Portfolio</strong></h5>
					// 				This site is also a portfolio piece. It is built with a full MERN stack. Perhaps I will add some server/client functionality to this site later.
					// 			</div>
					// 			<div class="card-action">
					// 				<a target="_blank" href="https://peaceful-inlet-20360.herokuapp.com/" class="waves-effect waves-light btn small-margins btn-custom-portfolio indigo darken-4"><i class="material-icons left">play_arrow</i><strong>DEMO</strong></a>
					// 				<a target="_blank" href="https://github.com/jonmpan/new-portfolio" class="waves-effect waves-light btn small-margins btn-custom-portfolio indigo darken-4"><i class="material-icons right">code</i><strong>CODE</strong></a>
					// 			</div>
					// 		</div>
					// 	</div>
					// 	<div className="col s12 m6 l4">
					// 		<div className="card">
					// 			<div className="card-image">
					// 				<img src="/assets/img/resort1.jpg" alt="" />
					// 			</div>
					// 			<div className="card-content">
					// 				<h5 className="no-top-margin"><strong className="indigo-text darken-4">Closets x3</strong></h5>
					// 				QuizIt is a live, multiplayer trivia game. Utilizing socket.io, QuizIt ensures that all users are seeing the same question and playing at the same time!
					// 			</div>
					// 			<div class="card-action">
					// 				<a target="_blank" href="https://floating-thicket-42503.herokuapp.com/" class="waves-effect waves-light btn small-margins btn-custom-portfolio indigo darken-4"><i class="material-icons left">play_arrow</i><strong>DEMO</strong></a>
					// 				<a target="_blank" href="https://github.com/the-bristools/closetsclosetsclosets" class="waves-effect waves-light btn small-margins btn-custom-portfolio indigo darken-4"><i class="material-icons right">code</i><strong>CODE</strong></a>
					// 			</div>
					// 		</div>
					// 	</div>
					// 	</div>