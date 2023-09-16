import React, { useContext, useEffect, useState } from "react";
import CartIcon from "../Cart/CartIcon";
import CartContext from "../../store/cart-context";

import classes from "./HeaderCartBtn.module.css";

const HeaderCartBtn = (props) => {
  //
  const cntx = useContext(CartContext);
  const { items } = cntx;

  const [isCartManipulated, setIsCartManipulated] = useState(false);

  // make class
  const btnClases = `${classes.button} ${
    isCartManipulated ? classes.bump : ""
  }`;

  //
  let totalCartItems = items.reduce((toalItems, item) => {
    return toalItems + item.amount;
  }, 0);

  // console.log(isCartManipulated);

  useEffect(() => {
    //add the "bump" class
    if (items.length === 0) return; // on page load && cartItms[] is empty then ot should not work.

    setIsCartManipulated(true);

    //
    // here, we set 300ms bcz in css we perfrom this "bump" animation for 300 ms. U can see in css file
    let timer = setTimeout(() => {
      setIsCartManipulated(false); // after 300 ms we remove the "bump" class. You can put also value less than 300ms. It is upto you.
    }, 100);

    // cleaner
    return () => {
      clearTimeout(timer);
    }; // if we frequently add the items then previous timer should be removed. so, clear funciton is mandatory.
  }, [items]);

  //
  return (
    <button className={btnClases} onClick={props.onShownCart}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{totalCartItems}</span>
    </button>
  );
};

export default HeaderCartBtn;
