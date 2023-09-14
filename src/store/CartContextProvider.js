import React from "react";
import CartContext from "./cart-context";

const CartContextProvider = (props) => {
  const cartContextInitial = {
    items: [],
    totalAmount: 0,
    addItem: (item) => {},
    removeItem: (id) => {},
  };

  return (
    <CartContext.Provider value={cartContextInitial}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
