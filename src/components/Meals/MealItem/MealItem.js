import React, { useContext } from "react";
import MealItemForm from "./MealItemForm";
import CartContext from "../../../store/cart-context";

import classes from "./MealItem.module.css";

const MealItem = (props) => {
  //
  const price = `$${props.price.toFixed(2)}`;

  //
  const cntx = useContext(CartContext);
  const addToCartHandler = (amount) => {
    const newItem = {
      id: props.id,
      name: props.name,
      amount: amount,
      price: props.price,
      // description: props.description, --> we have no need to pass the descr. bcz it will not be used by us at this moment.
    };

    cntx.addItem(newItem);
  };

  //
  return (
    <li className={classes.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}>{price}</div>
      </div>
      <div>
        <MealItemForm id={props.id} onAddToCart={addToCartHandler} />
      </div>
    </li>
  );
};

export default MealItem;
