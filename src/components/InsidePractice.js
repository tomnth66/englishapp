import React, { useState, useEffect } from 'react';
import firebase from '../firebase.js';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Loading from './Loading.js';
import { Link } from 'react-router-dom';
import '../css/InsidePractice.css';

const InsidePractice = () => {
	// get typeList
	let [type, setType] = useState(0);
	let [typeList, setTypeList] = useState([]);
	// get maplist of each type then sort
	let [mapList, setMapList] = useState([]);
	let [mapType, setMapType] = useState([]);
	let [mapCurType, setMapCurType] = useState([]);
	// set up loading screen while sorting the maplist
	let [isLoading, setIsLoading] = useState(true);

	async function getDB() {
		let typeArr = [];
		let map = [];

		const db = firebase.firestore();
		// get Type
		console.time('test');
		await db
			.collection('Type')
			.doc('f0nojqJzfHFkagp9UfLe')
			.get()
			.then(data => {
				setTypeList(data.data().TypeList);
				typeArr = data.data().TypeList;
			});
		// get Map
		await db
			.collection('Map')
			.doc('wCj3hteHUHgCtiWl98yq')
			.get()
			.then(data => {
				setMapList(data.data().MapList);
				map = data.data().MapList;
			});
		setIsLoading(false);
		let typeMap = [];
		typeArr.map(item => {
			typeMap.push([]);
			return item;
		});
		map.map(item => {
			// console.log(item);
			let id = typeArr.indexOf(item.Maptype);
			// console.log(id);
			typeMap[id].push(item);
			return item;
		});

		typeMap.map(mapEachType => {
			let tmp = [];
			tmp = mapEachType.sort((a, b) => {
				let aName = a.Mapname.toLowerCase();
				let bName = b.Mapname.toLowerCase();
				switch (aName.charCodeAt(0)) {
					case bName.charCodeAt(0):
						return b.idx - a.idx;
					default:
						return aName.charCodeAt(0) - bName.charCodeAt(0);
				}
			});
			// console.log(tmp);
		});
		// console.log(typeMap);
		setMapType(typeMap);
		setMapCurType(typeMap[type]);
		// console.timeEnd('test');
	}

	useEffect(() => {
		getDB();

		// console.log(mapList, typeList);
	}, []);

	const handleChangeType = e => {
		setType(e.target.value);
		setMapCurType(mapType[e.target.value]);
		console.log(mapList, typeList, mapType);
	};

	const moveToPlay = (id, idx) => {
		if (localStorage.getItem('class') === 'guest') {
			const db = firebase.firestore();
			const ref = db.collection('Users').doc('45GCoMKDwQWciXc8193A');
			ref.get().then(data => {
				// console.log('data after update in mount',data.data().ContractList);
				let Users = data.data().Users;
				let curId = localStorage.getItem('userId');

				// console.log('debug', Users , curId);

				let userIdx = Users.findIndex(user => user.Id === curId);

				// console.log(Users[userIdx]);

				let turn = Users[userIdx].PlayTimes;
				let history = Users[userIdx].GameHistory;

				let fil = history.filter(map => map.Id === id);

				if (fil.length > 0) {
					window.location.href = `/Practice/${id}/${idx}`;
				} else {
					if (turn === 0) alert('You are out of turn, buy more');
					else {
						Users[userIdx].PlayTimes--;
						Users[userIdx].GameHistory.unshift({
							HighestScore: 0,
							Id: id
						});

						ref.set({ Users: Users }).then(() => {
							window.location.href = `/Practice/${id}/${idx}`;
						});
					}
				}
			});
		} else {
			const db = firebase.firestore();
			const ref = db.collection('Users').doc('45GCoMKDwQWciXc8193A');

			ref.get().then(data => {
				// console.log('data after update in mount',data.data().ContractList);
				let Users = data.data().Users;
				let curId = localStorage.getItem('userId');

				// console.log('debug', Users , curId);

				let userIdx = Users.findIndex(user => user.Id === curId);

				// console.log(Users[userIdx]);
				let history = Users[userIdx].GameHistory;

				let fil = history.filter(map => map.Id === id);

				if (fil.length > 0) {
					window.location.href = `/Practice/${id}/${idx}`;
				} else {
					Users[userIdx].GameHistory.unshift({
						HighestScore: 0,
						Id: id
					});

					ref.set({ Users: Users }).then(() => {
						window.location.href = `/Practice/${id}/${idx}`;
					});
				}
			});
		}
	};

	return (
		<div className="InsidePractice">
			{isLoading && <Loading />}
			<div className="TypeSelector">
				<h1>Practice</h1>
				<FormControl
					variant="outlined"
					style={{ width: '30%', margin: '10 0' }}
				>
					<InputLabel htmlFor="PracticeTypeSelectId">Type</InputLabel>
					<Select
						id="PracticeTypeSelectId"
						onChange={handleChangeType}
						labelWidth={40}
						value={type}
						focused
					>
						{/* <MenuItem value={-1} /> */}
						{typeList.map((item, idx) => (
							<MenuItem value={idx}>{item}</MenuItem>
						))}
					</Select>
				</FormControl>
			</div>
			<div className="InsidePracticeMain">
				<table>
					<tr className="studentlist--head">
						<th style={{ width: '6%' }}>STT</th>
						<th>Name</th>
						<th>Duration</th>
						<th>Difficulty</th>
						<th style={{ width: '12%' }} />
					</tr>

					{mapCurType.map((map, idx) => (
						<tr>
							<td style={{ width: '6%' }}>{++idx}</td>
							<td>{map.Mapname}</td>
							<td>{map.Maptime + 's'}</td>
							<td>{map.Mapdifficulty}</td>

							<td style={{ width: '12%' }}>
								{/* <Link
									style={{ color: '#2e3440' }}
									to={`/Practice/${map.id}/${map.idx}`}
								>
									<span className="DetailCss">Play</span>
								</Link> */}
								<span
									className="DetailCss"
									onClick={moveToPlay.bind(this, map.id, map.idx)}
								>
									Play
								</span>
							</td>
						</tr>
					))}
				</table>
			</div>
		</div>
	);
};

export default InsidePractice;
