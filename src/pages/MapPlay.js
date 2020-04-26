import { Button, IconButton } from "@material-ui/core";
import Navbar from "../components/Navbar";
import Loading from "../components/Loading";
import React, { useEffect, useState } from "react";
import firebase from "../firebase.js";
import WbIncandescentTwoToneIcon from "@material-ui/icons/WbIncandescentTwoTone";
import SendIcon from "@material-ui/icons/Send";
import "flexboxgrid";
import "../css/MapPlay.css";

let answer = [];

let timer;
let ready = false;

const binarySearchAnswerStudent = (id) => {
  let start = 0;
  let end = answer.length - 1;
  let mid;
  // check if answer is empty or not
  // not empty => binary search
  switch (answer.length) {
    case 0:
      answer.push({
        id: id,
      });
      break;
    default:
      while (start <= end) {
        // in case of big num
        // => don't use (end + start) / 2
        mid = Math.floor((end - start) / 2 + start);
        // console.log(start, mid, end);
        if (answer[mid].id === id) {
          start = mid;
          console.log(mid);
          break;
        }
        switch (answer[mid].id > id) {
          case true:
            end = mid - 1;
            break;
          default:
            start = mid + 1;
            break;
        }
      }
      console.log(answer);
      answer[mid].id === id
        ? answer.splice(mid, 1)
        : answer.splice(start, 0, {
            id: id,
          });
      break;
  }
  console.log(answer);
};

const MapPlay = ({ match }) => {
  // get map
  let [map, setMap] = useState({});
  // fullPara values but only show up after ready
  let [mapPara, setMapPara] = useState("");
  // loading screen while getting map
  let [isLoading, setIsLoading] = useState(true);
  let [isReady, setIsReady] = useState(true);
  let [values, setValues] = useState({
    time: 0,
    defaultTime: 0,
  });

  let student_card = document.getElementById("student-card");

  // console.log(match);
  console.time("getMap");
  async function getMap() {
    const db = firebase.firestore();
    let curMap = {};
    // get Map
    await db
      .collection("Map")
      .doc("wCj3hteHUHgCtiWl98yq")
      .get()
      .then((data) => {
        console.log(data.data().MapList[match.params.idx]);
        setMap(data.data().MapList[match.params.idx]);
        curMap = data.data().MapList[match.params.idx];
      });
    console.timeEnd("getMap");
    setIsLoading(false);
    setIsReady(false);
    ready = false;

    setValues({
      ...values,
      time: parseInt(curMap.Maptime),
      defaultTime: parseInt(curMap.Maptime),
    });

    // let studentAnswerSelector = document.getElementById('studentAnswer');
    let para = curMap.paragraph;

    console.log(para);
    let words = para.split("\n");
    console.log(`đây là từng đoạn một ${words}`);

    let fullPara = "";

    // id is start from 0
    let currentID = 0;

    // clear the old answer answer;
    // answer = [];

    for (let word of words) {
      fullPara += `<div>\n`;
      word = word.split(" ");
      for (let i = 0; i < word.length; ++i) {
        if (word[i] !== "") {
          fullPara += `\t<span id="${currentID}" class="student-para">${word[i]}</span>\n`;
          ++currentID;
          // answer.push(false);
        } else {
          //  don't count " " or "\n"
          fullPara += '\t<div style="height: 1rem"></div>';
        }
      }
      console.log(`Đây là từng từ một ${word}`);
      fullPara += `</div>\n`;
    }

    // console.log(fullPara);

    // studentAnswerSelector.innerHTML = fullPara;
    setMapPara(fullPara);
  }

  // check is ready for the counting system
  // check answer with document.querySelector
  const checkIsReady = (e) => {
    setIsReady(true);
    ready = true;
    console.log(e);
    console.log(mapPara);
    let studentAnswerSelector = document.getElementById("studentAnswer");
    studentAnswerSelector.innerHTML = mapPara;

    let start_time = new Date().getTime();

    let student_paras = document.querySelectorAll(".student-para");
    for (let p of student_paras) {
      p.addEventListener("click", (e) => {
        if (ready) {
          e.currentTarget.classList.toggle("student-selected-answer");
          binarySearchAnswerStudent(e.currentTarget.id);
          console.log("click!");
        }
      });
    }

    timer = setInterval(() => {
      let cur_time = new Date().getTime();
      let time_diff =
        values.defaultTime - Math.floor((cur_time - start_time) / 1000);

      setValues({ ...values, time: time_diff });
      /**
       * -----------------
       *  BACKGROUND SIZE
       * -----------------
       * percentage and size  || top border     - animation left  -> right
       * size percentage      || right border   - animation top   -> bottom
       * percentage size      || bottom border  - animation right -> left
       * size percentage      || left border    - animation bottm -> top
       *
       */
      // update border => to show how much time left
      const min = (a, b) => {
        return a < b ? a : b;
      };

      const max = (a, b) => {
        return a > b ? a : b;
      };

      let time_border_size = 5;

      // console.error(topBorder, rightBorder, bottomBorder, leftBorder);
      student_card.style.cssText = `background-size: ${min(
        400 - (time_diff / values.defaultTime) * 400,
        100
      )}% ${time_border_size}px, ${time_border_size}px ${min(
        max(0, 300 - (time_diff / values.defaultTime) * 400),
        100
      )}%, ${min(
        max(0, 200 - (time_diff / values.defaultTime) * 400),
        100
      )}% ${time_border_size}px, ${time_border_size}px ${min(
        max(0, 100 - (time_diff / values.defaultTime) * 400),
        100
      )}%`;

      if (time_diff <= 0) {
        console.log("end");
        ready = false;
        clearInterval(timer);
      }
    }, 20);
  };

  const submit = () => {
    ready = false;
    clearInterval(timer);
  };

  useEffect(() => {
    console.log(match);
    getMap();
  }, []);

  return (
    <div className="map--play" style={{ height: "100vh" }}>
      {isLoading && <Loading />}
      {!isReady && (
        <div className="is--ready" onClick={checkIsReady}>
          <h1 style={{ fontSize: "5rem" }}>HOW TO PLAY?</h1>
          <p>After click the screen, the timer will start running</p>
          <p>
            Click the work to select your answers, after the timer runs out or
            you click the submit button, you can't click again{" "}
          </p>
          <h5>Click on the screen to start the game</h5>
        </div>
      )}
      <Navbar />
      <div
        className="row middle-xs center-xs"
        style={{ height: "calc(100% - 6rem)" }}
      >
        <div className="col-xs-10 student-card" id="student-card">
          <Button color="primary" variant="contained" className="hint--button">
            <WbIncandescentTwoToneIcon />
          </Button>
          <div className="answerSelector" id="studentAnswer"></div>
          <div className="button-area-mapplay">
            <Button
              color="primary"
              variant="contained"
              onClick={submit}
              endIcon={<SendIcon />}
            >
              Submit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapPlay;
