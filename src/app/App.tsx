import { Link } from "react-router-dom";
import { NavItem } from "../components";
import { Providers } from "./Providers";
import { routes } from "./route-config";
import { Router } from "./Router";

function App() {
  return (
    <Providers>
      <div className="flex flex-col min-h-screen">
        <header className="flex items-center justify-between p-4 text-white bg-gray-800">
          <Link to="/" className="transition-colors hover:text-gray-200">
            <h1 className="text-2xl font-bold">Cat Gallery</h1>
          </Link>
          <nav className="flex gap-4">
            {routes.map(({ path, label }) => (
              <NavItem key={path} to={path}>
                {label}
              </NavItem>
            ))}
          </nav>
        </header>
        <main className="flex-1 p-1 md:p-0">
          <Router />
        </main>
        <footer className="p-4 text-center text-white bg-gray-800">
          <p>&copy; 2025 Cat Gallery</p>
        </footer>
      </div>
    </Providers>
  );
}

export default App;
