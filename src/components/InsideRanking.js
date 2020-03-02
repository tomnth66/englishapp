import React, { Component } from "react";
import "../css/InsideRanking.css";
import firebase from '../firebase.js';

export default class InsideRanking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Users:[]
    }
  }

  componentDidMount(){
    this.GetDB();
  }


  GetDB(){
    const db = firebase.firestore();
    const ref = db.collection('Users').doc('45GCoMKDwQWciXc8193A');
    ref.get().then((data)=>{
      let Users = data.data().Users;
      // console.log(Users);
      // console.log('test', 'a'.localeCompare('b'))

      Users.sort(function (user1, user2) {
        let diff = user2.TotalScore - user1.TotalScore
          if(diff!==0)
            return user2.TotalScore - user1.TotalScore;

          return user1.Name.localeCompare(user2.Name);
      });

      // console.log('after sorting ',Users);
      this.setState({
        Users:Users
      })
    });
  }

  render() {
    const {Users} = this.state;
    return (
      <div className = 'InsideRanking'>
        <div className = 'CourseSelector'>
          <h1>Ranking</h1>
          <select>
            <option>1</option>
            <option>2</option>
            <option>3</option>   
          </select>
        </div>

        <div className = 'InsideRankingMain'>
          <table>
          {/* <tr>
            <td colspan='3' style={{color: '#C36'}}>Tổng số học sinh: {Users.length}</td>
            <td colspan='3'></td>
            <td colspan='1'></td>
          </tr> */}

          <tr style={{background: '#0F6' , color: '#fff'}}>
            <th>STT</th>
            <th>Name</th>
            <th>Score</th>
            <th></th>
			    </tr>

          {/* <tr>
            <td width = '6%'>1</td>
            <td width = '65%'>Leminh</td>
            <td width = '17%'>100</td>
            <td className = 'DetailCss'>Detail</td>
          </tr>

          <tr>
            <td>2</td>
            <td>LeVu</td>
            <td>200</td>
            <td className = 'DetailCss'>Detail</td>
          </tr> */}
          
          {Users.map((user,idx)=>(
            <tr>
              <td width = '6%'>{++idx}</td>
              <td width = '65%'>{user.Name}</td>
              <td width = '17%'>{user.TotalScore}</td>
              <td className = 'DetailCss'>Detail</td>
            </tr>
          ))}

          </table>
        </div>
      </div>
    );
  }
}
