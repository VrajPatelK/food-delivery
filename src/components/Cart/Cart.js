import React, { Fragment, useContext, useState } from "react";
import Modal from "../UI/Modal";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";
import GreenTick from "./GreenTick";
import Loader from "../Loader/Loader";

import classes from "./Cart.module.css";

const Cart = (props) => {
  //
  const cntx = useContext(CartContext);
  const [isCheckout, setIsCheckout] = useState(false);
  const [isOrdering, setIsOrdering] = useState(false);
  const [isOrderDone, setIsOrderDone] = useState(false);

  //
  const addItemHandler = (item) => cntx.addItem(item);
  const removeItemHandler = (id) => cntx.removeItem(id);

  //
  const cartItems = cntx.items.map((item) => (
    <CartItem
      key={item.id}
      name={item.name}
      amount={item.amount}
      price={item.price}
      onAdd={addItemHandler.bind(null, item)}
      onRemove={removeItemHandler.bind(null, item.id)}
    ></CartItem>
  ));
  //
  const orderHandler = () => setIsCheckout(true);
  //
  const checkoutHandler = async (user) => {
    //
    setIsOrdering(true);

    //post the oreder-details
    await fetch(`${process.env.REACT_APP_FIREBASE_URL}/orders.json`, {
      method: "POST",
      body: JSON.stringify({
        user: user,
        items: cntx.items,
      }),
      headers: { "Content-Type": "application/json" },
    });
    setIsOrdering(false);
    setIsCheckout(true);
    setIsOrderDone(true);

    //
    cntx.clearCart(); //clear cart
  };
  //
  const successCloseHandler = () => {
    setIsOrderDone(false);
    props.onHide();
  };

  //
  let totalAmount = `$${cntx.totalAmount.toFixed(2)}`;
  const Bill = (
    <Fragment>
      <ul className={classes["cart-items"]}>{cartItems}</ul>
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
    </Fragment>
  );
  const ModalButtons = (
    <Fragment>
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onHide}>
          Close
        </button>
        {cntx.items.length > 0 && (
          <button className={classes.button} onClick={orderHandler}>
            Order
          </button>
        )}
      </div>
    </Fragment>
  );
  //
  const CheckoutForm = (
    <Fragment>
      <hr />
      <Checkout onCancel={props.onHide} onConfirm={checkoutHandler} />
    </Fragment>
  );
  //
  const OrderLoader = <Loader msg="Ordering..." />;
  //
  const successMsg = (
    <Fragment>
      {/* <p style={{ background: "#3eca68", color: "#008829" }}>
        Order Is Done!!! ✅
      </p> */}
      <GreenTick />
      <div className={classes.actions}>
        <button className={classes.button} onClick={successCloseHandler}>
          Close
        </button>
      </div>
    </Fragment>
  );

  //
  return (
    <Modal>
      {!isOrdering && !isOrderDone && Bill}
      {!isCheckout && !isOrdering && ModalButtons}
      {isCheckout && !isOrdering && !isOrderDone && CheckoutForm}
      {isCheckout && isOrdering && OrderLoader}
      {isOrderDone && successMsg}
    </Modal>
  );
};

export default Cart;
