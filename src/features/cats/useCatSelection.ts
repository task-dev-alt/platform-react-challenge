import { useSearchParams } from "react-router-dom";
import type { Cat } from "../types";
import { CAT_PARAM } from "../constants";

export const useCatSelection = <TData extends Cat>(
  data: TData[] | undefined
) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleCatClick = (catId: string) => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      newParams.set(CAT_PARAM, catId);
      return newParams;
    });
  };

  const handleCloseModal = () => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      newParams.delete(CAT_PARAM);
      return newParams;
    });
  };

  const selectedCat = data?.find(
    (cat) => cat.id === searchParams.get(CAT_PARAM)
  );

  const isModalOpen = searchParams.has(CAT_PARAM);

  return {
    selectedCat,
    isModalOpen,
    handleCatClick,
    handleCloseModal,
  };
};
