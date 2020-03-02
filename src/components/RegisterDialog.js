import React, { useState, useEffect } from "react";
import firebase from "../firebase";
import Ids from "short-id";
import { makeStyles } from "@material-ui/core/styles";
import theme from "../theme/muiTheme";
import { Button } from "@material-ui/core";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "@material-ui/core";
import {
  FormControl,
  InputLabel,
  FormHelperText,
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
    minWidth: 500
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
    stage: "setUserName",
    wrongReTypePass: false,
    existedAccount: false
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

  const next = async _ => {
    let existedAccount = false;

    const db = firebase.firestore();
    console.time("concatenation");
    await db
      .collection("Users")
      .doc("45GCoMKDwQWciXc8193A")
      .get()
      .then(async data => {
        console.time("getUser: ");
        let Users = await data.data().Users;
        console.timeEnd("getUser: ");
        console.time("Check existed user name: ");
        await Users.map(student => {
          if (student.Account === values.userName) existedAccount = true;
          return student;
        });
        console.timeEnd("Check existed user name: ");
      });
    console.timeEnd("concatenation");
    // if (existedAccount) setValues({ ...values, existedAccount: true });

    // console.log(existedAccount);
    // values.password !== values.reTypePass
    //   ? setValues({ ...values, wrongReTypePass: true })
    //   : !existedAccount
    //   ? setValues({ ...values, stage: "setCourse" })
    //   : console.log("tmp");

    existedAccount
      ? values.password !== values.reTypePass
        ? setValues({ ...values, wrongReTypePass: true, existedAccount: true })
        : setValues({ ...values, existedAccount: true, wrongReTypePass: false })
      : values.password !== values.reTypePass
      ? setValues({ ...values, existedAccount: false, wrongReTypePass: true })
      : setValues({
          ...values,
          stage: "setCourse",
          existedAccount: false,
          wrongReTypePass: false
        });

    console.log(values);
  };

  const register = () => {
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
        // finishRegister();
      });
      // handleClose();
      setValues({ ...values, stage: "finished" });
    });
  };

  return (
    <Dialog
      open={values.open}
      onClose={handleClose}
      theme={theme}
      disableBackdropClick
      disableEscapeKeyDown
    >
      <DialogTitle
        id="form-dialog-title"
        style={{ background: "#f3f5f8" }}
        disableBackdropClick
        disableEscapeKeyDown
      >
        Register
      </DialogTitle>
      {values.stage === "setUserName" ? (
        <div>
          <DialogContent style={{ background: "#f3f5f8" }}>
            <form className={classes.container}>
              <FormControl
                className={classes.formControl}
                variant="outlined"
                required
              >
                <InputLabel
                  htmlFor="outlined-adornment-userName"
                  style={{ background: "#f3f5f8" }}
                  error={values.existedAccount}
                >
                  User Name
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-userName"
                  value={values.userName}
                  onChange={handleChange("userName")}
                  error={values.existedAccount}
                ></OutlinedInput>
                {values.existedAccount && (
                  <FormHelperText error>
                    This User Name is already existed.
                  </FormHelperText>
                )}
              </FormControl>
              <FormControl
                className={classes.formControl}
                variant="outlined"
                required
              >
                <InputLabel
                  style={{ background: "#f3f5f8" }}
                  error={values.wrongReTypePass}
                  htmlFor="outlined-adornment-password"
                >
                  Password
                </InputLabel>
                <OutlinedInput
                  error={values.wrongReTypePass}
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
                required
              >
                <InputLabel
                  error={values.wrongReTypePass}
                  htmlFor="outlined-adornment-reTypePass"
                  style={{ background: "#f3f5f8" }}
                >
                  Re-type Password
                </InputLabel>
                <OutlinedInput
                  error={values.wrongReTypePass}
                  id="outlined-adornment-reTypePass"
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
                {values.wrongReTypePass && (
                  <FormHelperText error>
                    Your password and your re-type password is not the same
                  </FormHelperText>
                )}
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
                width: "500px",
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
      ) : values.stage === "setCourse" ? (
        <div>
          <DialogContent style={{ background: "#f3f5f8" }}>
            <form className={classes.container}>
              <FormControl
                className={classes.formControl}
                variant="outlined"
                required
              >
                <InputLabel
                  htmlFor="outlined-adornment-studentName"
                  style={{ background: "#f3f5f8" }}
                >
                  Student's Name
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-studentName"
                  value={values.studentName}
                  onChange={handleChange("studentName")}
                ></OutlinedInput>
              </FormControl>
              <FormControl
                className={classes.formControl}
                variant="outlined"
                required
              >
                <InputLabel
                  htmlFor="outlined-adornment-course"
                  style={{ background: "#f3f5f8" }}
                >
                  Course
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-userName"
                  value={values.course}
                  onChange={handleChange("course")}
                ></OutlinedInput>
              </FormControl>
              <FormControl
                className={classes.formControl}
                variant="outlined"
                style={{ marginBottom: "0" }}
                required
              >
                <InputLabel
                  htmlFor="outlined-adornment-email"
                  style={{ background: "#f3f5f8" }}
                >
                  Email
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-email"
                  value={values.email}
                  onChange={handleChange("email")}
                ></OutlinedInput>
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
                width: "500px",
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
                Submit
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <DialogContent style={{ background: "#f3f5f8" }}>
            <DialogContentText id="alert-dialog-description">
              You have successed sending request to join course. Now wait for
              your confirmation.
            </DialogContentText>
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
                width: "500px",
                justifyContent: "flex-end"
              }}
            >
              <Button onClick={handleClose} color="primary">
                Continue
              </Button>
            </div>
          </div>
        </div>
      )}
    </Dialog>
  );
};

export default RegisterDialog;
