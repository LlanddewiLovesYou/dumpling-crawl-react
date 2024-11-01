import React, { useContext, useState } from "react";
import { Destination } from "../components/Destination/Destination";
import { RestRubricContext } from "../App";
import "./Main.css";

export const MainPage: React.FC = () => {
  const { restaurants, rubric } = useContext(RestRubricContext);
  const [currentRestaurant, setCurrentRestaurant] = useState(0);

  return (
    <>
      <Destination
        restaurant={restaurants[currentRestaurant]}
        rubric={rubric}
      />
      <button
        disabled={!(currentRestaurant > 0)}
        onClick={() => setCurrentRestaurant(currentRestaurant - 1)}
      >
        ⬅️ Prev Restaurant
      </button>
      <button
        disabled={!(currentRestaurant < restaurants.length - 1)}
        onClick={() => setCurrentRestaurant(currentRestaurant + 1)}
      >
        Next Restaurant ➡️
      </button>
    </>
  );
};
