import { Fragment, useContext } from "react";
import classes from "./Header.module.css";
import mealsImage from "../../assets/meals.jpg";
import HeaderCardButton from "./HeaderCardButton";
import CartContext from "../../Context/cart-context";

const Header = (props) => {
  const ctx = useContext(CartContext);

  return (
    <Fragment>
      <header className={classes.header}>
        <h1>ReactMeals</h1>
        <HeaderCardButton showCart={ctx.showCart} />
      </header>
      <div className={classes["main-image"]}>
        <img src={mealsImage} alt="A table full delicious food" />
      </div>
    </Fragment>
  );
};

export default Header;
