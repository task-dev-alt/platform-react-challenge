import { Modal } from "../../components";
import { CatDetails } from "./CatDetails";
import { useCatSelection } from "./useCatSelection";

import type { Cat } from "../types";

type CatGridProps = {
  cats: Cat[];
};

export const CatGrid = ({ cats }: CatGridProps) => {
  const { selectedCat, isModalOpen, handleCatClick, handleCloseModal } =
    useCatSelection(cats);

  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {cats.map((cat) => (
          <div key={cat.id} className="p-2 border rounded">
            <div
              className="w-full overflow-hidden transition-shadow duration-200 cursor-pointer aspect-square hover:shadow-lg"
              onClick={() => handleCatClick(cat.id)}
            >
              <img
                src={cat.url}
                alt={`Cat ${cat.id}`}
                className="object-cover w-full h-full rounded"
              />
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <div className="w-full">
          <CatDetails selectedCat={selectedCat} />
        </div>
      </Modal>
    </>
  );
};
