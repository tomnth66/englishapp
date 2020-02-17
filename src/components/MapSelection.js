import React, { Component } from "react";
import "../css/MapSelection.css";
import Mapcard from "./Mapcard.js";

export default class MapSelection extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="MapSelection">
        <div className="MapSelectionInside">
          <Mapcard title="vocab"></Mapcard>
          <Mapcard title="grammar"></Mapcard>
          <Mapcard title="vocab and grammar"></Mapcard>
          <Mapcard title="logic"></Mapcard>
        </div>
      </div>
    );
  }
}
