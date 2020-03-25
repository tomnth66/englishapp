import React, { Component } from "react";
import "../css/InsideAnnouncement.css";
import firebase from "../firebase.js";
import Loading from "./Loading.js";
import { Button } from '@material-ui/core';
import Ids from "short-id";
// import {useParams} from 'react-router-dom';

export default class InsideAnnouncement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false
    };
  }

  showLoading() {
    this.setState({
      isLoading: true
    });
  }


  componentDidMount() {

  }



  handleSubmit(){
    this.showLoading();
    let curAnn = document.getElementById('AnnouncementInputArea').value.toString();
    let time = new Date();

    // console.log(curAnn);

    const db = firebase.firestore();
    const ref = db.collection('Announcement').doc('A4TT0kGAgjKUxs2wrj8p');

    ref.get().then((data)=>{
      let AnnouncementList = data.data().AnnouncementList;
      // console.log('contract processing',ContractList);
      AnnouncementList.unshift({id:Ids.generate() , 
                                AnnouncementContent:curAnn , 
                                Img:[],
                                Time:{
                                      day:time.getDate(),
                                      month:time.getMonth()+1,
                                      year:time.getFullYear(),
                                      hours:time.getHours(),
                                      minutes:time.getMinutes(),
                                      seconds:time.getSeconds()
                                    },                             
                              });

       ref.set({AnnouncementList:AnnouncementList}).then(()=> window.location.href = "/");
    });

  }


  render() {
    const {isLoading} = this.state;
    return (
      <div className="InsideAnnouncement">
        {isLoading && <Loading />}
        <div className="InsideAnnouncementHeader">
          <h1>Post Announcement</h1>
        </div>

        <div className="InsideAnnouncementMain">

          <textarea Id="AnnouncementInputArea" 
                      placeholder = 'Write your announcement in this area'></textarea>


          <Button style = {{width:'97.9%', marginLeft: '1rem'}} color="primary" variant="contained" onClick={this.handleSubmit.bind(this)}>
                        Post
          </Button>

          {/* <div className = 'AnnouncementBtn'>
            <Button color="primary" variant="contained" onClick={this.handleSubmit.bind(this)}>
                        Post
            </Button>
          </div> */}


        </div>
      </div>
    );
  }
}
