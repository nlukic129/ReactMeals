import { createContext } from "react";

const CartContext = createContext({
  isCart: false,
  showCart: () => {},
  hideCart: () => {},
  items: [],
  totalAmount: 0,
  addItem: () => {},
  removeItem: () => {},
  clearItems: () => {},
});

export default CartContext;
