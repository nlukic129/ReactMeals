import MealsSummary from "./MealsSummary";
import AvelableMeals from "./AveilableMeals";
import { Fragment } from "react";
const Meals = () => {
  return (
    <Fragment>
      <MealsSummary />
      <AvelableMeals />
    </Fragment>
  );
};

export default Meals;
