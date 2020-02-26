import React, { useState } from "react";
import firebase from "../firebase";
import Ids from "short-id";
import { makeStyles } from "@material-ui/core/styles";
import theme from "../theme/muiTheme"
import { Button } from "@material-ui/core";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "@material-ui/core";
import {
  TextField,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton
} from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "column",
    alignItems: "center",
    background: "#f3f5f8"
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 400
  }
}));

// import "../css/RegisterDialog.css"

const RegisterDialog = ({ isOpen, closeRegister }) => {
  const classes = useStyles();
  const [values, setValues] = useState({
    open: isOpen,
    userName: "",
    password: "",
    reTypePass: "",
    showPassword: false,
    showReTypePass: false,
    email: "",
    studentName: "",
    course: "",
    stage: "setUserName"
  });

  const handleChange = prop => e => {
    setValues({ ...values, [prop]: e.target.value });
  };

  const handleClose = e => {
    closeRegister();
    setValues({ ...values, open: isOpen });
  };

  const handleClickShowPassword = prop => () => {
    setValues({ ...values, [prop]: !values[prop] });
  };

  const handleMouseDownPassword = e => {
    e.preventDefault();
  };

  const next = () => {
    if (values.password !== values.reTypePass) {
      alert("ERROR: Your password and confirmation password do not match.");
    } else {
      setValues({ ...values, stage: "setCourse" });
    }
  };

  const register = func => {
    const db = firebase.firestore();
    const ref = db.collection("Users").doc("45GCoMKDwQWciXc8193A");
    ref.get().then(data => {
      // console.log('data after update in mount',data.data().ContractList);
      let Users = data.data().Users;

      Users.unshift({
        Account: values.userName,
        Class: "student",
        Id: Ids.generate(),
        Name: values.studentName,
        Password: values.password,
        Course: values.course,
        Email: values.email,
        TotalScore: 0,
        Activated: false
      });

      // localStorage.setItem('user',this.state.studentName);
      // localStorage.setItem('class','student');
      // localStorage.setItem('userId',this.state.Id);

      ref.set({ Users: Users }).then(() => {
        func();
      });
      handleClose();
      alert("You have registered. Now let's wait for confirmation");
    });
  };

  return (
    <Dialog open={values.open} onClose={handleClose} theme={theme}>
      <DialogTitle id="form-dialog-title" style={{ background: "#f3f5f8" }}>
        Register
      </DialogTitle>
      {values.stage === "setUserName" && (
        <div>
          <DialogContent style={{ background: "#f3f5f8" }}>
            <form className={classes.container}>
              <FormControl className={classes.formControl} required>
                <TextField
                  // error={values.isError}
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
                        onClick={handleClickShowPassword("showPassword")}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {values.showPassword ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  labelWidth={70}
                />
              </FormControl>
              <FormControl
                className={classes.formControl}
                variant="outlined"
                style={{ marginBottom: "0" }}
              >
                <InputLabel
                  error={values.isError}
                  htmlFor="outlined-adornment-password"
                  style={{ background: "#f3f5f8" }}
                >
                  Re-type Password
                </InputLabel>
                <OutlinedInput
                  error={values.isError}
                  id="outlined-adornment-password"
                  type={values.showReTypePass ? "text" : "password"}
                  value={values.reTypePass}
                  onChange={handleChange("reTypePass")}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword("showReTypePass")}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {values.showReTypePass ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  labelWidth={70}
                />
                {/* <FormHelperText error={values.isError}>{values.errorMesseage}</FormHelperText> */}
              </FormControl>
            </form>
          </DialogContent>
          <div
            style={{
              display: "flex",
              width: "100%",
              height: "4em",
              alignItems: "center",
              justifyContent: "center",
              background: "#f3f5f8"
            }}
          >
            <div
              style={{
                display: "flex",
                width: "400px",
                justifyContent: "flex-end"
              }}
            >
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button
                onClick={next}
                color="primary"
                variant="contained"
                disabled={
                  !values.userName || !values.password || !values.reTypePass
                }
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      )}
      {values.stage === "setCourse" && (
        <div>
          <DialogContent style={{ background: "#f3f5f8" }}>
            <form className={classes.container}>
              <FormControl className={classes.formControl} required>
                <TextField
                  // error={values.isError}
                  variant="outlined"
                  label="Full Name"
                  onChange={handleChange("studentName")}
                />
              </FormControl>
              <FormControl className={classes.formControl} required>
                <TextField
                  // error={values.isError}
                  variant="outlined"
                  label="Course"
                  onChange={handleChange("course")}
                />
              </FormControl>
              <FormControl className={classes.formControl} required>
                <TextField
                  // error={values.isError}
                  variant="outlined"
                  label="Email"
                  onChange={handleChange("email")}
                />
              </FormControl>
            </form>
          </DialogContent>
          <div
            style={{
              display: "flex",
              width: "100%",
              height: "4em",
              alignItems: "center",
              justifyContent: "center",
              background: "#f3f5f8"
            }}
          >
            <div
              style={{
                display: "flex",
                width: "400px",
                justifyContent: "flex-end"
              }}
            >
              <Button
                onClick={() => {
                  setValues({ ...values, stage: "setUserName" });
                }}
                color="primary"
              >
                Back
              </Button>
              <Button
                onClick={register}
                color="primary"
                variant="contained"
                disabled={
                  !values.studentName || !values.course || !values.email
                }
              >
                Register
              </Button>
            </div>
          </div>
        </div>
      )}
    </Dialog>
  );
};

export default RegisterDialog;
