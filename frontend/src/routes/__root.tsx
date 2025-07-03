import { Outlet, createRootRoute } from "@tanstack/react-router";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import Login from "../pages/Login";
import Navbar from "../components/Navbar";

export const Route = createRootRoute({
  component: RootComponent,
});

export default function RootComponent() {
  const { user, loading } = useAuth();

  useEffect(() => {
    console.log(`User: ${user}`);
  }, [user]);

  if (loading) return <p>Loading...</p>;

  if (!user) {
    return <Login />;
  }

  return (
    <div className="flex min-h-screen">
      <Navbar />
      <main className="flex-grow p-6 bg-dark-background text-white">
        <Outlet />
      </main>
      {import.meta.env.VITE_ENV === "development" && (
        <TanStackRouterDevtools position="bottom-right" />
      )}
    </div>
  );
}
