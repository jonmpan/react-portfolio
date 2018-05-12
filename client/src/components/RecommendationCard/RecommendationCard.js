import React, {Component} from "react";
import "./RecommendationCard.css";

const createMarkup = require("../../utils/library.js").createMarkup;

class RecommendationCard extends Component {
	render(){
		return(
			<div className="portfolio-slick-padding">
				<div className="row no-margin">
					<div className="col s10 offset-s1 m8 offset-m2 l10 offset-l1">
						<img 
							className="circle responsive-img"
							src={this.props.img}
							alt="placeholder"
						/>
					</div>
				</div>
				<div className="col s12 m10 offset-m1 l12">
					<blockquote className="no-margin left-align">
						<div 
							dangerouslySetInnerHTML={createMarkup(this.props.recommendation)}
						/>
						<cite>{this.props.firstName} <strong>{this.props.nickName}</strong> {this.props.lastName}</cite>
					</blockquote>
				</div>
			</div>
		)
	}
}

export default RecommendationCard;