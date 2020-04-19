import { Button, IconButton } from "@material-ui/core";
import Navbar from "../components/Navbar";
import Loading from "../components/Loading";
import React, { useEffect, useState } from "react";
import firebase from "../firebase.js";
import { TaskTimer } from "tasktimer";
import WbIncandescentTwoToneIcon from "@material-ui/icons/WbIncandescentTwoTone";
import SendIcon from "@material-ui/icons/Send";
import "flexboxgrid";
import "../css/MapPlay.css";

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

  let timer = new TaskTimer(1000);
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

    // clear the old answer correctAnswer;
    // correctAnswer = [];

    for (let word of words) {
      fullPara += `<div>\n`;
      word = word.split(" ");
      for (let i = 0; i < word.length; ++i) {
        if (word[i] !== "") {
          fullPara += `\t<span id="${currentID}" class="student-para">${word[i]}</span>\n`;
          ++currentID;
          // correctAnswer.push(false);
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
    console.log(e);
    console.log(mapPara);
    let studentAnswerSelector = document.getElementById("studentAnswer");
    studentAnswerSelector.innerHTML = mapPara;
    // timer.add({
    //   id: `${match.params.id}`,
    //   tickDelay: 1,
    //   totalRuns: values.defaultTime,
    //   callback(task) {
    //   }
    // });
    timer.start();
    timer.on("tick", () => {
      // console.log("tick count: " + timer.tickCount);
      // console.log("elapsed time: " + timer.time.elapsed + " ms.");
      console.log(values.defaultTime * 1000, timer.time.elapsed);
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

      // console.error(topBorder, rightBorder, bottomBorder, leftBorder);
      student_card.style.cssText = `background-size: ${min(
        400 - (values.time / values.defaultTime) * 400,
        100
      )}% 3px, 3px ${min(
        max(0, 300 - (values.time / values.defaultTime) * 400),
        100
      )}%, ${min(
        max(0, 200 - (values.time / values.defaultTime) * 400),
        100
      )}% 3px, 3px ${min(
        max(0, 100 - (values.time / values.defaultTime) * 400),
        100
      )}%`;
      console.error((values.time / values.defaultTime) * 100);

      setValues({
        ...values,
        time: --values.time,
      });

      // edit css second time after update values.time for better animation
      student_card.style.cssText = `background-size: ${min(
        400 - (values.time / values.defaultTime) * 400,
        100
      )}% 3px, 3px ${min(
        max(0, 300 - (values.time / values.defaultTime) * 400),
        100
      )}%, ${min(
        max(0, 200 - (values.time / values.defaultTime) * 400),
        100
      )}% 3px, 3px ${min(
        max(0, 100 - (values.time / values.defaultTime) * 400),
        100
      )}%`;
      console.error((values.time / values.defaultTime) * 100);

      // only check answer when task is running
      let student_paras = document.querySelectorAll(".student-para");
      for (let p of student_paras) {
        p.addEventListener("click", (e) => {
          e.currentTarget.classList.toggle("student-selected-answer");
        });
      }
      if (timer.tickCount >= values.defaultTime) timer.stop();
    });
  };

  const submit = () => {};

  useEffect(() => {
    console.log(match);
    getMap();
  }, []);

  return (
    <div className="map--play" style={{ height: "100vh" }}>
      {isLoading && <Loading />}
      {!isReady && (
        <div className="is--ready" onClick={checkIsReady}>
          <h1 style={{ fontSize: "5rem" }}>R E A D Y ?</h1>
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
          <div className="button-area">
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

// width: 2rem;
//     border-radius: 50%;
//     min-width: 2rem !important;
//     height: 2rem;
//     padding: 0.5rem;
//     box-sizing: content-box;
//     position: absolute;
//     left: 0;
//     top: 0;
// }
