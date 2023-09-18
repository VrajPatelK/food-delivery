import React, { useEffect, useState } from "react";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import Loader from "../Loader/Loader";

import classes from "./AvailableMeals.module.css";

// const DUMMY_MEALS = [
//   {
//     id: "m1",
//     name: "Sushi",
//     description: "Finest fish and veggies",
//     price: 22.99,
//   },
//   {
//     id: "m2",
//     name: "Schnitzel",
//     description: "A german specialty!",
//     price: 16.5,
//   },
//   {
//     id: "m3",
//     name: "Barbecue Burger",
//     description: "American, raw, meaty",
//     price: 12.99,
//   },
//   {
//     id: "m4",
//     name: "Green Bowl",
//     description: "Healthy...and green...",
//     price: 18.99,
//   },
// ];

const AvailableMeals = () => {
  //
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState(undefined);

  //on load fetch (only for the first time)
  useEffect(() => {
    //fetch API
    const fetchMeals = async () => {
      //
      setIsLoading(true);

      const response = await fetch(
        "https://food-delivery-d6f27-default-rtdb.firebaseio.com/meals.json"
      );

      //check err!!🙄
      if (!response.ok)
        throw new Error("Server Error : Someting went wrong !!! 🙄🙄");

      //
      const data = await response.json();

      let extractMeals = [];
      for (const key in data) {
        extractMeals.push({
          id: key,
          name: data[key].name,
          description: data[key].description,
          price: data[key].price,
        });
      }

      //
      setMeals(extractMeals);
      setIsLoading(false);
    };

    fetchMeals().catch((error) => {
      setIsLoading(false);
      setErr(error.message);
    });
  }, []);

  if (err) {
    return (
      <section>
        <p className={classes["server-err"]}>
          <i>{err}</i>
        </p>
      </section>
    );
  }

  //content checking
  if (isLoading)
    return (
      <section>
        <Loader msg="Loading..." />
      </section>
    );

  if (meals.length === 0)
    return (
      <section>
        <p className={classes["not-fnd"]}>
          <i>Meals not found</i>
        </p>
      </section>
    );

  //
  const mealList = meals.map((meal) => (
    <MealItem
      id={meal.id}
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    ></MealItem>
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
