import { useRef } from "react";
import Input from "../../UI/Input";
import classes from "./MealItemForm.module.css";

const MealItemForm = (props) => {
  const amountInputRef = useRef();

  const submitAddMealHandler = (event) => {
    event.preventDefault();

    if (amountInputRef.current.value < 0 || amountInputRef.current.value > 5) {
      return;
    }

    props.onAddToCart(amountInputRef.current.value);
  };

  return (
    <form className={classes.form} onSubmit={submitAddMealHandler}>
      <Input
        ref={amountInputRef}
        label="Amount"
        input={{
          id: props.id,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />

      <button>+ Add</button>
    </form>
  );
};

export default MealItemForm;
