import { Fragment, useEffect, useState } from "react";
import useHttp from "../../hooks/use-http";
import AveilableMeals from "./AveilableMeals";
import MealsSummary from "./MealsSummary";
import classes from "./Load.module.css";
import Feedback from "../UI/Feedback";

const Meals = () => {
  const { error, isLoading, sendRequest: getMeals } = useHttp();
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    const loadedMeals = [];
    const transformMeals = (mealsObj) => {
      for (const mealKey in mealsObj) {
        loadedMeals.push({
          id: mealKey,
          description: mealsObj[mealKey].description,
          name: mealsObj[mealKey].name,
          price: mealsObj[mealKey].price,
        });
      }

      setMeals(loadedMeals);
    };

    getMeals(
      {
        url: "https://reactmeals-f6e16-default-rtdb.europe-west1.firebasedatabase.app/Meals.json",
      },
      transformMeals
    );
  }, [getMeals]);

  if (error) {
    return (
      <Fragment>
        <MealsSummary />
        <Feedback isSuccess={false}>{error}</Feedback>
      </Fragment>
    );
  }

  return (
    <Fragment>
      <MealsSummary />
      {isLoading ? (
        <div className={classes.loader}></div>
      ) : (
        <AveilableMeals meals={meals} />
      )}
    </Fragment>
  );
};

export default Meals;
