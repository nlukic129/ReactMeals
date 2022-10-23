import { useReducer, useState } from "react";
import CartContext from "./cart-context";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cardReducer = (state, action) => {
  if (action.type === "ADD") {
    const totalAmountUpdated =
      state.totalAmount + action.item.amount * action.item.price;
    const existItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const existItem = state.items[existItemIndex];
    let updatedItems;
    if (existItem) {
      const updatedItem = {
        ...existItem,
        amount: existItem.amount + action.item.amount,
      };

      updatedItems = [...state.items];
      updatedItems[existItemIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }
    return { items: updatedItems, totalAmount: totalAmountUpdated };
  }

  if (action.type === "REMOVE") {
    const indexItemToRemove = state.items.findIndex(
      (item) => item.id === action.id
    );
    const itemToRemove = state.items[indexItemToRemove];

    const totalAmountUpdated = state.totalAmount - itemToRemove.price;

    let updatedItems;
    if (itemToRemove.amount === 1) {
      updatedItems = state.items.filter((item) => item.id !== action.id);
    } else {
      updatedItems = [...state.items];
      updatedItems[indexItemToRemove] = {
        ...itemToRemove,
        amount: itemToRemove.amount - 1,
      };
    }

    return { items: updatedItems, totalAmount: totalAmountUpdated };
  }

  if (action.type === "CLEAR") {
    return defaultCartState;
  }
  return defaultCartState;
};

const CartProvider = (props) => {
  const [cart, setCart] = useState(false);
  const [cartState, dispachCartAction] = useReducer(
    cardReducer,
    defaultCartState
  );

  const showCartHandler = () => {
    setCart(true);
  };
  const hideCartHandler = () => {
    setCart(false);
  };

  const addItemHandler = (item) => {
    dispachCartAction({ type: "ADD", item: item });
  };

  const removiItemhandler = (id) => {
    dispachCartAction({ type: "REMOVE", id: id });
  };

  const clearItemsHandler = () => {
    dispachCartAction({ type: "CLEAR" });
  };

  const Cart = {
    isCart: cart,
    showCart: showCartHandler,
    hideCart: hideCartHandler,
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemHandler,
    removeItem: removiItemhandler,
    clearItems: clearItemsHandler,
  };
  return (
    <CartContext.Provider value={Cart}>{props.children}</CartContext.Provider>
  );
};

export default CartProvider;
