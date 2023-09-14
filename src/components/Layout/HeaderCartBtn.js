import React, { useContext } from "react";
import CartIcon from "../Cart/CartIcon";
import CartContext from "../../store/cart-context";

import classes from "./HeaderCartBtn.module.css";

const HeaderCartBtn = (props) => {
  //
  const cntx = useContext(CartContext);

  //
  return (
    <button className={classes.button} onClick={props.onShownCart}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{cntx.items.length}</span>
    </button>
  );
};

export default HeaderCartBtn;
