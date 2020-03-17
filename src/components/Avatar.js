import React, { Component } from 'react';
import '../css/Avatar.css';
import Ava from '../img/stitch.jpg';
import { Link } from 'react-router-dom';

const Avatar = ({ id }) => {
	return (
		<div className="Avatar">
			<Link to={`/Profile/${id}`}>
				<img className="Picture" src={Ava}></img>
				<div className="ProfileLayer">
					Profile
				</div>
    	</Link>
		</div>
	);
};

export default Avatar;
