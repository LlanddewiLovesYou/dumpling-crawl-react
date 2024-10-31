import React from "react";
import { RatingsSelect } from "../RatingsSelect/RatingsSelect";
import { Restaurant } from "../../types";
import "./Destination.css";
import { useDestinationRatings } from "../../hooks/useDestinationRatings";

interface Props {
  restaurant: Restaurant;
  rubric: string[];
}

export const Destination: React.FC<Props> = ({ restaurant, rubric }) => {
  const { scores, fetchRatings } = useDestinationRatings(restaurant);
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
              fetchRatings={fetchRatings}
              score={scores[cat.toLocaleLowerCase()]}
            />
          );
        })}
      </div>
      {/* <label htmlFor="notes">Notes 📝</label>
      <textarea name="notes" id="notes"></textarea> */}
    </div>
  );
};
