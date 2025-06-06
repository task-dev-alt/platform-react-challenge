import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import Select from "react-select";
import { Modal, AsyncContainer } from "../../components";
import { useCats } from "../cats/api";
import { BREED_PARAM, CAT_PARAM } from "../constants";
import { CatDetails } from "../cats";
import { BreedFilters, type FilterValues } from "./BreedFilters";
import { BreedDetails } from "./BreedDetails";
import { useBreeds } from "./api";

import type { SingleValue } from "react-select";
import type { Breed } from "../types";

const useBreedsState = () => {
  const { data: breeds, isError, isLoading } = useBreeds();

  const [searchParams, setSearchParams] = useSearchParams();
  const selectedBreedId = searchParams.get(BREED_PARAM);
  const selectedCatId = searchParams.get(CAT_PARAM);

  const [filters, setFilters] = useState<FilterValues>({});

  const isModalOpen = !!selectedBreedId && !isLoading;
  const showCatDetails = !!selectedCatId;
  const selectedBreed = breeds?.find((breed) => breed.id === selectedBreedId);

  const breedOptions =
    breeds?.map((breed) => ({
      value: breed.id,
      label: breed.name,
    })) ?? [];

  const filteredBreeds = breeds?.filter((breed) => {
    return Object.entries(filters).every(
      ([key, value]) => !value || Number(breed[key as keyof Breed]) >= value
    );
  });

  const { data: cats } = useCats({
    limit: 10,
    breedId: searchParams.get(BREED_PARAM),
  });

  const selectedCat = cats?.pages
    .flat()
    .find((cat) => cat.id === selectedCatId);

  const handleBreedClick = (breedId: string) => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      newParams.set(BREED_PARAM, breedId);
      newParams.delete(CAT_PARAM);
      return newParams;
    });
  };

  const handleCloseModal = () => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      newParams.delete(BREED_PARAM);
      newParams.delete(CAT_PARAM);
      return newParams;
    });
  };

  const handleBreedSelect = (
    option: SingleValue<(typeof breedOptions)[number]>
  ) => {
    if (option) {
      handleBreedClick(option.value);
    }
  };

  const handleFilterChange = (
    key: keyof FilterValues,
    value: number | undefined
  ) => {
    setFilters((prev) => {
      const newFilters = { ...prev };
      if (value === undefined) {
        delete newFilters[key];
      } else {
        newFilters[key] = value;
      }
      return newFilters;
    });
  };

  const handleClearFilters = () => setFilters({});

  return {
    breeds,
    filteredBreeds,
    selectedBreed,
    selectedCat,
    breedOptions,

    isError,
    isLoading,
    isModalOpen,
    showCatDetails,
    filters,

    handleBreedClick,
    handleCloseModal,
    handleBreedSelect,
    handleFilterChange,
    handleClearFilters,
  };
};

export const Breeds = () => {
  const {
    breeds,
    filteredBreeds,
    selectedBreed,
    selectedCat,
    breedOptions,
    isError,
    isLoading,
    isModalOpen,
    showCatDetails,
    filters,
    handleBreedClick,
    handleCloseModal,
    handleBreedSelect,
    handleFilterChange,
    handleClearFilters,
  } = useBreedsState();

  return (
    <div className="container mx-auto my-4">
      <h1 className="mb-4 text-2xl font-bold">Cat Breeds</h1>

      <div className="mb-6 space-y-4">
        <Select
          options={breedOptions}
          onChange={handleBreedSelect}
          isLoading={isLoading}
          isClearable
          isSearchable
          placeholder="Search for a breed..."
          className="max-w-md"
          classNames={{
            control: (state) =>
              `!border-gray-300 !shadow-sm ${
                state.isFocused ? "!border-blue-500 !ring-1 !ring-blue-500" : ""
              }`,
          }}
        />
        <BreedFilters
          filters={filters}
          onFiltersChange={handleFilterChange}
          onClearFilters={handleClearFilters}
        />
      </div>

      <AsyncContainer
        isLoading={isLoading}
        isError={isError}
        errorMessage="🙀 Failed to fetch cats. Please reload."
      >
        {filteredBreeds && (
          <>
            <p className="mb-4 text-sm text-gray-600">
              Showing {filteredBreeds.length} of {breeds?.length} breeds
            </p>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {filteredBreeds.map((breed) => (
                <div
                  key={breed.id}
                  onClick={() => handleBreedClick(breed.id)}
                  className="p-4 transition-colors duration-200 border rounded-lg cursor-pointer hover:bg-gray-50"
                >
                  {breed.image && (
                    <img
                      src={breed.image.url}
                      alt={breed.name}
                      className="object-cover w-full h-48 mb-4 rounded"
                    />
                  )}
                  <h2 className="text-xl font-semibold">{breed.name}</h2>
                  <p className="mt-2 text-gray-600 line-clamp-2">
                    {breed.description}
                  </p>
                </div>
              ))}
            </div>
          </>
        )}
      </AsyncContainer>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <div className="w-full">
          {showCatDetails ? (
            <div>
              <CatDetails selectedCat={selectedCat} />
            </div>
          ) : (
            <BreedDetails selectedBreed={selectedBreed} />
          )}
        </div>
      </Modal>
    </div>
  );
};
