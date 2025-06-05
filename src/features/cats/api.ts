import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import { fetchData } from "../../api";
import { createUrlParams } from "../../utils";
import { queryClient } from "../../app/react-query";

import type { Cat, FavouriteCat } from "../types";

export const useCatDetails = (catId: Cat["id"]) => {
  return useQuery({
    queryKey: ["cats", "details", { catId }],
    queryFn: () => fetchData<Cat>(`/images/${catId}`),
  });
};

type UseCatsOptions = {
  limit?: number;
  breedId?: string | null;
};

export const useCats = ({ limit = 10, breedId }: UseCatsOptions) => {
  const params = createUrlParams({
    limit,
    size: "small",
    ...(breedId && { breed_id: breedId }),
  });

  return useInfiniteQuery({
    queryKey: ["cats", "list", { limit, breedId }],
    queryFn: () => fetchData<Cat[]>(`/images/search?${params}`),
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages.length;
      return lastPage.length < limit ? undefined : nextPage;
    },
    initialPageParam: 0,
  });
};

export const useFavouriteCats = (favouriteId?: number) => {
  return useQuery({
    queryKey: [
      "favourite-cats",
      favouriteId ? "single-item" : "list",
      { favouriteId },
    ],
    queryFn: () =>
      fetchData<FavouriteCat[]>(`/favourites/${favouriteId || ""}`),
    select: (data) => {
      const favourites = Array.isArray(data) ? data : [data];
      const mapped = favourites.map((favourite) => ({
        id: favourite.image_id,
        url: favourite.image.url,
        favouriteId: favourite.id,
        breeds: [],
      }));

      return mapped as (Cat & { favouriteId: number })[];
    },
  });
};

export const useAddFavouriteCat = () => {
  return useMutation({
    mutationFn: (catId: Cat["id"]) =>
      fetchData(`/favourites`, {
        method: "POST",
        body: JSON.stringify({ image_id: catId }),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["favourite-cats", "list"],
      });
    },
  });
};

export const useRemoveFavouriteCat = () => {
  return useMutation({
    mutationFn: (catId: FavouriteCat["id"]) =>
      fetchData(`/favourites/${catId}`, {
        method: "DELETE",
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["favourite-cats", "list"],
      });
    },
  });
};
