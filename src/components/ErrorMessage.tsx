type ErrorMessageProps = {
  message?: string;
};

export const ErrorMessage = ({
  message = "An error occured. Please reload the page.",
}: ErrorMessageProps) => {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="relative px-4 py-3 text-red-700 bg-red-100 border border-red-400 rounded">
        <strong className="font-bold">Error! </strong>
        <span className="block sm:inline">{message}</span>
      </div>
    </div>
  );
};
