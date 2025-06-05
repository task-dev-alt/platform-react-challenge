import { useQuery } from "@tanstack/react-query";
import { fetchData } from "../../api";
import type { Breed } from "../types";

export const useBreeds = () => {
  return useQuery({
    queryKey: ["breeds", "list"],
    queryFn: () => fetchData<Breed[]>("/breeds"),
  });
};
