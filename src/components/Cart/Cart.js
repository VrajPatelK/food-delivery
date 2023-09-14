import React from "react";

import classes from "./Cart.module.css";

const Cart = () => {
  const cartItems = [{ id: "c1", name: "Sudhi", amount: 2, price: 12.99 }].map(
    (item) => <li>{item.name}</li>
  );

  return (
    <div>
      <ul>{cartItems}</ul>
      <div>
        <span>Total Amount</span>
        <span>35.62</span>
      </div>
      <div className={classes.actions}>
        <button className={classes["button--alt"]}>Close</button>
        <button className={classes.button}>Order</button>
      </div>
    </div>
  );
};

export default Cart;
