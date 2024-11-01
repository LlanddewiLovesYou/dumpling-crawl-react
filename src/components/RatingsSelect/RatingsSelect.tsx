import React, { useContext } from "react";
import "./RatingsSelect.css";
import useFirebaseAuthState from "../../hooks/useFirebaseAuthState";
import { FirebaseContext } from "../../App";
import { sendReview } from "../../util/firebaseQueries";

interface Props {
  emoji: string;
  label: string;
  destination: string;
  score: number;
  refetchRatings: () => void;
}

export const RatingsSelect: React.FC<Props> = ({
  emoji,
  label,
  destination,
  refetchRatings,
  score,
}) => {
  const { user } = useFirebaseAuthState();
  const selectId = `${user.uid}-${destination}-${label}`;
  const { firestore } = useContext(FirebaseContext);
  const record = { userId: user.uid, destination, category: label };

  return (
    <div className="ratings-select">
      <label>{label}</label>
      <select
        name="ratings"
        onChange={(e) =>
          sendReview(e, firestore, selectId, record, refetchRatings)
        }
        value={score}
      >
        <option value="n/a">-</option>
        <option value="0">🚫</option>
        <option value="1">{emoji}</option>
        <option value="2">{emoji + emoji}</option>
        <option value="3">{emoji + emoji + emoji}</option>
        <option value="4">{emoji + emoji + emoji + emoji}</option>
        <option value="5">{emoji + emoji + emoji + emoji + emoji}</option>
      </select>
    </div>
  );
};
