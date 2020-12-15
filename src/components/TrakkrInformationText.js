import React from "react";

import { ReactComponent as DataImage } from "../img/data_img.svg";

import "../css/TrakkrInformationText.css";

const TrakkrInformationText = () => {
  return (
    <div className="column-container">
      <div className="left-column">
        <DataImage />
      </div>
      <div className="right-column">
        <h2>What is Trakkr?</h2>
        <h3>
          Trakker uses public data to track covid cases and related news from
          around the world. The data might not be 100% accurate, but it should
          give the user some information regarding the state of covid around the
          world.
        </h3>
      </div>
    </div>
  );
};

export default TrakkrInformationText;
