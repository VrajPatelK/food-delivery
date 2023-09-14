import React, { Fragment } from "react";
import headImg from "../../assets/meals.jpg";
import HeaderCartBtn from "./HeaderCartBtn";

import classes from "./Header.module.css";

const Header = (props) => {
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>ReactMeals</h1>
        {/* <button>Cart</button> */}
        <HeaderCartBtn onShownCart={props.onShow} />
      </header>
      <div className={classes["main-image"]}>
        <img src={headImg} alt="a table for delicious food!" />
      </div>
    </Fragment>
  );
};

export default Header;
