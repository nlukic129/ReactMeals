import MealItem from "./MealItem/MealItem";
import classes from "./AveilableMeals.module.css";
import Card from "../UI/Card";

const AveilableMeals = (props) => {
  const meals = props.meals;
  const hasMeals = meals.length > 0;

  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return hasMeals ? (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  ) : (
    <p>No meals</p>
  );
};

export default AveilableMeals;
