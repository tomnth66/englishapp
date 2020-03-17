import React, { Component } from 'react';
import '../css/InsideProfile.css';
import Avatar from './Avatar.js';
// import Button from './Button.js';
import { Button, Card, ButtonGroup } from '@material-ui/core';
import { Link } from 'react-router-dom';

class InsideProfile extends Component {
	constructor(props) {
		super(props);
	}

	handleLogOut() {
		console.log('logging out');
		localStorage.clear();
		window.location.href = '/';
	}

	render() {
		return (
			<Card className="InsideProfile">
				<Avatar id={localStorage.getItem('userId')}></Avatar>
				{/* <Button></Button> */}
				<div className="Information">
					<div className="UserInfo">
						<h1 style={{ margin: '0' }}>{localStorage.getItem('user')}</h1>
						<span style={{ fontWeight: '300', fontSize: '0.85rem' }}>
							{localStorage.getItem('class')}
						</span>
					</div>

					{localStorage.getItem('class') === 'admin' && (
						<ButtonGroup variant="text" color="primary" className="ActionButton">
							<Button>
								<a href="/createannouncement">Post Annoucement</a>
							</Button>
							<Button>
								<a href="/createmap">Create Map</a>
							</Button>
							<Button>
								<a href="/studentmanagement">Student Management</a>
							</Button>
						</ButtonGroup>
					)}
					<Button
						variant="contained"
						color="primary"
						onClick={this.handleLogOut.bind(this)}
						style={{ marginTop: '1rem', width: '95%' }}
					>
						Log Out
					</Button>
				</div>
			</Card>
		);
	}
}

export default InsideProfile;
