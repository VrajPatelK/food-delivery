import React, { useContext } from "react";
import CartIcon from "../Cart/CartIcon";
import CartContext from "../../store/cart-context";

import classes from "./HeaderCartBtn.module.css";

const HeaderCartBtn = (props) => {
  //
  const cntx = useContext(CartContext);

  //
  let totalCartItems = cntx.items.reduce((toalItems, item) => {
    return toalItems + item.amount;
  }, 0);

  //
  return (
    <button className={classes.button} onClick={props.onShownCart}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{totalCartItems}</span>
    </button>
  );
};

export default HeaderCartBtn;
