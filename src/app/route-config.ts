import { Cats } from "../features/cats";
import { Breeds } from "../features/breeds/Breeds";
import { FavouriteCats } from "../features/cats/FavouriteCats";

export type RouteConfig = {
  path: string;
  label: string;
  Element: React.ComponentType;
};

export const routes: RouteConfig[] = [
  {
    path: "/",
    label: "Cats",
    Element: Cats,
  },
  {
    path: "/breeds",
    label: "Breeds",
    Element: Breeds,
  },
  {
    path: "/favourites",
    label: "Favourites",
    Element: FavouriteCats,
  },
];
