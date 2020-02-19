import React, { useState } from "react";
import "../css/CreateMap.css";
import Button from "../components/Button";
import Navbar from "../components/Navbar";
import Flippy, { FrontSide, BackSide } from "react-flippy";
import "flexboxgrid";

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

  const returnAnswerSelector = () => {
    flipCard();
    let answerSelectorArea = document.getElementById("answerSelector");
    let para = document.getElementById("inputArea").value;
    console.log(para);
    let words = para.split("\n");
    console.log(words);

    let fullPara = "";

    for (let word of words) {
      fullPara += `<div>\n`;
      word = word.split(" ");
      for (let i = 0; i < word.length; ++i) {
        if (word[i] != "")
          fullPara += `\t<span class="teacher-para">${word[i]}</span>\n`;
        else {
          fullPara += '\t<div style="height: 1rem"></div>';
        }
      }
      console.log(word);
      fullPara += `</div>\n`;
    }

    console.log(fullPara);

    answerSelectorArea.innerHTML = fullPara;

    let teacher_paras = document.querySelectorAll(".teacher-para");
    for (let p of teacher_paras) {
      p.addEventListener("click", e => {
        console.log(p);
        e.currentTarget.classList.toggle("selected-answer");
      });
    }
  };

  const submit = () => {
    console.log("submitting...");
  };

  return (
    <div style={{ height: "100vh" }}>
      <Navbar />
      <div
        className="row middle-xs center-xs"
        style={{ height: "calc(100% - 4rem)" }}
      >
        <div className="col-xs-10" style={{ height: "80%" }}>
          <Flippy
            flipOnHover={false} // default false
            flipOnClick={false} // default false
            flipDirection="horizontal" // horizontal or vertical
            isFlipped={flip}
            className="box input-container"
            style={{ height: "100%" }}
          >
            <FrontSide>
              <textarea id="inputArea"></textarea>
              <div className="button-area">
                <input
                  type="file"
                  id="FileReader"
                  onChange={importFile}
                  style={{ display: "none" }}
                />
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
