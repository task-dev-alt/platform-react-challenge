import { useNavigate, useSearchParams } from "react-router-dom";
import { Button, ErrorMessage, LoadingText, Rating } from "../../components";
import {
  CAT_PARAM,
  BREED_CHARACTERISTICS as BREED_CHARACTERISTICS,
} from "../constants";
import { capitalizeWords } from "../../utils";
import {
  useAddFavouriteCat,
  useCatDetails,
  useFavouriteCats,
  useRemoveFavouriteCat,
} from "./api";

import type { Breed, Cat } from "../types";

type CatDetailsProps = {
  selectedCat?: Cat;
};

export const CatDetails = ({ selectedCat }: CatDetailsProps) => {
  const [searchParams] = useSearchParams();
  const catId = searchParams.get(CAT_PARAM)!;

  const navigate = useNavigate();

  const handleBreedClick = (breedId: Breed["id"]) => {
    navigate({
      pathname: "/breeds",
      search: `?breed_id=${breedId}`,
    });
  };

  const {
    data: cat,
    isLoading: isCatLoading,
    isError: isCatError,
  } = useCatDetails(catId);

  const {
    data: favouriteCats,
    isLoading: isFavouriteCatsLoading,
    isFetching: isFavouriteCatsFetching,
  } = useFavouriteCats();

  // We pass the selected cat but sometimes it doesn't have all the details
  // so we also fetch the cat details and use that if available
  const catDetails = cat ?? selectedCat;

  const favouriteId = favouriteCats?.find(
    (favouriteCat) => favouriteCat.id === catDetails?.id
  )?.favouriteId;

  const { mutate: addFavourite, isPending: isAddPending } =
    useAddFavouriteCat();

  const { mutate: removeFavourite, isPending: isRemovePending } =
    useRemoveFavouriteCat();

  // We can optimize this by optimistically updating the UI as soon as the user clicks
  // the button, but for simplicity we will just disable the button while the operation is in progress
  const isCatOperationInProgress =
    isFavouriteCatsFetching || isAddPending || isRemovePending;

  if (isCatLoading) {
    return <LoadingText text="😻 Meowing..." />;
  }

  if (isCatError || !catDetails) {
    return (
      <ErrorMessage message="Error loading cat details. Please reload the page." />
    );
  }

  return (
    <div className="max-h-[80vh] overflow-y-auto p-4">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="relative">
          <img
            src={catDetails.url}
            alt="Selected Cat"
            className="w-full h-auto rounded shadow-md"
          />
          {!isFavouriteCatsLoading &&
            (favouriteId ? (
              <Button
                variant="danger"
                onClick={() => removeFavourite(favouriteId)}
                className="flex items-center gap-2 mt-4"
                disabled={isCatOperationInProgress}
              >
                {isCatOperationInProgress ? (
                  <span>Removing from favourites...</span>
                ) : (
                  <span>Remove from favourites</span>
                )}
              </Button>
            ) : (
              <Button
                onClick={() => addFavourite(catDetails.id)}
                className="flex items-center gap-2 mt-4"
                disabled={isCatOperationInProgress}
              >
                <span>♥</span>
                {isCatOperationInProgress ? (
                  <span>Adding to favorites...</span>
                ) : (
                  <span>Add to Favorites</span>
                )}
              </Button>
            ))}
        </div>

        <div className="space-y-4">
          <h2 className="pb-2 text-2xl font-semibold border-b">Cat Details</h2>

          {catDetails?.breeds?.length > 0 ? (
            <div className="space-y-6">
              {catDetails.breeds.map((breed) => (
                <div
                  key={breed.id}
                  className="space-y-2 cursor-pointer"
                  onClick={() => handleBreedClick(breed.id)}
                >
                  <div className="block p-2 transition-colors duration-200 rounded-lg hover:bg-gray-50">
                    <h3 className="text-xl font-semibold text-blue-600 hover:text-blue-800">
                      {breed.name}
                    </h3>

                    {breed.description && (
                      <p className="mt-2 text-gray-600">{breed.description}</p>
                    )}

                    <div className="mt-4 space-y-2">
                      {breed.origin && (
                        <p className="text-sm text-gray-500">
                          <span className="font-medium">Origin:</span>{" "}
                          {breed.origin}
                        </p>
                      )}
                      {breed.temperament && (
                        <p className="text-sm text-gray-500">
                          <span className="font-medium">Temperament:</span>{" "}
                          {breed.temperament}
                        </p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 gap-2 mt-4">
                      {BREED_CHARACTERISTICS.map(
                        (key) =>
                          breed[key] && (
                            <Rating
                              key={key}
                              label={capitalizeWords(key)}
                              value={breed[key]}
                            />
                          )
                      )}
                    </div>
                  </div>

                  {breed.wikipedia_url && (
                    <p className="px-2 text-sm text-gray-500">
                      <span className="font-medium">Learn more: </span>
                      <a
                        href={breed.wikipedia_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline hover:text-blue-800"
                      >
                        Wikipedia
                      </a>
                    </p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="italic text-gray-500">
              No breed information available for this cat.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
