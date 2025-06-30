import { useAuth } from './context/AuthContext';

export default function ProtectedApp({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) return <p>Loading...</p>;

  if (!user) {
    return (
      <div className="h-screen flex items-center justify-center">
        <a href={`${import.meta.env.VITE_API_BASE_URL}/auth/google`}>
          <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
            Sign in with Google
          </button>
        </a>
      </div>
    );
  }

  return <>{children}</>;
}
