import React, { useState } from 'react';
import firebase from '../firebase';
import Ids from 'short-id';
import { makeStyles } from '@material-ui/core/styles';
import theme from '../theme/muiTheme';
import { Button } from '@material-ui/core';
import {
	Dialog,
	DialogContent,
	DialogContentText,
	DialogTitle
} from '@material-ui/core';
import {
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	FormHelperText,
	OutlinedInput,
	InputAdornment,
	Input,
	IconButton
} from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import emailjs from 'emailjs-com';
// import Mailer from '../smtpjs';
// import email from 'emailjs';

const useStyles = makeStyles(theme => ({
	container: {
		display: 'flex',
		flexWrap: 'wrap',
		flexDirection: 'column',
		alignItems: 'center',
		background: '#f3f5f8'
	},
	formControl: {
		margin: theme.spacing(1),
		minWidth: 500
	}
}));

// import "../css/RegisterDialog.css"

const RegisterDialog = ({ isOpen, closeRegister }) => {
	const classes = useStyles();
	const [values, setValues] = useState({
		open: isOpen,
		userName: '',
		password: '',
		reTypePass: '',
		showPassword: false,
		showReTypePass: false,
		email: '',
		studentName: '',
		courseList: [],
		course: '',
		stage: 'setUserName',
		wrongReTypePass: false,
		existedAccount: false
	});

	const handleChange = prop => e => {
		setValues({ ...values, [prop]: e.target.value });
	};

	const handleClose = e => {
		// document.body.scrollIntoView(false);
		// console.log('closing')
		window.scrollTo(0, 1000);
		closeRegister();
		setValues({ ...values, open: isOpen });
		// window.scrollTo(0,document.body.scrollHeight);
	};

	const handleClickShowPassword = prop => () => {
		setValues({ ...values, [prop]: !values[prop] });
	};

	const handleMouseDownPassword = e => {
		e.preventDefault();
	};

	const next = async _ => {
		let existedAccount = false;
		let Course = [];

		const db = firebase.firestore();
		console.time('concatenation');
		await db
			.collection('Users')
			.doc('45GCoMKDwQWciXc8193A')
			.get()
			.then(async data => {
				console.time('getUser: ');
				let Users = await data.data().Users;
				console.timeEnd('getUser: ');
				console.time('Check existed user name: ');
				await Users.map(student => {
					if (student.Account === values.userName) existedAccount = true;
					return student;
				});
				console.timeEnd('Check existed user name: ');
			});
		console.timeEnd('concatenation');

		console.time('Get course list: ');
		await db
			.collection('Course')
			.doc('0zc3RakYtmCwitHgM64g')
			.get()
			.then(async data => {
				Course = await data.data().CourseList;
			});
		console.timeEnd('Get course list: ');

		console.log(Course);

		existedAccount
			? values.password !== values.reTypePass
				? setValues({ ...values, wrongReTypePass: true, existedAccount: true })
				: setValues({ ...values, existedAccount: true, wrongReTypePass: false })
			: values.password !== values.reTypePass
			? setValues({ ...values, existedAccount: false, wrongReTypePass: true })
			: setValues({
					...values,
					stage: 'setCourse',
					existedAccount: false,
					wrongReTypePass: false,
					courseList: Course
			  });

		console.log(values);
	};

	const register = () => {
		const db = firebase.firestore();
		const ref = db.collection('Users').doc('45GCoMKDwQWciXc8193A');
		ref.get().then(data => {
			// console.log('data after update in mount',data.data().ContractList);
			let Users = data.data().Users;

			Users.unshift({
				Account: values.userName,
				Class: values.course.toString() === 'Guest' ? 'guest' : 'student',
				Id: Ids.generate(),
				Name: values.studentName,
				Password: values.password,
				Course: values.course,
				Email: values.email,
				TotalScore: 0,
				Activated: false,
				PlayTimes: 1,
				GameHistory: []
			});

			// localStorage.setItem('user',this.state.studentName);
			// localStorage.setItem('class','student');
			// localStorage.setItem('userId',this.state.Id);

			ref.set({ Users: Users }).then(() => {
				// finishRegister();
			});
			// handleClose();
			setValues({ ...values, stage: 'finished' });
		});
	};

	const sendConfirmation = () => {
		handleClose();
		let template_params = {
			to_name: 'San',
			from_name: 'S Y N T A X I',
			message_html: `<h1>SIGN UP MESSAGE</h1><p><b>${values.studentName}</b> registered</p>`
		};
		let service_id = 'default_service';
		let template_id = 'template_8xv1PQtf';
		let user_id = 'user_tTkqMN8lV4BZw66MgH1eF';
		emailjs.send(service_id, template_id, template_params, user_id).then(
			response => {
				console.log('SUCCESS!', response.status, response.text);
			},
			err => {
				console.log('FAILED...', err);
			}
		);
	};

	return (
		<Dialog
			open={values.open}
			onClose={handleClose}
			theme={theme}
			disableBackdropClick
			disableEscapeKeyDown
		>
			<DialogTitle
				id="form-dialog-title"
				style={{ background: '#f3f5f8' }}
				disableBackdropClick
				disableEscapeKeyDown
			>
				Register
			</DialogTitle>
			{values.stage === 'setUserName' ? (
				<div>
					<DialogContent style={{ background: '#f3f5f8', paddingTop: '0px' }}>
						<form className={classes.container}>
							<FormControl
								className={classes.formControl}
								variant="outlined"
								required
							>
								<InputLabel
									htmlFor="outlined-adornment-userName"
									style={{ background: '#f3f5f8' }}
									error={values.existedAccount}
								>
									User Name
								</InputLabel>
								<OutlinedInput
									id="outlined-adornment-userName"
									value={values.userName}
									onChange={handleChange('userName')}
									error={values.existedAccount}
								></OutlinedInput>
								{values.existedAccount && (
									<FormHelperText error>
										This User Name is already existed.
									</FormHelperText>
								)}
							</FormControl>
							<FormControl
								className={classes.formControl}
								variant="outlined"
								required
							>
								<InputLabel
									style={{ background: '#f3f5f8' }}
									error={values.wrongReTypePass}
									htmlFor="outlined-adornment-password"
								>
									Password
								</InputLabel>
								<OutlinedInput
									error={values.wrongReTypePass}
									id="outlined-adornment-password"
									type={values.showPassword ? 'text' : 'password'}
									value={values.password}
									onChange={handleChange('password')}
									endAdornment={
										<InputAdornment position="end" tabIndex="-1">
											<IconButton
												aria-label="toggle password visibility"
												onClick={handleClickShowPassword('showPassword')}
												onMouseDown={handleMouseDownPassword}
												edge="end"
												tabIndex="-1"
											>
												{values.showPassword ? (
													<Visibility />
												) : (
													<VisibilityOff />
												)}
											</IconButton>
										</InputAdornment>
									}
									labelWidth={70}
								/>
							</FormControl>
							<FormControl
								className={classes.formControl}
								variant="outlined"
								style={{ marginBottom: '0' }}
								required
							>
								<InputLabel
									error={values.wrongReTypePass}
									htmlFor="outlined-adornment-reTypePass"
									style={{ background: '#f3f5f8' }}
								>
									Re-type Password
								</InputLabel>
								<OutlinedInput
									error={values.wrongReTypePass}
									id="outlined-adornment-reTypePass"
									type={values.showReTypePass ? 'text' : 'password'}
									value={values.reTypePass}
									onChange={handleChange('reTypePass')}
									endAdornment={
										<InputAdornment position="end" tabIndex="-1">
											<IconButton
												aria-label="toggle password visibility"
												onClick={handleClickShowPassword('showReTypePass')}
												onMouseDown={handleMouseDownPassword}
												edge="end"
												tabIndex="-1"
											>
												{values.showReTypePass ? (
													<Visibility />
												) : (
													<VisibilityOff />
												)}
											</IconButton>
										</InputAdornment>
									}
									labelWidth={70}
								/>
								{values.wrongReTypePass && (
									<FormHelperText error>
										Your password and your re-type password is not the same
									</FormHelperText>
								)}
							</FormControl>
						</form>
					</DialogContent>
					<div
						style={{
							display: 'flex',
							width: '100%',
							height: '4em',
							alignItems: 'center',
							justifyContent: 'center',
							background: '#f3f5f8'
						}}
					>
						<div
							style={{
								display: 'flex',
								width: '500px',
								justifyContent: 'flex-end'
							}}
						>
							<Button onClick={handleClose} color="primary">
								Cancel
							</Button>
							<Button
								onClick={next}
								color="primary"
								variant="contained"
								disabled={
									!values.userName || !values.password || !values.reTypePass
								}
							>
								Next
							</Button>
						</div>
					</div>
				</div>
			) : values.stage === 'setCourse' ? (
				<div>
					<DialogContent style={{ background: '#f3f5f8' }}>
						<form className={classes.container}>
							<FormControl
								className={classes.formControl}
								variant="outlined"
								required
							>
								<InputLabel
									htmlFor="outlined-adornment-studentName"
									style={{ background: '#f3f5f8' }}
								>
									Student's Name
								</InputLabel>
								<OutlinedInput
									id="outlined-adornment-studentName"
									value={values.studentName}
									onChange={handleChange('studentName')}
								></OutlinedInput>
							</FormControl>
							<FormControl
								className={classes.formControl}
								variant="outlined"
								required
							>
								<InputLabel
									id="outlined-adornment-course"
									style={{ background: '#f3f5f8' }}
								>
									Course
								</InputLabel>
								{/*<OutlinedInput
									id="outlined-adornment-userName"
									value={values.course}
									onChange={handleChange('course')}
                ></OutlinedInput>*/}
								<Select
									id="outlined-adornment-course"
									labelId="outlined-adornment-course"
									value={values.course}
									onChange={handleChange('course')}
									input={<OutlinedInput />}
								>
									<MenuItem value="">
										<em>None</em>
									</MenuItem>
									{values.courseList.map(course => {
										return (
											<MenuItem value={course.Name}>{course.Name}</MenuItem>
										);
									})}
								</Select>
							</FormControl>
							<FormControl
								className={classes.formControl}
								variant="outlined"
								style={{ marginBottom: '0' }}
								required
							>
								<InputLabel
									htmlFor="outlined-adornment-email"
									style={{ background: '#f3f5f8' }}
								>
									Email
								</InputLabel>
								<OutlinedInput
									id="outlined-adornment-email"
									value={values.email}
									onChange={handleChange('email')}
								></OutlinedInput>
							</FormControl>
						</form>
					</DialogContent>
					<div
						style={{
							display: 'flex',
							width: '100%',
							height: '4em',
							alignItems: 'center',
							justifyContent: 'center',
							background: '#f3f5f8'
						}}
					>
						<div
							style={{
								display: 'flex',
								width: '500px',
								justifyContent: 'flex-end'
							}}
						>
							<Button
								onClick={() => {
									setValues({ ...values, stage: 'setUserName' });
								}}
								color="primary"
							>
								Back
							</Button>
							<Button
								onClick={register}
								color="primary"
								variant="contained"
								disabled={
									!values.studentName || !values.course || !values.email
								}
							>
								Submit
							</Button>
						</div>
					</div>
				</div>
			) : (
				<div>
					<DialogContent
						style={{
							background: '#f3f5f8',
							width: '360px',
							boxSizing: 'border-box',
							paddingTop: '0'
						}}
					>
						<DialogContentText id="alert-dialog-description">
							{`Thank you for joining SYNTAXI`}
						</DialogContentText>
						<DialogContentText id="alert-dialog-description">
							{`Please send us a massage with content "YOUR NAME - I want to activate my account"
							  through CONTACT US and wait until your account is activated. `}
						</DialogContentText>
					</DialogContent>
					<div
						style={{
							display: 'flex',
							width: '100%',
							height: '3em',
							alignItems: 'center',
							justifyContent: 'center',
							background: '#f3f5f8'
						}}
					>
						<div
							style={{
								display: 'flex',
								width: '360px',
								justifyContent: 'flex-end'
							}}
						>
							<Button
								style={{
									marginRight: '10px'
								}}
								onClick={sendConfirmation}
								color="primary"
							>
								Finish
							</Button>
						</div>
					</div>
				</div>
			)}
		</Dialog>
	);
};

export default RegisterDialog;
