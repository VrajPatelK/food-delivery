import React from "react";
import "./Loader.css";

// Create a Loader component
function Loader() {
  return (
    <div className="loader-container">
      <div className="loader"></div>
      <p>Loading...</p>
    </div>
  );
}

export default Loader;
