import React, { useReducer } from "react";
import CartContext from "./cart-context";

//
const cartDefaultvalue = {
  items: [],
  totalAmount: 0,
};

//
const cartReducer = (prevState, action) => {
  //
  if (action.type === "ADD_ITEM") {
    const updateTotalAmount = prevState.totalAmount + action.item.price; // amount means qunatity & totalAmount means total bill amount

    //check whether already exist or not?
    const existedIndex = prevState.items.findIndex(
      (item) => item.id === action.item.id
    );

    const existingCartItem = prevState.items[existedIndex]; // if existedIndex === -1 then it will get null
    let updateItems;

    // if not exist
    if (existingCartItem) {
      const updateItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + 1,
      };

      //
      updateItems = [...prevState.items]; // get all items from prevState
      updateItems[existedIndex] = updateItem; // replace "already existed item" with "updatedItem"
    }

    // if it is already exist
    else {
      updateItems = prevState.items.concat(action.item); // #MIMP
    }

    //finally returns.
    return {
      items: updateItems,
      totalAmount: updateTotalAmount < 0.0 ? 0.0 : updateTotalAmount,
      // sp.case : updateTotalAmount = -1.3500311979441904e-13 | updateTotalAmount.toFixed(2) = '-0.00' } | so, we need to check is it neg. or not. and if it is then set 0.0
    };
  }

  if (action.type === "REMOVE_ITEM") {
    const existedIndex = prevState.items.findIndex(
      (item) => item.id === action.id
    );

    const existingCartItem = prevState.items[existedIndex]; // if existedIndex === -1 then it will get null
    let updateTotalAmount = prevState.totalAmount - existingCartItem.price;
    let updateItems;

    // if amount === 1
    if (existingCartItem.amount === 1) {
      updateItems = prevState.items.filter((item) => {
        return item.id !== action.id;
      });
    }

    // if amount > 1
    else {
      const updateItem = {
        ...existingCartItem,
        amount: existingCartItem.amount - 1,
      };
      updateItems = [...prevState.items];
      updateItems[existedIndex] = updateItem;
    }

    // console.log(updateTotalAmount, updateTotalAmount.toFixed(2));
    //finally returns.
    return {
      items: updateItems,
      totalAmount: updateTotalAmount < 0.0 ? 0.0 : updateTotalAmount,
    };
  }

  return cartDefaultvalue;
};

const CartContextProvider = (props) => {
  //
  const [cartState, cartDispatcher] = useReducer(cartReducer, cartDefaultvalue);

  //
  const addItem = (item) => cartDispatcher({ type: "ADD_ITEM", item });
  const removeItem = (id) => cartDispatcher({ type: "REMOVE_ITEM", id });

  //
  const cartContextInitial = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItem,
    removeItem: removeItem,
  };

  return (
    <CartContext.Provider value={cartContextInitial}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
