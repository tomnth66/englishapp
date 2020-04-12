import React, { Component } from "react";
import '../css/Practicepage.css';
import Navbar from '../components/Navbar.js';
import Footer from '../components/Footer.js';
import InsidePractice from '../components/InsidePractice';
import Profile from '../components/Profile.js';
import firebase from '../firebase';

// const Practice = () => {
// 	return (
// 		<div className="Practicepage">
// 			<div className="PracticepageHeader">
// 				<Navbar></Navbar>
// 			</div>

// 			<div className="PracticepageBodyHeader">
// 				<h1>There should be a title here</h1>
// 			</div>

// 			<div className="PracticepageBody">
// 				{/* <MapSelection></MapSelection> */}
// 				<InsidePractice />
// 				<div></div>
// 				<Profile></Profile>
// 			</div>

// 			<div className ="HomepageFooter">
//           <Footer></Footer>
//       </div>
// 		</div>
// 	);
// };

// export default Practice;



export default class Practice extends Component {
  constructor(props) {
		super(props);
		this.state = {
			Player:{}
		}
	}
	

	componentDidMount(){
		this.GetDB();
	}

	GetDB() {
    const db = firebase.firestore();
    const ref = db.collection("Users").doc("45GCoMKDwQWciXc8193A");
    // const { id } = useParams();

    ref.get().then((data) => {
      let Users = data.data().Users;
      let CurUser = Users.filter(
        (user) => user.Id === localStorage.getItem("userId")
      );

      // console.log('after sorting ', CurUser);
      if (CurUser.length === 0) {
        window.location.href = "/";
      } else {
					this.setState({
						Player:CurUser[0]
					})
      }
    });
  }

  render() {
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
					<InsidePractice Player = {this.state.Player} />
					<div></div>
					<Profile></Profile>
				</div>

				<div className ="HomepageFooter">
						<Footer></Footer>
				</div>
			</div>
    );
  }
}
