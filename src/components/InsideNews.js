import React, { Component } from 'react';
import '../css/InsideNews.css';
import Newsmain from './Newsmain.js';
import Newsfooter from './Newsfooter.js';

export default class InsideNews extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { Announcement , Avatar} = this.props;
		return (
			<div className="InsideNews">
				<Newsmain
					Announcement={Announcement}
					Avatar = {Avatar}
					GetDB={this.props.GetDB}
				></Newsmain>

				<Newsfooter Announcement={Announcement}></Newsfooter>
			</div>
		);
	}
}
