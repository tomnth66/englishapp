import React, { Component } from "react";
import "../css/InsideNews.css";
import firebase from '../firebase.js'
import Ava from '../img/stitch.jpg'
import 'font-awesome/css/font-awesome.min.css';
import { Button } from '@material-ui/core';
import Loading from "./Loading.js";

export default class Newsmain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowSetting: false,
      EditState:false,
      originValue:'',
      value:'',
      content: '',
      isLoading: false
    }

    this.inputElement1 = React.createRef();
    this.inputElement2 = React.createRef();
  }

  componentDidMount(){
    this.setState({
      isShowSetting: false,
      EditState:false,
      originValue:this.props.Announcement.AnnouncementContent,
      value:this.props.Announcement.AnnouncementContent,
      isLoading: false
    },()=>this.updateRenderDB())
  }


  componentWillReceiveProps(nextProps){
    if(nextProps.Announcement !== this.props.Announcement){
      this.setState({
        isShowSetting: false,
        EditState:false,
        originValue:this.props.Announcement.AnnouncementContent,
        value:this.props.Announcement.AnnouncementContent,
        isLoading: false
      },()=>this.updateRenderDB())
    }
  }

  updateRenderDB(){
    let curAnn = this.props.Announcement.AnnouncementContent;
    let words = curAnn.split('\n');
    let fullPara = '';
    
    fullPara+=`#${this.props.Announcement.id}\n`;

		for (let word of words) {
			fullPara += `<div>\n`;
			word = word.split(' ');
			for (let i = 0; i < word.length; ++i) {
				if (word[i] !== '') {
					fullPara += `${word[i]} `;
        } 
        else {
					fullPara += '<div style="height: 1rem"></div>';
				}
			}
			fullPara += `</div>\n`;
    }
    
    this.setState({
      content:fullPara
    })
  }
 

  showSetting(){
    this.setState({
      isShowSetting:!this.state.isShowSetting
    }, ()=>{document.addEventListener('mousedown',this.handleClick.bind(this),false);})
  }



  handleClick(event){
    if(this.state.isShowSetting){
      if(!this.inputElement1.current.contains(event.target) 
      && !this.inputElement2.current.contains(event.target)){
          this.setState({
            isShowSetting: false,
          }) 
      }
    }
  }



  saveEdit(){
    this.setState({
      isLoading:true
    })
    const db = firebase.firestore();
    const ref = db.collection("Announcement").doc("A4TT0kGAgjKUxs2wrj8p");
    let curAnn = document.getElementById('EditTextArea').value;
    let words = curAnn.split('\n');
		let fullPara = '';

    fullPara+=`#${this.props.Announcement.id}\n`;

		for (let word of words) {
			fullPara += `<div>\n`;
			word = word.split(' ');
			for (let i = 0; i < word.length; ++i) {
				if (word[i] !== '') {
					fullPara += `${word[i]} `;
        } 
        else {
					fullPara += '<div style="height: 1rem"></div>';
				}
			}
			fullPara += `</div>\n`;
    }

    ref.get().then(data => {
      let AnnouncementList = data.data().AnnouncementList;
      let idx = AnnouncementList.findIndex(Ann => Ann.id === this.props.Announcement.id);

      AnnouncementList[idx].AnnouncementContent = curAnn;

      ref.set({ AnnouncementList: AnnouncementList })
         .then(()=>{
                    this.setState({
                      EditState:false,
                      content:fullPara,
                      isLoading: false,
                      originValue:this.state.value
                    })
                   });
    });
  }



  handleTextChange(e){
    this.setState({
      value: e.target.value
    });
  }




  EditNews(){
    this.setState({
      isShowSetting:false,
      EditState:true
    },()=>{
      const Ref = this.EditTextRef;
      const length = this.EditTextRef.value.length;
      Ref.focus();
      Ref.setSelectionRange(length, length);
    })
  }





  DeleteNews(){
    this.setState({
      isLoading:true,
    })

    const db = firebase.firestore();
    const ref = db.collection("Announcement").doc("A4TT0kGAgjKUxs2wrj8p");

    ref.get().then(data => {
      let AnnouncementList = data.data().AnnouncementList;
      let idx = AnnouncementList.findIndex(Ann => Ann.id === this.props.Announcement.id );
      
      AnnouncementList.splice(idx, 1);

      ref.set({ AnnouncementList: AnnouncementList })
         .then( ()=>{
                      this.setState({
                        isShowSetting:false,
                        isLoading: false
                      }, ()=>this.props.GetDB())
                    })
    });
  }




  closeEdit(){
    this.setState({
      EditState:false,
      value: this.state.originValue
    })
  }


  
  
  render() {
    return (
      <div className = 'Newsmain'>
        {this.state.isLoading && <Loading />}
        <div className = 'Auther'>
          <div className = 'AutherAvatar'>
            <img className="Picture" src={Ava}></img>
          </div>
          <div className = 'AutherName'>
            <span>San</span>
          </div>
          
          {localStorage.getItem('class') === 'admin' &&
          <div className = 'News-icons'>
            <span ref = {this.inputElement1} 
                  onClick = {this.showSetting.bind(this)}><i id = 'curIcon' class="fa fa-ellipsis-h"></i></span>
          </div>}

          {this.state.isShowSetting &&
          <div ref = {this.inputElement2}  
               className = 'News-setting'>
              <ul>
                <li onClick = {this.EditNews.bind(this)}>Edit</li>
                <li onClick = {this.DeleteNews.bind(this)}>Delete</li>
              </ul>
          </div> 
          }
        </div>

        <div className = 'NewsContent'>
          {!this.state.EditState && <div dangerouslySetInnerHTML={{__html: this.state.content}}>
                                    </div>}

          {this.state.EditState && 
            <div>
              <textarea ref = {ref => this.EditTextRef = ref} 
                        value = {this.state.value} 
                        onChange = {this.handleTextChange.bind(this)}
                        id = 'EditTextArea'></textarea> 
              <div className = 'EditNewsBtn'>
                <Button color="primary" variant="contained" onClick = {this.closeEdit.bind(this)}> 
                            Cancel
                </Button>

                <Button color="primary" variant="contained" onClick = {this.saveEdit.bind(this)}> 
                            Save
                </Button>
              </div>
            </div>
          }
        </div>
      </div>
    );
  }
}
