import { createFileRoute } from '@tanstack/react-router'
import axios from 'axios'
import { useEffect, useState } from 'react'

// Define the expected profile type
interface Profile {
  name: string | null;
  email: string | null;
  pfpUrl: string | null;
  cfHandle: string | null;
  cfRating: number | null;
}

export const Route = createFileRoute('/profile')({
  component: RouteComponent,
})

function RouteComponent() {
  const [profile, setProfile] = useState<Profile | null>(null)
  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_BASE_URL}/profile`, { withCredentials: true })
      .then((res) => setProfile(res.data))
      .catch((err) => console.error("Error fetching profile: ", err))
  }, [])
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold text-blue-600">Profile Page</h1>
      {profile && (
        <div className="flex flex-col gap-2 p-4 border rounded shadow max-w-md mt-4"> 
          <div className="flex justify-center mb-2">
            <img
              src={'/logo-new.png'} // TODO: change to profile.pfpUrl
              alt="Profile avatar"
              className="w-20 h-20 rounded-full border"
            />
          </div>
          <div className="text-2xl font-bold mb-1">{profile.name || 'N/A'}</div>
          <div className="mb-1 text-gray-700">{profile.email || 'N/A'}</div>
          <div className="mb-1">
            <span className="font-semibold">CF Handle: </span>
            {profile.cfHandle ? (
              <a
                href={`https://codeforces.com/profile/${profile.cfHandle}`}
                target="_blank"
                rel="noopener noreferrer" // what is this?
              >
                {profile.cfHandle}
              </a>
            ) : 'N/A'}
          </div>
          <div>
            <span className="font-semibold">CF Rating: </span>
            {profile.cfRating === null ? (
              <span className="text-gray-500">Unrated</span>
            ) : (
              <span className="text-green-500 font-bold">
                {profile.cfRating}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
