import { NavLink } from "react-router-dom";

export const NavItem = ({
  to,
  children,
}: {
  to: string;
  children: React.ReactNode;
}) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `px-4 py-2 rounded transition-colors ${
        isActive ? "bg-gray-700" : "hover:bg-gray-700"
      }`
    }
  >
    {children}
  </NavLink>
);
