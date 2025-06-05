import type React from "react";

type ButtonVariant = "primary" | "secondary" | "danger";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

export const Button = ({
  children,
  className = "",
  variant = "primary",
  ...props
}: ButtonProps) => {
  const variantStyles = {
    primary: "bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-400",
    secondary:
      "bg-gray-200 text-gray-700 hover:bg-gray-300 focus:ring-gray-400",
    danger: "bg-red-500 text-white hover:bg-red-600 focus:ring-red-400",
  };

  const baseStyles =
    "cursor-pointer px-4 py-2 rounded focus:outline-none focus:ring-2 transition-colors duration-200 disabled:bg-gray-400 disabled:hover:bg-gray-400 disabled:cursor-not-allowed";

  const cls = `${baseStyles} ${variantStyles[variant]} ${className}`;

  return (
    <button {...props} className={cls}>
      {children}
    </button>
  );
};
