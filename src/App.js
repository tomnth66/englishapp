import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Homepage from './pages/Homepage.js';
import Practicepage from './pages/Practicepage.js';
import CreateMap from './pages/CreateMap';
// import Test from "./pages/Test";
import Studentmanagement from './pages/Studentmanagement.js';
import Ranking from './pages/Ranking.js';
import MapPlay from './pages/MapPlay';
import ProfileDetail from './pages/ProfileDetail.js';
import Announcement from './pages/Announcement.js'
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
		if (
			window.location.pathname !== '/' &&
			window.location.pathname !== '/AboutApp'
		) {
			if (!localStorage.getItem('user')) {
				window.location.href = '/';
				return null;
			}
		}

		return (
		<ThemeProvider theme={theme}>
			<Router>
				<div className="App">
					<Switch>
						<Route path="/" exact component={Homepage} />
						<Route path="/practice" exact component={Practicepage} />
						<Route path="/createmap" exact component={CreateMap} />
						<Route
							path="/studentmanagement"
							exact
							component={Studentmanagement}
						/>
						<Route path="/ranking" exact component={Ranking} />
						<Route path="/createannouncement" exact component={Announcement} />
						<Route path="/practice/:id/:idx" exact component={MapPlay} />
						<Route path="/Profile/:id" exact render={(props) => ( <ProfileDetail {...props} /> )}/>
					</Switch>
				</div>
			</Router>
              </ThemeProvider>
		);
	}
}

export default App;
