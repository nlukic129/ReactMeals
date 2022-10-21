import { createContext } from "react";

const CartContext = createContext({
  isCart: false,
  showCart: () => {},
  hideCart: () => {},
  items: [],
  totalAmount: 0,
  addItem: () => {},
  removeItem: () => {},
});

export default CartContext;
