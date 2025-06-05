import { useEffect, useState } from "react";
import Select from "react-select";
import { Button, Collapsible } from "../../components";
import { BREED_CHARACTERISTICS } from "../constants";
import { capitalizeWords } from "../../utils";

export type FilterValues = Record<string, number | undefined>;

type BreedFiltersProps = {
  onFiltersChange: (filters: FilterValues) => void;
};

const ratingOptions = [
  { value: "", label: "Any" },
  { value: "1", label: "1+" },
  { value: "2", label: "2+" },
  { value: "3", label: "3+" },
  { value: "4", label: "4+" },
  { value: "5", label: "5+" },
];

export const BreedFilters = ({ onFiltersChange }: BreedFiltersProps) => {
  const [filters, setFilters] = useState<FilterValues>({});

  useEffect(() => {
    onFiltersChange(filters);
  }, [filters, onFiltersChange]);

  return (
    <Collapsible
      title="Filters"
      badge={Object.keys(filters).length}
      className="mb-6"
    >
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {BREED_CHARACTERISTICS.map((key) => (
          <div key={key} className="space-y-1">
            <label className="block text-xs text-gray-600">
              {capitalizeWords(key)}
            </label>
            <Select
              options={ratingOptions}
              value={ratingOptions.find(
                (option) => option.value === String(filters[key] || "")
              )}
              onChange={(option) => {
                const newValue = option?.value;
                setFilters((prev) => {
                  const updatedFilters = {
                    ...prev,
                    [key]: newValue ? Number(newValue) : undefined,
                  };
                  if (updatedFilters[key] === undefined) {
                    delete updatedFilters[key];
                  }
                  return updatedFilters;
                });
              }}
              classNames={{
                control: (state) =>
                  `!text-sm !min-h-[32px] !border-gray-300 !shadow-sm ${
                    state.isFocused
                      ? "!border-blue-500 !ring-1 !ring-blue-500"
                      : ""
                  }`,
                valueContainer: () => "!py-0",
                input: () => "!m-0",
              }}
            />
          </div>
        ))}
      </div>

      {Object.keys(filters).length > 0 && (
        <div className="flex justify-center mt-4">
          <Button variant="secondary" onClick={() => setFilters({})}>
            Clear all filters
          </Button>
        </div>
      )}
    </Collapsible>
  );
};
