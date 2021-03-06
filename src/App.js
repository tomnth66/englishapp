import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Homepage from './pages/Homepage.js';
import Practicepage from './pages/Practicepage.js';
import CreateMap from './pages/CreateMap.js';
// import Test from "./pages/Test";
import Studentmanagement from './pages/Studentmanagement.js';
import CourseManagement from './pages/CourseManagement.js';
import Ranking from './pages/Ranking.js';
import MapPlay from './pages/MapPlay';
import ProfileDetail from './pages/ProfileDetail.js';
import Announcement from './pages/Announcement.js';
import AboutApp from './pages/AboutApp.js';
import Package from './pages/Package.js';
import theme from './theme/muiTheme';
import { ThemeProvider } from '@material-ui/core/styles';

class App extends Component {
	constructor() {
		super();
	}

	// componentWillMount(){
	//   if(window.location.pathname != '/'){
	//     if(!localStorage.getItem('user')) window.location.href="/";
	//   }
	// }

	render() {
		if (!localStorage.getItem('user')) {
			// console.log('case 1');
			if (
				window.location.pathname !== '/' &&
				window.location.pathname !== '/AboutApp'
			){
				window.location.href = '/';
				return null;
			}
		}
		else{
			if (localStorage.getItem('class')!=='admin') {
				// console.log('case 2');
				if (
					window.location.pathname === '/postannouncement' ||
					window.location.pathname === '/createmap' ||
					window.location.pathname === '/studentmanagement'||
					window.location.pathname === '/CourseManagement'
				){
					window.location.href = '/';
					return null;
				}
			}
		}

		return (
		<ThemeProvider theme={theme}>
			<Router>
				<div className="App">
					<Switch>
						<Route path="/" exact component={Homepage} />
						<Route path="/practice" exact component={Practicepage} />
						<Route path="/AboutApp" exact component={AboutApp} />
						<Route path="/package" exact component={Package} />
						<Route path="/createmap" exact component={CreateMap} />
						<Route path="/studentmanagement"
									 exact
									 component={Studentmanagement}
						/>
						<Route path="/CourseManagement"
									 exact
									 component={CourseManagement}
						/>
						<Route path="/ranking" exact component={Ranking} />
						<Route path="/postannouncement" exact component={Announcement} />
						<Route path="/practice/:id/:idx" exact component={MapPlay} />
						<Route path="/Profile/:id" exact render={(props) => ( <ProfileDetail key={props.match.params.id} 
																																								 {...props} /> )}/>
					</Switch>
				</div>
			</Router>
              </ThemeProvider>
		);
	}
}

export default App;
