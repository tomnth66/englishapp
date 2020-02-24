import React, { useState } from "react";
import "../css/CreateMap.css";
import firebase from "../firebase.js";
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
  Select,
  MenuItem,
  Input
} from "@material-ui/core";
import { Zoom, Slide, Fade } from "@material-ui/core";
import Navbar from "../components/Navbar";
import Flippy, { FrontSide, BackSide } from "react-flippy";
import "flexboxgrid";

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 240
  }
}));

let titleName = "";
let exerciseType = "";

const setExercise = (name, type) => {
  titleName = name;
  exerciseType = type;
};

const PopOutForm = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const [type, setType] = useState("");
  const [name, setName] = useState("");

  const handleChangeType = event => {
    setType(event.target.value || "");
  };

  const handleChangeName = event => {
    setName(event.target.value || "");
  };

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  const handleClose = () => {
    setOpen(false);
    setExercise(name, type);
  };

  return (
    <Dialog
      disableBackdropClick
      disableEscapeKeyDown
      open={open}
      onClose={handleClose}
    >
      <DialogTitle>Quick create</DialogTitle>
      <DialogContent>
        <form className={classes.container}>
          <FormControl className={classes.formControl} required>
            <InputLabel id="demo-dialog-select-label">Map Type</InputLabel>
            <Select
              labelId="demo-dialog-select-label"
              id="demo-dialog-select"
              value={type}
              onChange={handleChangeType}
              input={<Input />}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="10">Ten</MenuItem>
              <MenuItem value="20">Twenty</MenuItem>
              <MenuItem value="30">Thirty</MenuItem>
            </Select>
          </FormControl>
          <FormControl className={classes.formControl} required>
            <InputLabel htmlFor="my-input">Map Name</InputLabel>
            <Input
              id="my-input"
              aria-describedby="my-helper-text"
              value={name}
              onChange={handleChangeName}
            />
            {/* <FormHelperText id="my-helper-text">
                  We'll never share your email.
                </FormHelperText> */}
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
        <Button onClick={handleClose} color="primary" disabled={!type || !name}>
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const PopOutAlert = ({ isOpen }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const [type, setType] = useState("");
  const [name, setName] = useState("");

  const handleChangeType = event => {
    setType(event.target.value || "");
  };

  const handleChangeName = event => {
    setName(event.target.value || "");
  };

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      disableBackdropClick
      disableEscapeKeyDown
      open={open}
      onClose={handleClose}
    >
      <DialogTitle>Success</DialogTitle>
      <DialogContent className={classes.container}>
          <DialogContentText id="alert-dialog-description">
            {/* Success */}
          </DialogContentText>
        </DialogContent>
      <DialogActions>
        <Button
          onClick={handleClose}
          variant="contained"
          color="primary"
          onClick={() => {
            window.location.href = "/Practice";
          }}
        >
          Continue
        </Button>
      </DialogActions>
    </Dialog>
  );
};

// input area value
let para;
// coontain true and false value
// true = answer that teacher selected
let correctAnswer = [];

const CreateMap = props => {
  let [flip, setFlip] = useState(false);

  const flipCard = () => {
    setFlip(!flip);
  };

  // handle import txt file to the input
  const importFile = () => {
    let file = document.getElementById("FileReader").files[0];
    let textType = /text.*/;
    if (file.type.match(textType)) {
      var reader = new FileReader();

      reader.onload = function(e) {
        document.getElementById("inputArea").value = reader.result;
      };

      reader.readAsText(file);
    } else {
      document.getElementById("inputArea").value = "File not supported!";
    }
  };

  // let correctAnswer = [];
  const returnAnswerSelector = () => {
    flipCard();
    let answerSelectorArea = document.getElementById("answerSelector");
    para = document.getElementById("inputArea").value;

    console.log(para);
    let words = para.split("\n");
    console.log(`đây là từng đoạn một ${words}`);

    let fullPara = "";

    // id is start from 0
    let currentID = 0;

    // clear the old answer correctAnswer;
    correctAnswer = [];

    for (let word of words) {
      fullPara += `<div>\n`;
      word = word.split(" ");
      for (let i = 0; i < word.length; ++i) {
        if (word[i] !== "") {
          fullPara += `\t<span id="${currentID}" class="teacher-para">${word[i]}</span>\n`;
          ++currentID;
          correctAnswer.push(false);
        } else {
          //  don't count " " or "\n"
          fullPara += '\t<div style="height: 1rem"></div>';
        }
      }
      console.log(`Đây là từng từ một ${word}`);
      fullPara += `</div>\n`;
    }

    console.log(fullPara);

    answerSelectorArea.innerHTML = fullPara;

    let teacher_paras = document.querySelectorAll(".teacher-para");
    for (let p of teacher_paras) {
      p.addEventListener("click", e => {
        console.log(p);
        e.currentTarget.classList.toggle("selected-answer");
        console.log(e.currentTarget.id);
        correctAnswer[e.currentTarget.id] = !correctAnswer[e.currentTarget.id];
        console.log(correctAnswer[e.currentTarget.id]);
      });
    }
  };

  let [confirm, setConfirm] = useState(false);

  const submit = () => {
    setConfirm(true);
      console.log("Submitting... 🚀");

    const db = firebase.firestore();
    const ref = db.collection("Map").doc("wCj3hteHUHgCtiWl98yq");

    ref.get().then(data => {
      console.log("dữ liệu", data.data().Maplist);
      let Maplist = data.data().Maplist;
      console.log(para);
      Maplist.unshift({
        Answer: correctAnswer,
        Clue: ["clue1", "clue2", "clue3"],
        Mapname: titleName,
        Maptype: exerciseType,
        paragraph: para
      });

      ref.set({ Maplist: Maplist }).then(() => {
        // window.location.href = "/";
      });
      // .then(() => {});

      // window.location.href="/";
    });

    // window.location.href="/";
  };

  return (
    <div style={{ height: "100vh" }}>
      <PopOutForm />
      <Navbar />
      <div
        className="row middle-xs center-xs"
        style={{ height: "calc(100% - 4rem)" }}
      >
        <div className="col-xs-10 flip-card">
          <Flippy
            flipOnHover={false} // default false
            flipOnClick={false} // default false
            flipDirection="horizontal" // horizontal or vertical
            isFlipped={flip}
          >
            <FrontSide>
              <textarea id="inputArea"></textarea>
              <div className="button-area">
                <input
                  id="FileReader"
                  multiple
                  type="file"
                  onChange={importFile}
                />
                <label htmlFor="FileReader">
                  <Button color="primary" component="span">
                    Upload
                  </Button>
                </label>
                {/* change to mode select answer */}
                <Button
                  color="primary"
                  variant="contained"
                  onClick={returnAnswerSelector}
                >
                  Next
                </Button>
              </div>
            </FrontSide>

            <BackSide>
              <div id="answerSelector"></div>
              <div className="button-area">
                <Button color="primary" onClick={flipCard}>
                  Back
                </Button>
                {/* submit to database */}
                <Button color="primary" variant="contained" onClick={submit}>
                  Submit
                </Button>
              </div>
            </BackSide>
          </Flippy>
        </div>
      </div>
      {confirm &&  <PopOutAlert />}
    </div>
  );
};

export default CreateMap;
