import React, {Component} from "react";
import "./PortfolioCard.css";

const createMarkup = require("../../utils/library.js").createMarkup;

class PortfolioCard extends Component{
	render(){
		return(
			<div className="portfolio-slick-padding">
				<div className="card">
					<div className="card-image">
						<img src={this.props.img} alt="" />
					</div>
					<div className="card-content">
						<a href={this.props.urlDemo} target="_blank"><h5 className="no-top-margin"><strong className="indigo-text darken-4" dangerouslySetInnerHTML={createMarkup(this.props.title)}></strong></h5></a>
						<div className="small-bottom-margin" dangerouslySetInnerHTML={createMarkup(this.props.description)}></div>
						<div className="wrap-x-overflow row no-bottom-margin small-top-margin">
						{this.props.details.map((detail,index)=>{
							return(
								<div key={index} className="portfolio-card-detail-button indigo lighten-2 white-text">{detail}</div>
							)	
						})}
						<div className="clearFloat" />
						</div>
					</div>
					<div className="card-action">
						<a target="_blank" href={this.props.urlDemo} className="waves-effect waves-light btn small-margins btn-custom-portfolio indigo darken-4"><i className="material-icons left">play_arrow</i><strong>DEMO</strong></a>
						<a target="_blank" href={this.props.urlCode} className="waves-effect waves-light btn small-margins btn-custom-portfolio indigo darken-4"><i className="material-icons right">code</i><strong>CODE</strong></a>
					</div>
				</div>
			</div>
		)
	}
}

export default PortfolioCard;