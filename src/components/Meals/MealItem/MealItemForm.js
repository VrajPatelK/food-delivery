import React, { useRef, useState } from "react";
import Input from "../../UI/Input";

import classes from "./MealItemForm.module.css";

const MealItemForm = (props) => {
  //
  const amountInputRef = useRef();
  const [amountIsValid, setAmountIsValid] = useState(true);

  //
  const submitHandler = (e) => {
    e.preventDefault();

    const enteredAmount = amountInputRef.current.value; // amount means qunatity
    const enteredAmountNum = +enteredAmount; // '+' it is used for converting the amount in to the number. (ref always caryy the the value in fomr of thr string, even if type="number" in <input .../>)

    // check whether it is valid or not ?
    if (
      enteredAmount.trim().length === 0 ||
      enteredAmountNum < 1 ||
      enteredAmountNum > 5
    ) {
      setAmountIsValid(false);
      return;
    }

    //on valid input
    props.onAddToCart(enteredAmountNum); // here, we only call this funciton. we don't call the cntx.addToItem().bcz here, we have not all the info. about that particular item. so we go on parent(MealItem) comp. where, all the info. of particular item is available.
  };

  //
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        ref={amountInputRef}
        label="Amount"
        input={{
          id: "amount_" + props.id, //#imp (id must be unique.)
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      ></Input>
      <button type="submit">+ Add</button>
      {!amountIsValid && <p>Please enter a valid amount (1-5).</p>}
    </form>
  );
};

export default MealItemForm;
