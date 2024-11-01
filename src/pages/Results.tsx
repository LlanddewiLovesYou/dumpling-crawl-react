import React, { useContext, useState, useEffect } from "react";
import { getAllRestaurantRatings } from "../util/firebaseQueries";
import { FirebaseContext, RestRubricContext } from "../App";
import { Result } from "../components/Result/Result";

export const ResultsPage: React.FC = () => {
  const { firestore } = useContext(FirebaseContext);
  const { restaurants } = useContext(RestRubricContext);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const queryAverages = async () => {
      await getRatingsForAvg();
    };

    queryAverages();
  }, []);

  const getRatingsForAvg = async () => {
    const ratings = await getAllRestaurantRatings(
      firestore,
      restaurants[0].name
    );
    const ratings1 = await getAllRestaurantRatings(
      firestore,
      restaurants[1].name
    );
    const ratings2 = await getAllRestaurantRatings(
      firestore,
      restaurants[2].name
    );
    const ratings3 = await getAllRestaurantRatings(
      firestore,
      restaurants[3].name
    );
    const ratings4 = await getAllRestaurantRatings(
      firestore,
      restaurants[4].name
    );
    const ratings5 = await getAllRestaurantRatings(
      firestore,
      restaurants[5].name
    );
    const ratings6 = await getAllRestaurantRatings(
      firestore,
      restaurants[6].name
    );
    const ratings7 = await getAllRestaurantRatings(
      firestore,
      restaurants[7].name
    );
    const ratings8 = await getAllRestaurantRatings(
      firestore,
      restaurants[8].name
    );
    const ratings9 = await getAllRestaurantRatings(
      firestore,
      restaurants[9].name
    );

    setReviews([
      { restaurantName: restaurants[0].name, average: avgReview(ratings) },
      { restaurantName: restaurants[1].name, average: avgReview(ratings1) },
      { restaurantName: restaurants[2].name, average: avgReview(ratings2) },
      { restaurantName: restaurants[3].name, average: avgReview(ratings3) },
      { restaurantName: restaurants[4].name, average: avgReview(ratings4) },
      { restaurantName: restaurants[5].name, average: avgReview(ratings5) },
      { restaurantName: restaurants[6].name, average: avgReview(ratings6) },
      { restaurantName: restaurants[7].name, average: avgReview(ratings7) },
      { restaurantName: restaurants[8].name, average: avgReview(ratings8) },
      { restaurantName: restaurants[9].name, average: avgReview(ratings9) },
    ]);
  };

  const avgReview = (ratings) => {
    const calcAvg = (category) => {
      const sum = category.reduce((acc, score) => {
        return score + acc;
      }, 0);
      const avg = sum / wrapper.length;
      return avg.toFixed(1);
    };

    const wrapper = ratings
      .filter((rating) => {
        return rating.category === "Wrapper";
      })
      .map((rating) => parseInt(rating.score));
    const filling = ratings
      .filter((rating) => {
        return rating.category === "Filling";
      })
      .map((rating) => parseInt(rating.score));
    const sauce = ratings
      .filter((rating) => {
        return rating.category === "Sauce";
      })
      .map((rating) => parseInt(rating.score));
    const value = ratings
      .filter((rating) => {
        return rating.category === "Value";
      })
      .map((rating) => parseInt(rating.score));
    const bonus = ratings
      .filter((rating) => {
        return rating.category === "Bonus";
      })
      .map((rating) => parseInt(rating.score));
    return {
      wrapper: wrapper.length ? calcAvg(wrapper) : "-",
      filling: filling.length ? calcAvg(filling) : "-",
      sauce: sauce.length ? calcAvg(sauce) : "-",
      value: value.length ? calcAvg(value) : "-",
      bonus: bonus.length ? calcAvg(bonus) : "-",
    };
  };

  return (
    <>
      <h2>Current Scores</h2>
      {reviews.map((review) => {
        return (
          <Result
            restaurantName={review.restaurantName}
            average={review.average}
          />
        );
      })}
    </>
  );
};
