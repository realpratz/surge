import { Outlet, createRootRoute } from "@tanstack/react-router";
import { useAuth } from "../context/AuthContext";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import Login from "../pages/Login";
import Navbar from "../components/Navbar";
import CFHandleModal from "../components/CFHandleModal";

export const Route = createRootRoute({
  component: RootComponent,
});

export default function RootComponent() {
  const { user, loading, setUser } = useAuth();

  if (loading) return <p>Loading...</p>;

  if (!user) {
    return <Login />;
  }

  return (
    <div className="flex min-h-screen">
      <Navbar />
      <main className="flex-grow p-6 ml-30 bg-dark-background text-white">
        <Outlet />
      </main>
      {import.meta.env.VITE_ENV === "development" && (
        <TanStackRouterDevtools position="bottom-right" />
      )}
      {user.cfHandle === null && (
        <CFHandleModal
          onSuccess={(updatedUser) => {
            setUser(updatedUser);
          }}
        />
      )}
    </div>
  );
}
