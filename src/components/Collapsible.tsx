import { useState, type ReactNode } from "react";
import { FaCaretDown } from "react-icons/fa";
import { Button } from "./Button";

type CollapsibleProps = {
  className?: string;
  title: ReactNode;
  children: ReactNode;
  badge?: number;
  defaultExpanded?: boolean;
};

export const Collapsible = ({
  title,
  children,
  badge,
  className,
  defaultExpanded = true,
}: CollapsibleProps) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  return (
    <div className={`rounded-lg bg-gray-50 ${className ?? ""}`}>
      <Button
        variant="secondary"
        onClick={() => setIsExpanded((prev) => !prev)}
        className="flex items-center justify-between w-full p-4 text-left bg-transparent hover:bg-gray-100 focus:bg-gray-100 active:bg-gray-200"
      >
        <div className="flex items-center gap-2">
          {typeof title === "string" ? (
            <h2 className="text-sm font-medium text-gray-700">{title}</h2>
          ) : (
            title
          )}
          {badge !== undefined && badge > 0 && (
            <span className="px-2 py-0.5 text-xs bg-blue-100 text-blue-800 rounded-full">
              {badge}
            </span>
          )}
        </div>
        <span
          className="text-gray-500 transition-transform duration-200"
          style={{
            transform: isExpanded ? "rotate(-180deg)" : "rotate(0deg)",
          }}
        >
          <FaCaretDown size={16} />
        </span>
      </Button>

      <div
        className={`transition-all duration-200 ${
          isExpanded ? "" : "max-h-0 overflow-hidden"
        }`}
      >
        <div className="p-4 border-t">{children}</div>
      </div>
    </div>
  );
};
