type RatingProps = {
  value: number;
  maxValue?: number;
  label: string;
};

export const Rating = ({ value, maxValue = 5, label }: RatingProps) => {
  return (
    <div className="flex items-center gap-2">
      <span className="w-32 text-sm font-medium">{label}:</span>
      <div className="flex gap-1">
        {Array.from({ length: maxValue }).map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full ${
              i < value ? "bg-blue-500" : "bg-gray-200"
            }`}
          />
        ))}
      </div>
    </div>
  );
};
