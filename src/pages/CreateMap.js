import React, { useState } from "react";
import "../css/CreateMap.css";
import firebase from "../firebase.js";
import Button from "../components/Button";
import Navbar from "../components/Navbar";
import Flippy, { FrontSide, BackSide } from "react-flippy";
import "flexboxgrid";

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

  const submit = () => {
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
        Mapname: "tmpname",
        paragraph: para
      });

      ref
        .set({ Maplist: Maplist })
        .then(()=>{window.location.href="/";})
        // .then(() => {});

      // window.location.href="/";
    });

    // window.location.href="/";
  };

  return (
    <div style={{ height: "100vh" }}>
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
                <input type="file" id="FileReader" onChange={importFile} />
                <label htmlFor="FileReader">
                  <Button keyword="UPLOAD" icon="cloud-upload-alt" />
                </label>
                {/* change to mode select answer */}
                <label>
                  <Button
                    keyword="Next"
                    onClick={returnAnswerSelector}
                    icon="paper-plane"
                  />
                </label>
              </div>
            </FrontSide>

            <BackSide>
              <div id="answerSelector"></div>
              <div className="button-area">
                <Button keyword="back" onClick={flipCard} icon="undo-alt" />
                {/* submit to database */}
                <Button keyword="Submit" onClick={submit} icon="paper-plane" />
              </div>
            </BackSide>
          </Flippy>
        </div>
      </div>
    </div>
  );
};

export default CreateMap;
