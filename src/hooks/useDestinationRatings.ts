// takes in destination
// when dest changes it qureis for all destination/user ratings
// return the values for the five different selects
// also returns callback that knows how to can kick off refetch of queries

import { useEffect, useCallback, useState, useContext } from "react";
import { getRatingsForRestaurantbyUser } from "../util/firebaseQueries";
import useFirebaseAuthState from "./useFirebaseAuthState";
import { FirebaseContext } from "../App";

const getScoreForCategory = (ratings, category) =>
  ratings.find((rating) => rating.category === category)?.score;

export const useDestinationRatings = (destination) => {
  const { firestore } = useContext(FirebaseContext);
  const { user } = useFirebaseAuthState();
  const [wrapper, setWrapper] = useState("-");
  const [filling, setFilling] = useState("-");
  const [sauce, setSauce] = useState("-");
  const [value, setValue] = useState("-");
  const [bonus, setBonus] = useState("-");

  const fetchRatings = useCallback(async () => {
    const ratings = await getRatingsForRestaurantbyUser(
      firestore,
      destination.name,
      user.uid
    );

    const wrapperRatings = getScoreForCategory(ratings, "Wrapper");
    const fillingRatings = getScoreForCategory(ratings, "Filling");
    const sauceRatings = getScoreForCategory(ratings, "Sauce");
    const valueRatings = getScoreForCategory(ratings, "Value");
    const bonusRatings = getScoreForCategory(ratings, "Bonus");

    setWrapper(wrapperRatings ? wrapperRatings : "-");
    setFilling(fillingRatings ? fillingRatings : "-");
    setSauce(sauceRatings ? sauceRatings : "-");
    setValue(valueRatings ? valueRatings : "-");
    setBonus(bonusRatings ? bonusRatings : "-");
  }, [destination, user, firestore]);

  useEffect(() => {
    fetchRatings();
  }, [destination, fetchRatings]);

  return { fetchRatings, scores: { wrapper, filling, sauce, value, bonus } };
};
