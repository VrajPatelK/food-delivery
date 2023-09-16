import classes from "./Input.module.css";
import React, { forwardRef } from "react";

const Input = forwardRef((props, ref) => {
  return (
    <div className={classes.input}>
      <label htmlFor={props.input.id}>{props.label}</label>

      {/*automatically add the <key:value> pair from "input obj." */}
      <input ref={ref} {...props.input} />
    </div>
  );
});

export default Input;
