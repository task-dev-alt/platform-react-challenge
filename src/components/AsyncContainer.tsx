import type { ReactNode } from "react";
import { LoadingSpinner } from "./LoadingSpinner";
import { ErrorMessage } from "./ErrorMessage";

type AsyncContainerProps = {
  title: string;
  isLoading: boolean;
  isError: boolean;
  children: ReactNode;
  errorMessage?: string;
};

export const AsyncContainer = ({
  title,
  isLoading,
  isError,
  children,
  errorMessage,
}: AsyncContainerProps) => {
  return (
    <div className="container mx-auto my-4">
      <h1 className="mb-4 text-2xl font-bold">{title}</h1>
      {isLoading && <LoadingSpinner />}
      {isError && <ErrorMessage message={errorMessage} />}
      {children}
    </div>
  );
};
