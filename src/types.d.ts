export type Restaurant = {
  name: string;
  mapUrl: string;
};

type RubricString = "wrapper" | "filling" | "sauce" | "value" | "bonus";
type Rubric = ["Wrapper", "Filling", "Sauce", "Value", "Bonus"];

export type Result = {
  restaurantName: string;
  average: Record<RubricString, string | number>;
};

type Constants = {
  restaurants: Restaurant[];
  rubric: Rubric;
};
