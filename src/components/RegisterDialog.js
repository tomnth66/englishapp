import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
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
  IconButton,
} from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "column"
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 240
  }
}));

// import "../css/RegisterDialog.css"

const RegisterDialog = ({ isOpen }) => {
  const classes = useStyles();
  const [values, setValues] = useState({
    open: isOpen,
    userName: "",
    password: "",
    reTypePass: "",
    showPassword: false,
    showReTypePass: false
  });

  const register = () => {
    setValues({ ...values, open: false });
  };

  const handleChange = prop => e => {
    setValues({ ...values, [prop]: e.target.value });
  };

  const handleClose = e => {
    setValues({ ...values, isOpen: false });
  };

  const handleClickShowPassword = prop => () => {
    setValues({ ...values, [prop]: !values[prop] });
  };

  const handleMouseDownPassword = e => {
    e.preventDefault();
  };

  return (
    <Dialog open={values.open} onClose={register}>
      <DialogTitle id="form-dialog-title">Register</DialogTitle>
      <DialogContent>
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
                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              labelWidth={70}
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
                    onClick={handleClickShowPassword("showReTypePass")}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {values.showReTypePass ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              labelWidth={70}
            />
            {/* <FormHelperText error={values.isError}>{values.errorMesseage}</FormHelperText> */}
          </FormControl>
        </form>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleClose}
          color="primary"
          onClick={() => {
            window.location.href = "/Practice";
          }}
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RegisterDialog;
