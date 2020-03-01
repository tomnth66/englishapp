// import React, {Component} from "react";
// import "../css/InsideLogin.css";
// import Button from "./Button.js";
// import firebase from '../firebase';
// import RegisterForm from './RegisterForm.js'
// import RegisterDone from './RegisterDone.js'

// let acc, pass;
// let userInfo;

// export default class InsideLogin extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       err: '',
//       registerForm: false,
//       registerDone: false
//     }

//     this.inputElement = React.createRef();
//   }

//   login(event, funct) {
//     // console.log(event.keyCode);
//     if (event.keyCode === 13) {
//       funct();
//     }
//   }

//   handleAccount(event) {
//     acc = event.target.value;
//   }

//   handlePassword(event) {
//     pass = event.target.value;
//   }

//   handleForm() {
//     // console.log(acc,pass);
//     const db = firebase.firestore();
//     const ref = db.collection('Users').doc('45GCoMKDwQWciXc8193A');
//     ref.get().then((data) => {
//       // console.log('data after update in mount',data.data().ContractList);
//       let Users = data.data().Users;
//       // console.log(Users);
//       let UserAccount = Users.filter(function (user) {
//         return user.Account === acc;
//       })
//       // console.log(UserAccount);
//       if (!UserAccount.length) {
//         this.setState({
//           redirect: this.state.redirect,
//           err: 'This account is not exist'
//         })
//       }
//       else {
//         let User = UserAccount.filter(function (user) {
//           return user.Password === pass;
//         })

//         if (!User.length) {
//           this.setState({
//             redirect: this.state.redirect,
//             err: 'Wrong password'
//           })
//         }
//         else {
//           userInfo = User[0];
//           if (!userInfo.Activated) {
//             this.setState({
//               err: 'Sorry, this account is inactivated, please wait until it is activated'
//             })
//           }

//           else {
//             localStorage.setItem('user', userInfo.Name);
//             localStorage.setItem('class', userInfo.Class);
//             localStorage.setItem('userId', userInfo.Id);
//             window.location.href = "/";
//             return;
//           }
//           // this.hello();
//         }
//       }

//       // console.log(this.state.err);
//     });
//   }

//   register() {
//     this.setState({
//       registerForm: true
//     })
//   }

//   CloseRegisterForm() {
//     // console.log('closing...');
//     this.setState({
//       registerForm: false
//     })
//   }

//   RegisterDone() {
//     this.setState({
//       registerForm: false,
//       registerDone: true
//     })
//   }

//   render() {
//     return (
//       <div className="InsideLogin">
//         <div className="Account">
//           <input type="text"
//             placeholder="Username"
//             class="Input"
//             ref={this.inputElement}
//             onKeyUp={(event) => this.login.bind(this)(event, this.handleForm.bind(this))}
//             onChange={this.handleAccount.bind(this)}></input>
//         </div>

//         <div className="Password">
//           <input type="password"
//             placeholder="Password"
//             class="Input"
//             onKeyUp={(event) => this.login.bind(this)(event, this.handleForm.bind(this))}
//             onChange={this.handlePassword.bind(this)}></input>
//         </div>

//         <Button keyword="Login" onClick={this.handleForm.bind(this)}></Button>
//         <Button keyword="Register" onClick={this.register.bind(this)}></Button>

//         {this.state.registerForm && <RegisterForm CloseRegisterForm={this.CloseRegisterForm.bind(this)}
//           RegisterDone={this.RegisterDone.bind(this)}></RegisterForm>}

//         {this.state.registerDone && <RegisterDone></RegisterDone>}
//         {this.state.err && <p>{this.state.err}</p>}

//       </div>
//     );
//   }
// }

// // import React, { useState } from "react";
// // import firebase from "../firebase";
// // import {
// //   TextField,
// //   FormControl,
// //   InputLabel,
// //   InputAdornment,
// //   IconButton,
// //   OutlinedInput,
// //   FormHelperText
// // } from "@material-ui/core";
// // import { Card, Button } from "@material-ui/core";
// // import { makeStyles } from "@material-ui/core";
// // import Visibility from "@material-ui/icons/Visibility";
// // import VisibilityOff from "@material-ui/icons/VisibilityOff";

// // const useStyles = makeStyles(theme => ({
// //   root: {
// //     display: "flex",
// //     flexDirection: "column",
// //     flexWrap: "wrap",
// //     alignItems: "center",
// //     justifyContent: "center",
// //     margin: "10px 10px 0 0",
// //     padding: "1rem 0",
// //     background: "#f3f5f8"
// //     // border: "1px solid #fff"
// //   },
// //   formControl: {
// //     margin: theme.spacing(1),
// //     width: "80%"
// //   }
// // }));

// // let userInfo;

// // const InsideLogin = () => {
// //   const classes = useStyles();
// //   const [values, setValues] = useState({
// //     userName: "",
// //     password: "",
// //     showPassword: false,
// //     errorMesseage: "",
// //     isError: false
// //   });

// //   const handleChange = prop => e => {
// //     setValues({ ...values, [prop]: e.target.value });
// //   };

// //   const handleClickShowPassword = () => {
// //     setValues({ ...values, showPassword: !values.showPassword });
// //   };

// //   const handleMouseDownPassword = e => {
// //     e.preventDefault();
// //   };

// //   const handleLogIn = () => {
// //     // console.log(acc,pass);
// //     const db = firebase.firestore();
// //     const ref = db.collection("Users").doc("45GCoMKDwQWciXc8193A");
// //     ref.get().then(data => {
// //       // console.log('data after update in mount',data.data().ContractList);
// //       let Users = data.data().Users;
// //       // console.log(Users);
// //       let UserAccount = Users.filter(user => {
// //         return user.Account === values.userName;
// //       });
// //       // console.log(UserAccount);
// //       if (!UserAccount.length) {
// //         // this.setState({
// //         //   redirect: this.state.redirect
// //         // });
// //         setValues({
// //           ...values,
// //           isError: true,
// //           errorMesseage: "Tài khoản hoặc mật khẩu không tồn tại"
// //         });
// //         console.log(values);
// //       } else {
// //         let User = UserAccount.filter(function(user) {
// //           return user.Password === values.password;
// //         });

// //         if (!User.length) {
// //           // this.setState({
// //           //   redirect: this.state.redirect
// //           // });
// //           setValues({
// //             ...values,
// //             isError: true,
// //             errorMesseage: "Tài khoản hoặc mật khẩu không tồn tại"
// //           });
// //           console.log(values);
// //         } else {
// //           userInfo = User[0];
// //           localStorage.setItem("user", userInfo.Name);
// //           localStorage.setItem("class", userInfo.Class);
// //           localStorage.setItem("userId", userInfo.Id);
// //           window.location.href = "/";
// //           return;
// //           // this.hello();
// //         }
// //       }

// //       // console.log(this.state.err);
// //     });
// //   };

// //   return (
// //     <div>
// //       <Card className={classes.root}>
// //         <FormControl className={classes.formControl}>
// //           <TextField
// //             error={values.isError}
// //             variant="outlined"
// //             label="User Name"
// //             onChange={handleChange("userName")}
// //           />
// //         </FormControl>
// //         <FormControl className={classes.formControl} variant="outlined">
// //           <InputLabel
// //             error={values.isError}
// //             htmlFor="outlined-adornment-password"
// //           >
// //             Password
// //           </InputLabel>
// //           <OutlinedInput
// //             error={values.isError}
// //             id="outlined-adornment-password"
// //             type={values.showPassword ? "text" : "password"}
// //             value={values.password}
// //             onChange={handleChange("password")}
// //             endAdornment={
// //               <InputAdornment position="end">
// //                 <IconButton
// //                   aria-label="toggle password visibility"
// //                   onClick={handleClickShowPassword}
// //                   onMouseDown={handleMouseDownPassword}
// //                   edge="end"
// //                 >
// //                   {values.showPassword ? <Visibility /> : <VisibilityOff />}
// //                 </IconButton>
// //               </InputAdornment>
// //             }
// //             labelWidth={70}
// //           />
// //           <FormHelperText error={values.isError}>
// //             {values.errorMesseage}
// //           </FormHelperText>
// //         </FormControl>
// //         <div
// //           style={{
// //             display: "flex",
// //             width: "80%",
// //             height: "3em",
// //             alignItems: "center",
// //             justifyContent: "flex-end"
// //           }}
// //         >
// //           <Button
// //             color="primary"
// //             variant="contained"
// //             disabled={!values.userName || !values.password}
// //             onClick={handleLogIn}
// //           >
// //             LogIn
// //           </Button>
// //         </div>
// //       </Card>
// //     </div>
// //   );
// // };

// // export default InsideLogin;

import React, { useState } from "react";
import firebase from "../firebase";
import {
  TextField,
  FormControl,
  InputLabel,
  InputAdornment,
  IconButton,
  OutlinedInput,
  FormHelperText
} from "@material-ui/core";
import { Card, Button } from "@material-ui/core";
import theme from "../theme/muiTheme";
import { makeStyles, ThemeProvider } from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import RegisterDialog from "../components/RegisterDialog";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    margin: "76px 10px 0 0",
    padding: "1rem 0",
    background: "#f3f5f8",
    border: "2px solid #5e81ac"
  },
  formControl: {
    margin: theme.spacing(1),
    width: "80%"
  }
}));

let userInfo;

const InsideLogin = () => {
  const classes = useStyles();
  const [values, setValues] = useState({
    userName: "",
    password: "",
    showPassword: false,
    errorMesseage: "",
    isError: false,
    openRegister: false
  });

  const handleChange = prop => e => {
    setValues({ ...values, [prop]: e.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = e => {
    e.preventDefault();
  };

  // press enter to login
  // const login = e => {
  //   console.log(e.keyCode);
  //   if (e.keyCode === 13) {
  //     handleLogIn();
  //   }
  // };

  const handleLogIn = () => {
    if (values.userName === '' || values.password === '') {
      setValues({
        ...values,
        isError: true,
        errorMesseage: "Please fill in username and password"
      });
      return 0;
    }
    const db = firebase.firestore();
    const ref = db.collection("Users").doc("45GCoMKDwQWciXc8193A");
    ref.get().then(data => {
      // console.log('data after update in mount',data.data().ContractList);
      let Users = data.data().Users;
      // console.log(Users);
      let UserAccount = Users.filter(user => {
        return user.Account === values.userName;
      });
      // console.log(UserAccount);
      if (!UserAccount.length) {
        // this.setState({
        //   redirect: this.state.redirect
        // });
        setValues({
          ...values,
          isError: true,
          errorMesseage: "Tài khoản hoặc mật khẩu không tồn tại"
        });
        console.log(values);
      } else {
        let User = UserAccount.filter(function(user) {
          return user.Password === values.password;
        });

        if (!User.length) {
          // this.setState({
          //   redirect: this.state.redirect
          // });
          setValues({
            ...values,
            isError: true,
            errorMesseage: "Tài khoản hoặc mật khẩu không tồn tại"
          });
          console.log(values);
        } else {
          userInfo = User[0];
          localStorage.setItem("user", userInfo.Name);
          localStorage.setItem("class", userInfo.Class);
          localStorage.setItem("userId", userInfo.Id);
          window.location.href = "/";
          return;
          // this.hello();
        }
      }

      // console.log(this.state.err);
    });
  };

  const openRegisterDialog = () => {
    setValues({ ...values, openRegister: true });
    console.log(values);
  };

  return (
    <ThemeProvider theme={theme}>
      <Card
        className={classes.root}
        // onKeyPress={e => {
        //   console.log(e.key);
        //   if (e.key === "Enter") {
        //     handleLogIn();
        //   }
        // }}
      >
        <FormControl className={classes.formControl}>
          <TextField
            error={values.isError}
            variant="outlined"
            label="User Name"
            onChange={handleChange("userName")}
          />
        </FormControl>
        <FormControl className={classes.formControl} variant="outlined">
          <InputLabel
            error={values.isError}
            htmlFor="outlined-adornment-password"
          >
            Password
          </InputLabel>
          <OutlinedInput
            error={values.isError}
            id="outlined-adornment-password"
            type={values.showPassword ? "text" : "password"}
            value={values.password}
            onChange={handleChange("password")}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {values.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
            labelWidth={70}
          />
          <FormHelperText error={values.isError}>
            {values.errorMesseage}
          </FormHelperText>
        </FormControl>
        <div
          style={{
            display: "flex",
            width: "80%",
            height: "3em",
            alignItems: "center",
            justifyContent: "flex-end"
          }}
        >
          <Button color="primary" onClick={openRegisterDialog}>
            Register
          </Button>
          <Button
            color="primary"
            variant="contained"
            disabled={!values.userName || !values.password}
            onClick={handleLogIn}
          >
            LogIn
          </Button>
        </div>
        {values.openRegister && (
          <RegisterDialog
            isOpen={values.openRegister}
            closeRegister={() => {
              setValues({ ...values, openRegister: false });
            }}
          />
        )}
      </Card>
    </ThemeProvider>
  );
};

export default InsideLogin;
