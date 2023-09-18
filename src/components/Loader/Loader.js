import React from "react";
import "./Loader.css";

// Create a Loader component
function Loader(props) {
  return (
    <div className="loader-container">
      <div className="loader"></div>
      <p>{props.msg}</p>
    </div>
  );
}

export default Loader;
