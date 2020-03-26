/* eslint-disable no-loop-func */
import React, { useState, useEffect } from 'react';
import '../css/CreateMap.css';
import firebase from '../firebase.js';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import Ids from 'ids';
import {
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle
} from '@material-ui/core';
import {
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	Input
} from '@material-ui/core';
import Navbar from '../components/Navbar';
import Flippy, { FrontSide, BackSide } from 'react-flippy';
import 'flexboxgrid';

const useStyles = makeStyles(theme => ({
	container: {
		display: 'flex',
		flexWrap: 'wrap'
	},
	formControl: {
		margin: theme.spacing(1),
		minWidth: 240
	}
}));

let titleName = '';
let exerciseType = '';
let exerciseTypeList = [];
let exerciseTime = '';
let exerciseDifficulty = '';
let ids = new Ids();

const setExercise = (name, type, typeList, duration, difficulty) => {
	titleName = name.trim();
	exerciseType = type;
	exerciseTypeList = typeList;
	exerciseTime = duration;
	exerciseDifficulty = difficulty;
};

const PopOutForm = () => {
	const classes = useStyles();
	const [open, setOpen] = useState(true);
	const [type, setType] = useState(-1);
	const [typeList, setTypeList] = useState([]);
	const [name, setName] = useState('');
	const [duration, setDuration] = useState();
	const [difficulty, setDifficulty] = useState();

	useEffect(() => {
		const db = firebase.firestore();
		db.collection('Type')
			.doc('f0nojqJzfHFkagp9UfLe')
			.get()
			.then(data => {
				setTypeList(data.data().TypeList);
				// console.log(data.data().TypeList);
			});
	});

	const handleChangeType = event => {
		setType(event.target.value);
		console.log(event.target.value);
	};

	const handleChangeName = event => {
		setName(event.target.value || '');
	};

	const handleChangeDuration = event => {
		setDuration(event.target.value);
	};

	const handleChangeDifficulty = event => {
		setDifficulty(event.target.value);
	};

	// const handleClickOpen = () => {
	//   setOpen(true);
	// };

	const handleClose = () => {
		setOpen(false);
		setExercise(name, type, typeList, duration, difficulty);
		console.log(type);
	};

	return (
		<Dialog
			disableBackdropClick
			disableEscapeKeyDown
			open={open}
			onClose={handleClose}
		>
			<DialogTitle>Quick create</DialogTitle>
			<DialogContent>
				<div style={{ display: 'flex', flexDirection: 'column' }}>
					<div className={classes.container}>
						<FormControl className={classes.formControl} required>
							<InputLabel id="demo-dialog-select-label">Map Type</InputLabel>
							<Select
								labelId="demo-dialog-select-label"
								id="demo-dialog-select"
								value={typeList[type]}
								onChange={handleChangeType}
								input={<Input />}
							>
								<MenuItem value="">
									<em>None</em>
								</MenuItem>
								{typeList.map((item, index) => {
									return <MenuItem value={index}>{item}</MenuItem>;
								})}
								{/* <MenuItem value="0">Vocabulary</MenuItem>
              <MenuItem value="1">Grammar</MenuItem>
              <MenuItem value="2">Logic</MenuItem> */}
							</Select>
						</FormControl>
						<FormControl className={classes.formControl} required>
							<InputLabel htmlFor="my-input">Map Name</InputLabel>
							<Input
								id="my-input"
								aria-describedby="my-helper-text"
								value={name}
								onChange={handleChangeName}
							/>
							{/* <FormHelperText id="my-helper-text">
                  We'll never share your email.
                </FormHelperText> */}
						</FormControl>
					</div>
					<div className={classes.container}>
						<FormControl className={classes.formControl} required>
							<InputLabel htmlFor="my-input">Map Duration</InputLabel>
							<Input
								id="my-input"
								aria-describedby="my-helper-text"
								value={duration}
								onChange={handleChangeDuration}
							/>
							{/* <FormHelperText id="my-helper-text">
                  We'll never share your email.
                </FormHelperText> */}
						</FormControl>
						<FormControl className={classes.formControl} required>
							<InputLabel htmlFor="my-input">Map Difficulty</InputLabel>
							<Input
								id="my-input"
								aria-describedby="my-helper-text"
								value={difficulty}
								onChange={handleChangeDifficulty}
							/>
							{/* <FormHelperText id="my-helper-text">
                  We'll never share your email.
                </FormHelperText> */}
						</FormControl>
					</div>
				</div>
			</DialogContent>
			<DialogActions>
				<Button
					onClick={handleClose}
					color="primary"
					onClick={() => {
						window.location.href = '/';
					}}
				>
					Cancel
				</Button>
				<Button
					onClick={handleClose}
					color="primary"
					variant="contained"
					disabled={type === -1 || !name || !duration || !difficulty}
				>
					Ok
				</Button>
			</DialogActions>
		</Dialog>
	);
};

const PopOutAlert = ({ isOpen }) => {
	const classes = useStyles();
	const [open, setOpen] = useState(true);

	// const handleClickOpen = () => {
	//   setOpen(true);
	// };

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<Dialog
			disableBackdropClick
			disableEscapeKeyDown
			open={open}
			onClose={handleClose}
			style={{ minWidth: '400' }}
		>
			<DialogTitle>Success</DialogTitle>
			<DialogContent className={classes.container}>
				<DialogContentText id="alert-dialog-description">
					{`You have successed add exercise ${titleName} in group ${exerciseTypeList[exerciseType]}`}
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button
					onClick={handleClose}
					variant="contained"
					color="primary"
					onClick={() => {
						window.location.href = '/Practice';
					}}
				>
					Finish
				</Button>
			</DialogActions>
		</Dialog>
	);
};

// input area value
let para;
// coontain true and false value
// true = answer that teacher selected
let correctAnswer = [];

const CreateMap = () => {
	let [flip, setFlip] = useState(false);

	const flipCard = () => {
		setFlip(!flip);
	};

	// handle import txt file to the input
	const importFile = () => {
		let file = document.getElementById('FileReader').files[0];
		let textType = /text.*/;
		if (file.type.match(textType)) {
			var reader = new FileReader();

			reader.onload = function(e) {
				document.getElementById('inputArea').value = reader.result;
			};

			reader.readAsText(file);
		} else {
			document.getElementById('inputArea').value = 'File not supported!';
		}
	};

	// let correctAnswer = [];
	const returnAnswerSelector = () => {
		flipCard();
		let answerSelectorArea = document.getElementById('answerSelector');
		para = document.getElementById('inputArea').value;

		console.log(para);
		let words = para.split('\n');
		console.log(`đây là từng đoạn một ${words}`);

		let fullPara = '';

		// id is start from 0
		let currentID = 0;

		// clear the old answer correctAnswer;
		correctAnswer = [];

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

		answerSelectorArea.innerHTML = fullPara;

		let teacher_paras = document.querySelectorAll('.teacher-para');
		for (let p of teacher_paras) {
			p.addEventListener('click', e => {
				console.log(p);
				e.currentTarget.classList.toggle('selected-answer');
				// console.log(e.currentTarget.id);
				// correctAnswer[e.currentTarget.id] = !correctAnswer[e.currentTarget.id];
				// console.log(correctAnswer[e.currentTarget.id]);
				let start = 0;
				let end = correctAnswer.length - 1;
				let mid;
				switch (correctAnswer) {
					case []:
						correctAnswer.push(parseInt(e.currentTarget.id));
						break;
					default:
						while (start <= end) {
							mid = Math.floor((start + end) / 2);
							// console.log(start, mid, end);
							if (correctAnswer[mid] === parseInt(e.currentTarget.id)) {
								start = mid;
								console.log(mid);
								break;
							}
							switch (correctAnswer[mid] > parseInt(e.currentTarget.id)) {
								case true:
									end = mid - 1;
									break;
								default:
									start = mid + 1;
									break;
							}
						}
						correctAnswer[mid] === parseInt(e.currentTarget.id)
							? correctAnswer.splice(mid, 1)
							: correctAnswer.splice(start, 0, parseInt(e.currentTarget.id));
						break;
				}
				console.log(correctAnswer);
			});
		}
	};

	let [confirm, setConfirm] = useState(false);

	const submit = () => {
		setConfirm(true);
		console.log('Submitting... 🚀');

		const db = firebase.firestore();
		const ref = db.collection('Map').doc('wCj3hteHUHgCtiWl98yq');

		ref.get().then(data => {
			// console.log('dữ liệu', data.data().Maplist);
			let MapList = data.data().MapList;
			// console.log(para);

			MapList.push({
				Answer: correctAnswer,
				Clue: ['clue1', 'clue2', 'clue3'],
				Mapname: titleName,
				Maptype: exerciseTypeList[exerciseType],
				Maptime: exerciseTime,
				Mapdifficulty: exerciseDifficulty,
				paragraph: para,
				id: ids.next(),
				idx: MapList.length
			});

			console.log(MapList);

			ref.set({ MapList: MapList }).then(() => {
				// window.location.href = "/";
			});
			// .then(() => {});

			// window.location.href="/";
		});

		// window.location.href="/";
	};

	return (
		<div style={{ height: '100vh' }}>
			<PopOutForm />
			<Navbar />
			<div
				className="row middle-xs center-xs"
				style={{ height: 'calc(100% - 4rem)' }}
			>
				<div className="col-xs-10 flip-card">
					<Flippy
						flipOnHover={false} // default false
						flipOnClick={false} // default false
						flipDirection="horizontal" // horizontal or vertical
						isFlipped={flip}
					>
						<FrontSide>
							<textarea id="inputArea"></textarea>
							<div className="button-area">
								<input
									id="FileReader"
									multiple
									type="file"
									onChange={importFile}
								/>
								<label htmlFor="FileReader">
									<Button color="primary" component="span">
										Upload
									</Button>
								</label>
								{/* change to mode select answer */}
								<Button
									color="primary"
									variant="contained"
									onClick={returnAnswerSelector}
								>
									Next
								</Button>
							</div>
						</FrontSide>

						<BackSide>
							<div id="answerSelector"></div>
							<div className="button-area">
								<Button color="primary" onClick={flipCard}>
									Back
								</Button>
								{/* submit to database */}
								<Button color="primary" variant="contained" onClick={submit}>
									Submit
								</Button>
							</div>
						</BackSide>
					</Flippy>
				</div>
			</div>
			{confirm && <PopOutAlert />}
		</div>
	);
};

export default CreateMap;
