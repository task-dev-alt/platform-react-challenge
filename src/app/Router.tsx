import { Navigate, Route, Routes } from "react-router-dom";
import { routes } from "./route-config";

export const Router = () => {
  return (
    <Routes>
      {routes.map(({ path, Element }) => (
        <Route key={path} path={path} element={<Element />} />
      ))}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
