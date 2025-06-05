import { AsyncContainer } from "../../components";
import { useFavouriteCats } from "./api";
import { CatGrid } from "./CatGrid";

export const FavouriteCats = () => {
  const { data, isLoading, isError } = useFavouriteCats();

  return (
    <AsyncContainer
      title="Your Favourite Cats!"
      isLoading={isLoading}
      isError={isError}
      errorMessage="🙀 Failed to fetch your favourite cats. Please reload."
    >
      {data && <CatGrid cats={data} />}
    </AsyncContainer>
  );
};
