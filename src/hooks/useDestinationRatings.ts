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

  const refetchRatings = useCallback(async () => {
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
    refetchRatings();
  }, [destination, refetchRatings]);

  return { refetchRatings, scores: { wrapper, filling, sauce, value, bonus } };
};
