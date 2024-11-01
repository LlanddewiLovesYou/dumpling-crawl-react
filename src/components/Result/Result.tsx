import React from "react";
import "../../App.css";
import "./Result.css";

type Result = {
  restaurantName: string;
  review: Record<string, string | number>;
};

interface Props {
  restaurantName: string;
  average: Result;
}

export const Result: React.FC<Props> = ({ restaurantName, average }) => {
  return (
    <div>
      <div className="restaurant-name">{restaurantName}</div>
      <div className="ratings">
        <div>
          <label>Wrapper:</label>
          <div>{average.wrapper}</div>
        </div>
        <div>
          <label>Filling:</label>
          <div>{average.filling}</div>
        </div>
        <div>
          <label>Sauce:</label>
          <div>{average.sauce}</div>
        </div>
        <div>
          <label>Value:</label>
          <div>{average.value}</div>
        </div>
        <div>
          <label>Bonus:</label>
          <div>{average.bonus}</div>
        </div>

        {/* <label>Filling: {average.filling}</label>
        <label>Sauce: {average.sauce}</label>
        <label>Value: {average.value}</label>
        <label>Bonus: {average.bonus}</label> */}
      </div>
    </div>
  );
};
