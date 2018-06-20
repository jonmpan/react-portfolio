import React, {Component} from "react";
import './TestItems.css';

export default class TestItems extends Component {
	render(){
		return(
			<div className="container test-container">
				<div className="test-flex">
					<img className="test-img" src="./assets/img/test-phone.png" />
				</div>
			</div>
		)
	}
}