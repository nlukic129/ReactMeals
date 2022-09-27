import classes from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";
import { useContext } from "react";
import CartContext from "../../../context/cart-context";

const MealItem = (props) => {
  const price = `$${props.meal.price.toFixed(2)}`;
  const cartCtx = useContext(CartContext);
  const addToCartHandler = (amont) => {
    cartCtx.addItem({
      id: props.meal.id,
      name: props.meal.name,
      amount: amont,
      price: props.meal.price,
    });
  };
  return (
    <li className={classes.meal}>
      <div>
        <h3>{props.meal.name}</h3>
        <div className={classes.description}>{props.meal.description}</div>
        <div className={classes.meal.price}>{price}</div>
      </div>
      <div>
        <MealItemForm
          id={props.meal.id}
          onAddToCart={addToCartHandler}
        ></MealItemForm>
      </div>
    </li>
  );
};

export default MealItem;
