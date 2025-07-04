import { createFileRoute } from "@tanstack/react-router";
import axios from "axios";
import { useEffect, useState } from "react";
import { getRatingLevel, getRatingColor } from "../utils";
import ProfileAvatar from "../components/ProfileAvatar";
import ProfileHeader from "../components/ProfileHeader";

interface Profile {
  name: string | null;
  email: string | null;
  pfpUrl: string | null;
  cfHandle: string | null;
  cfRating: number | null;
}

export const Route = createFileRoute("/profile")({
  component: RouteComponent,
});

function RouteComponent() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/profile`, {
        withCredentials: true,
      })
      .then((res) => {
        setProfile(res.data);
        setLoading(false);
      })
      .catch((err: any) => {
        console.error(err);
        setError("Failed to load profile.");
        setLoading(false);
      });
  }, []);

  // Helper to ensure cfRating is number or null
  const cfRatingNumber =
    profile?.cfRating !== undefined && profile?.cfRating !== null
      ? Number(profile.cfRating)
      : null;

  if (loading)
    return (
      <div className="min-h-screen text-white flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="w-8 h-8 border-2 border-blue-400 border-t-transparent rounded-full animate-spin mb-4"></div>
          <div className="text-lg animate-pulse">Loading...</div>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen text-white flex items-center justify-center">
        <div className="text-red-400 animate-pulse">{error}</div>
      </div>
    );

  return (
    <div className="min-h-screen text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold ">
                Your <span className="text-gray-400">Profile</span>
              </h1>
            </div>
            <ProfileHeader cfRating={profile?.cfRating} />
          </div>
        </div>

        {/* Profile Information Section */}
        <div className="mb-8">
          <div className="bg-highlight-dark rounded-lg p-8  transition-all duration-300 hover:shadow-lg">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              {/* Profile Picture */}
              <div className="flex-shrink-0">
                <ProfileAvatar pfpUrl={profile?.pfpUrl || null} />
              </div>

              {/* Profile Details */}
              <div className="flex-grow">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="group">
                      <div className="text-sm text-gray-400 mb-1">Name</div>
                      <div className="text-white font-medium text-lg group-hover:text-blue-400 transition-colors duration-300">
                        {profile?.name || "N/A"}
                      </div>
                    </div>

                    <div className="group">
                      <div className="text-sm text-gray-400 mb-1">Email</div>
                      <div className="text-white font-medium break-all group-hover:text-blue-400 transition-colors duration-300">
                        {profile?.email || "N/A"}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="group">
                      <div className="text-sm text-gray-400 mb-1">
                        Codeforces Handle
                      </div>
                      <div className="text-white font-medium">
                        {profile?.cfHandle ? (
                          <a
                            href={`https://codeforces.com/profile/${profile.cfHandle}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-blue-300 transition-colors duration-300"
                          >
                            {profile.cfHandle}
                          </a>
                        ) : (
                          <span className="group-hover:text-blue-400 transition-colors duration-300">
                            N/A
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="group">
                      <div className="text-sm text-gray-400 mb-1">
                        Codeforces Rating
                      </div>
                      <div
                        className={`font-bold text-xl ${getRatingColor(cfRatingNumber)} group-hover:scale-105 transition-transform duration-300 inline-block animate-pulse`}
                      >
                        {profile?.cfRating || "Unrated"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Section */}
        {profile?.cfRating && (
          <div>
            <h3 className="text-xl font-light mb-4">
              Progress <span className="text-gray-400">Level</span>
            </h3>

            <div className="bg-highlight-dark rounded-lg p-6  ">
              <div className="flex items-center justify-between mb-4">
                <div className="text-white font-medium">
                  {getRatingLevel(cfRatingNumber)} to{" "}
                  {getRatingLevel(
                    cfRatingNumber !== null ? cfRatingNumber + 200 : null
                  )}
                </div>
              </div>

              <div className="mb-4">
                <div className="text-sm text-gray-400 mb-2">
                  Rating: {profile.cfRating}/
                  {Math.ceil((profile?.cfRating ?? 0) / 200) * 200}
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-blue-300 to-accent-red h-2 rounded-full transition-all duration-500"
                    style={{
                      width: `${((profile?.cfRating ?? 0) % 200) / 2}%`,
                    }}
                  ></div>
                </div>
                <div className="text-sm text-gray-400 mt-2">
                  {Math.round(((profile?.cfRating ?? 0) % 200) / 2)}% along the
                  way!
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-400">
                  🏆 Next milestone at{" "}
                  {Math.ceil((profile?.cfRating ?? 0) / 200) * 200}
                </div>
                {/* <div className="text-blue-400 text-sm">View full rating system</div> */}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
