import { createFileRoute } from '@tanstack/react-router'
import axios from 'axios'
import { useEffect, useState } from 'react'

export const Route = createFileRoute('/leaderboard')({
  component: RouteComponent,
})

function RouteComponent() {
  const [leaderboard, setLeaderboard] = useState([])
  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_BASE_URL}/leaderboard`)
      .then((res) => setLeaderboard(res.data))
      .catch((err) => console.error("Error fetching leaderboard: ", err))
  }, [])
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold text-blue-600">Leaderboard Page</h1>
      {leaderboard.map((user) =>
        <div key={user.id} className='flex p-1.5'>
          <div className='pr-10'>{user.name}</div>
          <div>{user.cfRating}</div>
        </div>)}
    </div>
  );
}
