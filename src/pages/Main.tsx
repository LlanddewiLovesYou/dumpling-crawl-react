import React, { useContext, useState } from "react";

import { Destination } from "../components/Destination/Destination";
import { RestRubricContext } from "../App";

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
        onClick={() =>
          currentRestaurant > 0
            ? setCurrentRestaurant(currentRestaurant - 1)
            : null
        }
      >
        ⬅️
      </button>
      <button
        onClick={() =>
          currentRestaurant < restaurants.length - 1
            ? setCurrentRestaurant(currentRestaurant + 1)
            : null
        }
      >
        ➡️
      </button>
    </>
  );
};
