export default function LoadingIndicator() {
  return (
    <div className="min-h-screen text-white flex items-center justify-center">
      <div className="flex flex-col items-center">
        <div className="w-8 h-8 border-2 border-accent-red border-t-transparent rounded-full animate-spin mb-4"></div>
        <div className="text-lg animate-pulse">Loading...</div>
      </div>
    </div>
  );
}
