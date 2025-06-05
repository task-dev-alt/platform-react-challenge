type LoadingTextProps = {
  text?: string;
};

export const LoadingText = ({ text = "Loading..." }: LoadingTextProps) => {
  return (
    <div className="flex items-center justify-center">
      <div className="text-2xl animate-pulse">{text}</div>
    </div>
  );
};
