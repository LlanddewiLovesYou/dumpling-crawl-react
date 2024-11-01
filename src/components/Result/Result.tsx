import React from "react";
import { Result as ResultType } from "../../types";
import "../../App.css";
import "./Result.css";

interface Props {
  result?: ResultType;
}

export const Result: React.FC<Props> = ({ result }) => {
  console.log({ result });
  return (
    <div>
      <div className="restaurant-name">{result.restaurantName}</div>
      <div className="ratings">
        <div>
          <label>Wrapper:</label>
          <div>{result.average.wrapper}</div>
        </div>
        <div>
          <label>Filling:</label>
          <div>{result.average.filling}</div>
        </div>
        <div>
          <label>Sauce:</label>
          <div>{result.average.sauce}</div>
        </div>
        <div>
          <label>Value:</label>
          <div>{result.average.value}</div>
        </div>
        <div>
          <label>Bonus:</label>
          <div>{result.average.bonus}</div>
        </div>
      </div>
    </div>
  );
};
