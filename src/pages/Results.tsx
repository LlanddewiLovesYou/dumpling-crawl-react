import React, { useContext } from "react";
import {
  getAllRestaurantRatings,
  getRatingsForRestaurantbyUser,
} from "../util/firebaseQueries";
import { FirebaseContext, RestRubricContext } from "../App";

export const ResultsPage: React.FC = () => {
  const { firestore } = useContext(FirebaseContext);
  const { restaurants, rubric } = useContext(RestRubricContext);

  const onClick = async () => {
    const ratings = await getRatingsForRestaurantbyUser(
      firestore,
      "Wu's Wonton King",
      "xhKAU26fHkdFPVYgnLAxjJWJwGC3"
    );

    console.log(ratings);

    // const ratings1 = await getAllRestaurantRatings(
    //   firestore,
    //   restaurants[0].name
    // );
    // const ratings2 = await getAllRestaurantRatings(
    //   firestore,
    //   restaurants[1].name
    // );

    // console.log({
    //   ratings1: createReview(ratings1),
    //   ratings2: createReview(ratings2),
    // });
  };

  const createReview = (ratings) => {
    const Wrapper = ratings.filter((rating) => {
      return rating.category === "Wrapper";
    });
    const Filling = ratings.filter((rating) => {
      return rating.category === "Filling";
    });
    const Sauce = ratings.filter((rating) => {
      return rating.category === "Sauce";
    });
    const Value = ratings.filter((rating) => {
      return rating.category === "Value";
    });
    const Bonus = ratings.filter((rating) => {
      return rating.category === "Bonus";
    });
    return { Wrapper, Filling, Sauce, Value, Bonus };
  };

  return (
    <>
      <h2>RESULTS PAGE</h2>
      <button onClick={onClick}>QUERY!</button>
    </>
  );
};
