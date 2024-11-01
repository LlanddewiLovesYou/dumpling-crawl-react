import React from "react";
import { Result as ResultType } from "../../types";
import "../../App.css";
import "./Result.css";

interface Props {
  result?: ResultType;
}

export const Result: React.FC<Props> = ({ result }) => {
  const colorRating = (score) => {
    if (score > 4.0) {
      return "green";
    } else if (score < 2.0) {
      return "red";
    } else {
      return null;
    }
  };
  return (
    <div>
      <div className="restaurant-name">{result.restaurantName}</div>
      <div className="ratings">
        <div>
          <label>Wrapper:</label>
          <div className={colorRating(result.average.wrapper)}>
            {result.average.wrapper}
          </div>
        </div>
        <div>
          <label>Filling:</label>
          <div className={colorRating(result.average.filling)}>
            {result.average.filling}
          </div>
        </div>
        <div>
          <label>Sauce:</label>
          <div className={colorRating(result.average.sauce)}>
            {result.average.sauce}
          </div>
        </div>
        <div>
          <label>Value:</label>
          <div className={colorRating(result.average.value)}>
            {result.average.value}
          </div>
        </div>
        <div>
          <label>Bonus:</label>
          <div className={colorRating(result.average.bonus)}>
            {result.average.bonus}
          </div>
        </div>
      </div>
    </div>
  );
};
