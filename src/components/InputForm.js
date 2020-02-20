import React from "react";
import "../css/InputForm.css";

const InputForm = ({ label, className }) => {
	const checkTyping = () => {
		console.log("test");
		if (document.getElementById("input").value !== "") {
			document.querySelector(".content").classList.add("typing");
		} else {
			document.querySelector(".content").classList.remove("typing");
		}
	}

  return (
    // add extra class to div if necessary
    // example like control the with of the input form
    <div className={`form ${className}`} onMouseMove={checkTyping}>
      {/* use the name as the label
					should not use common label for the name
			 */}
      <input type="text" name={label} autoComplete="off" id="input" />
      <label for={label} className="label">
        <span className="content">{label}</span>
      </label>
    </div>
  );
};

export default InputForm;
