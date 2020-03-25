import React, { Component } from "react";
import "../css/News.css";
import InsideNews from "./InsideNews.js";
import firebase from "../firebase";

export default class News extends Component {
  constructor(props) {
    super(props);
    this.state = {
      AnnouncementList: [],
      Avatar:{}
    };
  }

  componentDidMount() {
    this.GetDB();
  }

  GetDB(){
    const db = firebase.firestore();
      const ref = db.collection("Announcement").doc("A4TT0kGAgjKUxs2wrj8p");
      ref.get().then(data => {
        this.setState({
          AnnouncementList: data.data().AnnouncementList
        },()=>this.GetDB1());
      });
  }


  GetDB1() {
		const db = firebase.firestore();
		const ref = db.collection('Users').doc('45GCoMKDwQWciXc8193A');
		// const { id } = useParams();

		ref.get().then(data => {
			let Users = data.data().Users;
			let CurUser = Users.filter(
				user => user.Class === 'admin'
			);

			// console.log('after sorting ', CurUser);
			if(CurUser.length === 0){
				window.location.href = '/'
			}
			else{
				let gs = firebase.storage();

				let storageRef = (CurUser[0].Avatar !== "" &&  CurUser[0].Avatar !== undefined) 
												?gs.ref('UsersAvatar/'+CurUser[0].Id + '/' + CurUser[0].Avatar)
												:gs.ref('UsersAvatar/standard/avatar.png');

				let imageFolder = [];
				const arrImageUrl = [];
				
				arrImageUrl.push(storageRef.getDownloadURL());

				// console.log(arrImageUrl)

				Promise.all(arrImageUrl).then((result) => {
					imageFolder = result;
					this.setState(function(state){
						return {
							Avatar:imageFolder
						}
					})
				}, (error) => {

				})
			}
		});
	}







  render() {
    const {AnnouncementList,Avatar} = this.state;
    
    return(
      <div className="News">
        <h1>Announcement</h1>

        <div className="NewsMain">
          {AnnouncementList.map((Announcement, idx) => (
            <InsideNews
              GetDB={this.GetDB.bind(this)}
              Announcement={Announcement}
              Avatar = {Avatar}
            ></InsideNews>
          ))}
        </div>
      </div>
    );
  }
}
