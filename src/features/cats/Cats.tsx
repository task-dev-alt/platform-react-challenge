import { AsyncContainer, Button } from "../../components";
import { CatGrid } from "./CatGrid";
import { useCats } from "./api";

type CatsProps = {
  title?: string;
  breedId?: string;
  infiniteScroll?: boolean;
};

export const Cats = ({
  title = "Cats",
  breedId,
  infiniteScroll = true,
}: CatsProps) => {
  const {
    data: cats,
    isError,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
  } = useCats({ limit: 10, breedId });

  const flattenedCats = cats?.pages.flat() || [];

  return (
    <AsyncContainer
      title={title}
      isLoading={isLoading}
      isError={isError}
      errorMessage="🙀 Failed to fetch cats. Please reload."
    >
      {cats && (
        <>
          <CatGrid cats={flattenedCats} />

          {infiniteScroll && (
            <div className="flex justify-center mt-8">
              <Button
                onClick={() => fetchNextPage()}
                disabled={isFetchingNextPage || !hasNextPage}
              >
                {isFetchingNextPage ? "Loading more..." : "Load More"}
              </Button>
            </div>
          )}
        </>
      )}
    </AsyncContainer>
  );
};
