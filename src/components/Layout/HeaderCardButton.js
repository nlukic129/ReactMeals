import React from "react";
import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCardButton.module.css";
import { useContext, useEffect, useState } from "react";
import CartContext from "../../context/cart-context";

const HeaderCardButton = (props) => {
  const ctx = useContext(CartContext);
  const { items } = ctx;
  const [btnIsHighlited, setButtonIsHighlited] = useState(false);
  const numberOfCartItems = items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);

  const btnClasses = `${classes.button} ${btnIsHighlited ? classes.bump : ""}`;

  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setButtonIsHighlited(true);

    const timer = setTimeout(() => {
      setButtonIsHighlited(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [items]);
  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCardButton;
