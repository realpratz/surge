import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/resources')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold text-blue-600">Resources Page</h1>
    </div>
  );
}