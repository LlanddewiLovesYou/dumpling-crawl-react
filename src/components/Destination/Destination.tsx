import React from "react";
import { useContext } from "react";
import { FirebaseContext } from "../../App";
import { RatingsSelect } from "../RatingsSelect/RatingsSelect";
import { Restaurant } from "../../types";
import { useDestinationRatings } from "../../hooks/useDestinationRatings";
import { sendNotes } from "../../util/firebaseQueries";
import useFirebaseAuthState from "../../hooks/useFirebaseAuthState";
import "./Destination.css";

interface Props {
  restaurant: Restaurant;
  rubric: string[];
}

export const Destination: React.FC<Props> = ({ restaurant, rubric }) => {
  const { scores, refetchRatings, notes, refetchNotes, setNotes } =
    useDestinationRatings(restaurant);
  const { user } = useFirebaseAuthState();
  const selectId = `${user.uid}-${restaurant.name}`;
  const { firestore } = useContext(FirebaseContext);
  const record = {
    userId: user.uid,
    destination: restaurant.name,
  };
  console.log({ notes });
  return (
    <div className="destination">
      <a className="restaurant-name" href={restaurant.mapUrl}>
        {restaurant.name} 📌
      </a>
      <div className="selects">
        {rubric.map((cat) => {
          return (
            <RatingsSelect
              emoji="🥟"
              label={cat}
              destination={restaurant.name}
              refetchRatings={refetchRatings}
              score={scores[cat.toLocaleLowerCase()]}
            />
          );
        })}
      </div>
      <form
        onSubmit={(e) =>
          sendNotes(e, firestore, selectId, record, refetchNotes, notes)
        }
      >
        <label htmlFor="notes">Notes 📝</label>
        <textarea
          name="notes"
          id="notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        ></textarea>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};
