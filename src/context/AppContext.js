import React, {Component} from 'react';
import firebase from '../firebase';
export const ContractContext = React.createContext();


export class ContractProvider extends Component {
  constructor(props){
    super(props);
    this.state = {
      Avatar:[],
    }
  }

  getImage(Id,item){
    let gs = firebase.storage();
    let storageRef = gs.ref('UsersAvatar/'+CurUser[0].Id + '/' + CurUser[0].Avatar);

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

 
  render(){
    return(
      <ContractContext.Provider value = {{
        getImage:this.getImage.bind(this),
        image:this.state.image,
      }}>
        {this.props.children}
      </ContractContext.Provider>
    );
  }
}