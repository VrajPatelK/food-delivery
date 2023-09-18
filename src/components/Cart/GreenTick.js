import React from "react";
import "./GreenTick.css"; // Import your CSS file for styling

function GreenTick() {
  return (
    <div className="tick-container">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100"
        height="100"
        viewBox="0 0 100 100"
      >
        <path
          className="tick-path"
          d="M20 50 L40 70 L80 20"
          fill="transparent"
        />
      </svg>
    </div>
  );
}

export default GreenTick;
