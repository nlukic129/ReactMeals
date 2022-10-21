import { useContext, useEffect, useState } from "react";
import CartContext from "../../Context/cart-context";
import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCardButton.module.css";

const HeaderCardButton = (props) => {
  const ctx = useContext(CartContext);
  const { items } = ctx;
  const [btnIsHighlited, setButtonIsHighlited] = useState(false);
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
    <button className={btnClasses} onClick={props.showCart}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{items.length}</span>
    </button>
  );
};

export default HeaderCardButton;
