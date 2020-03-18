import React, { Component } from 'react';
import '../css/InsideProfileDetail.css';
import firebase from '../firebase.js';
import Loading from './Loading.js';
import Ava from '../img/stitch.jpg';
// import {useParams} from 'react-router-dom';
import ProfileDeleteConfirm from './ProfileDeleteConfirm';

export default class InsideProfileDetail extends Component {
	constructor(props) {
		super(props);
		this.state = {
			User: {},
			isLoading: false,
			ConfirmSelected: false
		};
	}

	showLoading() {
		this.setState({
			isLoading: true
		});
	}

	DeleteConfirmActivate() {
		this.setState({
			ConfirmSelected: true
		});
	}

	CloseConfirmSelected() {
		this.setState({
			ConfirmSelected: false
		});
	}

	componentDidMount() {
		this.showLoading();
		this.GetDB1();
		// this.GetDB();
	}

	GetDB1() {
		const db = firebase.firestore();
		const ref = db.collection('Users').doc('45GCoMKDwQWciXc8193A');
		// const { id } = useParams();

		ref.get().then(data => {
			let Users = data.data().Users;

			let CurUser = Users.filter(
				user => user.Id === this.props.match.params.id
			);

			// console.log('after sorting ', CurUser);
			if(CurUser.length === 0){
				window.location.href = '/studentmanagement'
			}
			else{
				this.setState({
					User: CurUser[0],
					isLoading: false
				});
			}
		});
	}

	render() {
		const { User, isLoading, ConfirmSelected } = this.state;
		return (
			<div className="InsideProfileDetail">
				{isLoading && <Loading />}
				<div className="InsideProfileHeader">
					<h1>Profile</h1>
				</div>

				<div className="InsideProfileDetailMain">
					<div className="Left">
						<div className="StudentAvatar">
							<img className="Picture" src={Ava}></img>
						</div>
					</div>
					<div className="Right">
						<ul>
							<li>Name: {User.Name}</li>
							<li>Email: {User.Email}</li>
							<li>Course: {User.Course}</li>
							<li>Total Score: {User.TotalScore}</li>
							{(localStorage.getItem('class') === 'admin' ||
								localStorage.getItem('userId') === User.Id) && (
								<li>
									<span
										className="DeleteCss"
										onClick={this.DeleteConfirmActivate.bind(this)}
									>
										Delete
									</span>
								</li>
							)}
						</ul>
						{ConfirmSelected && (
							<ProfileDeleteConfirm
								CloseConfirmSelected={this.CloseConfirmSelected.bind(this)}
								Id={User.Id}
								showLoading={this.showLoading.bind(this)}
							></ProfileDeleteConfirm>
						)}
					</div>
					{/* <div className = 'ProfileFooter'></div> */}
				</div>

				{localStorage.getItem('userId') === User.Id && (
					<div className="ProfileFooter">
						<span>Edit Profile</span>
					</div>
				)}

				{localStorage.getItem('userId') !== User.Id && (
					<div className="ProfileFooter Inactive"></div>
				)}
			</div>
		);
	}
}
