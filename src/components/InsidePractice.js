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
			console.log(tmp);
		});
		// console.log(typeMap);
		setMapType(typeMap);
		setMapCurType(typeMap[type]);
		console.timeEnd('test');
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
						<th>STT</th>
						<th>Name</th>
						<th></th>
						<th></th>
					</tr>

					{mapCurType.map((map, idx) => (
						<tr>
							<td style={{ paddingLeft: '0.8rem' }} width="6%">
								{++idx}
							</td>
							<td width="82%">{map.Mapname}</td>
							<td>
								<Link
									style={{ color: '#2e3440' }}
									to={`/Practice/${map.id}/${map.idx}`}
								>
									<span className="DetailCss">Play</span>
								</Link>
							</td>
						</tr>
					))}
				</table>
			</div>
		</div>
	);
};

export default InsidePractice;
