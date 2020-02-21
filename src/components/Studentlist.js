import React, { Component } from "react";
import "../css/Studentlist.css";

export default class Studentlist extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div className="Studentlist">
        <table>
          <tr>
            <td colspan='3' style={{color: '#C36'}}>Tổng số thành viên: 10</td>
            <td colspan='3'></td>
            {/* <td colspan='1'></td> */}
          </tr>
          <tr style={{background: '#0F6' , color: '#fff'}}>
            <th>STT</th>
            <th>username</th>
            <th>email</th>
            <th>Course</th>
            <th>Confirm</th>
            <th></th>
          </tr>

          <tr>
            <td>1</td>
            <td>An</td>
            <td>An@gmail.com</td>
            <td>Student</td>
            <td>
              <select className = 'Confirm'>
                <option value='N'>NO</option>
                <option value='Y'>YES</option>
              </select>
            </td>
            <td>Detail</td>
          </tr>

          <tr>
            <td>2</td>
            <td>Binh</td>
            <td>Binh@gmail.com</td>
            <td>Student</td>
            <td>
              <select className = 'Confirm'>
                <option value='N'>NO</option>
                <option value='Y'>YES</option>
              </select>
            </td>
            <td>Detail</td>
          </tr>

          <tr>
            <td>3</td>
            <td>Cuong</td>
            <td>Cuong@gmail.com</td>
            <td>Student</td>
            <td>
              <select className = 'Confirm'>
                <option value='N'>NO</option>
                <option value='Y'>YES</option>
              </select>
            </td>
            <td>Detail</td>
          </tr>
        </table>
      </div>
    ); 
  }
}
