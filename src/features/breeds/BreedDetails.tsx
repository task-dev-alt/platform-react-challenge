import { ErrorMessage, LoadingSpinner } from "../../components";
import { Cats } from "../cats";
import type { Breed } from "../types";
import { useBreeds } from "./api";

type BreedDetailsProps = {
  selectedBreed?: Breed;
};

export const BreedDetails = ({ selectedBreed }: BreedDetailsProps) => {
  const { isLoading } = useBreeds();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!selectedBreed) {
    return <ErrorMessage message="No breed selected." />;
  }

  return (
    <div className="max-h-[80vh] overflow-y-auto p-4">
      <div className="mb-6">
        <h2 className="mb-2 text-2xl font-bold">{selectedBreed.name}</h2>
        <p className="text-gray-600">{selectedBreed.description}</p>
      </div>

      <div className="mt-8">
        <Cats
          breedId={selectedBreed.id}
          title="Cats of this breed"
          infiniteScroll={false}
        />
      </div>
    </div>
  );
};
