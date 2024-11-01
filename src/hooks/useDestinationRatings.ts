import { useEffect, useCallback, useState, useContext } from "react";
import {
  getRatingsForRestaurantbyUser,
  getNotesForRestaurantbyUser,
} from "../util/firebaseQueries";
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
  const [notes, setNotes] = useState("-");

  const refetchNotes = useCallback(async () => {
    const notes = await getNotesForRestaurantbyUser(
      firestore,
      destination.name,
      user.uid
    );
    setNotes(notes.note);
  }, [destination.name, user.uid, firestore]);

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
    refetchNotes();
  }, [destination, refetchRatings, refetchNotes]);

  return {
    refetchRatings,
    refetchNotes,
    setNotes,
    notes,
    scores: { wrapper, filling, sauce, value, bonus },
  };
};
