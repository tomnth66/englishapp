import React, { useState, useEffect } from 'react';
import '../css/Practicepage.css';
import Navbar from '../components/Navbar.js';
import InsidePractice from '../components/InsidePractice';
import Profile from '../components/Profile.js';

const Practice = () => {
	return (
		<div className="Practicepage">
			<div className="PracticepageHeader">
				<Navbar></Navbar>
			</div>

			<div className="PracticepageBodyHeader">
				<h1>There should be a title here</h1>
			</div>

			<div className="PracticepageBody">
				{/* <MapSelection></MapSelection> */}
				<InsidePractice />
				<div></div>
				<Profile></Profile>
			</div>
		</div>
	);
};

export default Practice;
