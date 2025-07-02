import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/leaderboard')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold text-blue-600">Leaderboard Page</h1>
    </div>
  );
}
