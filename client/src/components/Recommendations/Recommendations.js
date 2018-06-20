import React, {Component} from "react";
import "./Recommendations.css";
import RecommendationCard from "../RecommendationCard"
import recommendationObjects from "../../utils/recommendationObjects.js";
// const createMarkup = require("../../utils/library.js").createMarkup;

class Recommendations extends Component {
	render(){
		return(
			<section id="referrals" className="section white center scrollspy">
				<h4 className="revealThis">Totally <strong className="indigo-text darken-4">Legit</strong> Referrals</h4>
				<div className="container">
					<div className="row revealThis">
						
						<div className="slick-carousel">
							{recommendationObjects.map((recommendation,index)=>{
								return(
									<RecommendationCard
										key={index}
										img={recommendation.img}
										recommendation={recommendation.recommendation}
										firstName={recommendation.firstName}
										nickName={recommendation.nickName}
										lastName={recommendation.lastName}
									/>
								)
							})}
						</div>

					</div>
				</div>
			</section>
		)
	}
}

export default Recommendations;

						// <div className="col s12 m6 l4 recommendation-row-margin">
						// 	<div className="row no-margin">
						// 		<div className="col s10 offset-s1 m8 offset-m2 l10 offset-l1">
						// 			<img className="circle responsive-img" src="/assets/img/danielcuperman.jpg" alt="placeholder"/>
						// 		</div>
						// 	</div>
						// 	<div className="col s12 m10 offset-m1 l12">
						// 		<blockquote className="no-margin left-align">Uhh yeah I had this guy as a student in a class I TA&apos;ed for. He asked a lot of questions and liked to sit in the back of class most of the time. He coded some stuff and did things.
						// 		<cite>Daniel <strong>Wicked</strong> Cuperman</cite>
						// 		</blockquote>
						// 	</div>
						// </div>
						
						// <div className="col s12 m6 l4 recommendation-row-margin">
						// 	<div className="row no-margin">
						// 		<div className="col s10 offset-s1 m8 offset-m2 l10 offset-l1">
						// 			<img className="circle responsive-img" src="/assets/img/jaysonphillips.jpg" alt="placeholder"/>
						// 		</div>
						// 	</div>
						// 	<div className="col s12 m10 offset-m1 l12">
						// 		<blockquote className="no-margin left-align">Jon is an ok guy, I guess. He built this site with react and whatever else he decided to use so there&apos;s that. I taught him everything he knows, so you should be paying me to build your site, not this guy.
						// 		<cite>Jayson <strong>BestTeacher</strong> Phillips</cite>
						// 		</blockquote>
						// 	</div>
						// </div>

						// <div className="col s12 m6 l4 recommendation-row-margin">
						// 	<div className="row no-margin">
						// 		<div className="col s10 offset-s1 m8 offset-m2 l10 offset-l1">
						// 			<img className="circle responsive-img" src="/assets/img/georgeyoo.jpg" alt="placeholder"/>
						// 		</div>
						// 	</div>
						// 	<div className="col s12 m10 offset-m1 l12">
						// 		<blockquote className="no-margin left-align">Wow, this is awkward. Well, since Jon has no friends, he had to ask his bootcamp instructors to write him recommendations so here&apos;s my recommendation.
						// 		<cite>George <strong>Memester</strong> Yoo</cite>
						// 		</blockquote>
						// 	</div>
						// </div>