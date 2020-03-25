import { Button } from '@material-ui/core';
import Navbar from '../components/Navbar';
import Loading from '../components/Loading';
import React, { useEffect, useState } from 'react';
import firebase from '../firebase.js';
import 'flexboxgrid';
import '../css/MapPlay.css';

// import css
// import "../css/MapPlay.css"

const MapPlay = ({ match }) => {
	// get map
	let [map, setMap] = useState({});
	// loading screen while getting map
	let [isLoading, setIsLoading] = useState(true);
	let [values, setValues] = useState({
		score: 0,
		time: 60
	});

	// console.log(match);
	console.time('getMap');
	async function getMap() {
		const db = firebase.firestore();
		let curMap = {};
		// get Map
		await db
			.collection('Map')
			.doc('wCj3hteHUHgCtiWl98yq')
			.get()
			.then(data => {
				console.log(data.data().MapList[match.params.idx]);
				setMap(data.data().MapList[match.params.idx]);
				curMap = data.data().MapList[match.params.idx];
			});
		console.timeEnd('getMap');
		setIsLoading(false);

		let studentAnswerSelector = document.getElementById('studentAnswer');
		let para = curMap.paragraph;

		console.log(para);
		let words = para.split('\n');
		console.log(`đây là từng đoạn một ${words}`);

		let fullPara = '';

		// id is start from 0
		let currentID = 0;

		// clear the old answer correctAnswer;
		// correctAnswer = [];

		for (let word of words) {
			fullPara += `<div>\n`;
			word = word.split(' ');
			for (let i = 0; i < word.length; ++i) {
				if (word[i] !== '') {
					fullPara += `\t<span id="${currentID}" class="teacher-para">${word[i]}</span>\n`;
					++currentID;
					// correctAnswer.push(false);
				} else {
					//  don't count " " or "\n"
					fullPara += '\t<div style="height: 1rem"></div>';
				}
			}
			console.log(`Đây là từng từ một ${word}`);
			fullPara += `</div>\n`;
		}

		console.log(fullPara);

		studentAnswerSelector.innerHTML = fullPara;
	}

	const submit = () => {};

	useEffect(() => {
		console.log(match);
		getMap();
	}, []);

	return (
		<div className="map--play" style={{ height: '100vh' }}>
			{isLoading && <Loading />}
			<Navbar />
			<div
				className="row middle-xs center-xs"
				style={{ height: 'calc(100% - 6rem)' }}
			>
				<div className="col-xs-10 student-card">
					<div className="answerSelector" id="studentAnswer"></div>
					<div className="button-area">
						<Button color="primary" variant="contained" onClick={submit}>
							Next
						</Button>
					</div>
				</div>
			</div>
			<div className="map--bar">
				<div
					className="point--container"
					style={{ width: '50%', height: '100%' }}
				>
					<span
						style={{ position: 'absolute', left: '0.5rem' }}
					>{`POINT: ${values.score}`}</span>
					<div className="point--status"></div>
				</div>
				<div className="time--container" style={{ width: '50%' }}>
					<div className="time--status"></div>
				</div>
			</div>
		</div>
	);
};

export default MapPlay;
