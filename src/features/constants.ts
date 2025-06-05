import type { Breed } from "./types";

export const CAT_PARAM = "cat_id";
export const BREED_PARAM = "breed_id";

export const BREED_CHARACTERISTICS: Array<
  keyof Pick<
    Breed,
    | "adaptability"
    | "affection_level"
    | "child_friendly"
    | "dog_friendly"
    | "energy_level"
    | "grooming"
    | "health_issues"
    | "intelligence"
    | "shedding_level"
    | "social_needs"
    | "stranger_friendly"
    | "vocalisation"
  >
> = [
  "adaptability",
  "affection_level",
  "child_friendly",
  "dog_friendly",
  "energy_level",
  "grooming",
  "health_issues",
  "intelligence",
  "shedding_level",
  "social_needs",
  "stranger_friendly",
  "vocalisation",
] as const;
