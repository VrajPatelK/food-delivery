import classes from "./Input.module.css";
import React from "react";

const Input = (props) => {
  return (
    <div className={classes.input}>
      <label htmlFor={props.input.id}>{props.label}</label>

      {/*automatically add the <key:value> pair from "input obj." */}
      <input {...props.input} />
    </div>
  );
};

export default Input;
