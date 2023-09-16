import React, { useContext } from "react";
import Modal from "../UI/Modal";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";

import classes from "./Cart.module.css";

const Cart = (props) => {
  //
  const cntx = useContext(CartContext);

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
  const totalAmount = `$${cntx.totalAmount.toFixed(2)}`;

  //
  return (
    <Modal>
      <ul className={classes["cart-items"]}>{cartItems}</ul>
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onHide}>
          Close
        </button>
        {cntx.items.length > 0 && (
          <button className={classes.button}>Order</button>
        )}
      </div>
    </Modal>
  );
};

export default Cart;
