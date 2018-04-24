import React, {Component} from "react";
import "./AboutMe.css";

class AboutMe extends Component{
	render(){
		return(
			<section className="section indigo lighten-5 center">
				<div className="container">
					<div className="card-panel white z-depth-1 about-me-top-margin">
						<div className="row no-margin">
							<div className="col s12 m6 l4">
								<img src="/assets/img/jonathanpan.jpg" alt="" className="circle responsive-img" />
							</div>
							<div className="col s12 m6 l8 left-align">
							<h4 className="no-margin">About <strong className="indigo-text">Me</strong></h4>
								<p className="black-text">
									Hi! I&apos;m Jonathan Pan. I am a full stack developer currently living in San Jose, CA.
								</p>
								<p>
									I enjoy both the front end and the back end in order to provide the full stack experience. Combining everything into a cohesive project is important to me.
								</p>
								<p>
									I am excited to finally pursue my passion for computers, web-development, and coding.
								</p>
								<p className="hide-on-med-only hide-on-small-only">
									Outside of coding, I am a pretty plain and normal individual. I like my cats, playing video games, sleeping, and just living a simple life.
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>
		)
	}
}

export default AboutMe;