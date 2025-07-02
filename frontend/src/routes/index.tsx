import { createFileRoute, Link } from '@tanstack/react-router'
import * as React from 'react'

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold text-blue-600">Home Page</h1>
      <p>
        <Link to="/profile">Profile</Link>      
      </p>
      <p>
        <Link to="/stats">Stats</Link>
      </p>
      <p>
        <Link to="/leaderboard">Leaderboard</Link>
      </p>
      <p>
        <Link to="/resources">Resources</Link>
      </p>
    </div>
  );
}