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

// import css
// import "../css/MapPlay.css"

const MapPlay = ({ match }) => {
  // get map
  let [map, setMap] = useState({});
  // fullPara values but only show up after ready
  let [mapPara, setMapPara] = useState("");
  // loading screen while getting map
  let [isLoading, setIsLoading] = useState(true);
  let [isReady, setIsReady] = useState(true);
  let [values, setValues] = useState({
    score: 10,
    time: 0,
    defaultTime: 0,
  });
  let timer = new TaskTimer(1000);

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
    // let myTimer = setInterval(() => {
    // 	setValues({ ...values, time: --values.time });
    // }, 1000);
    timer.add({
      id: `${match.params.id}`,
      tickDelay: 1,
      totalRuns: values.defaultTime,
      callback(task) {
        setValues({ ...values, time: --values.time });
        console.log(`${task.id} task has run ${task.currentRuns} times.`);

        // only check answer when task is running
        let student_paras = document.querySelectorAll(".student-para");
        for (let p of student_paras) {
          p.addEventListener("click", (e) => {
            e.currentTarget.classList.toggle("student-selected-answer");
          });
        }
      },
    });
    timer.start();
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
        <div className="col-xs-10 student-card">
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
      <div className="map--bar">
        <Button
          className="clue--btn"
          variant="contained"
          color="primary"
          endIcon={<WbIncandescentTwoToneIcon />}
        >
          {`C l u e`}
        </Button>
        <div className="point--container">
          <span style={{ left: "0.5rem" }}>{`POINT: ${values.score}`}</span>
          <div
            className="point--status"
            style={{ width: `${0 + values.score}%` }}
          ></div>
        </div>
        <div className="time--container">
          <span style={{ right: "0.5rem" }}>{`${values.time}s`}</span>
          <div
            className="time--status"
            style={{ width: `${(values.time / values.defaultTime) * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default MapPlay;
