import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import { getRatingColor, getRatingLevel } from "../../utils";
import ProfileAvatar from "../../components/ProfileAvatar";
import ProfileHeader from "../../components/ProfileHeader";
import RatingGraph from "../../components/RatingGraph";
import ProblemRatingBar from "../../components/ProblemRatingsBar";
import TagPieChart from "../../components/TagPieChart";
import StreakHeatmap from "../../components/StreakHeatMap";
import ProgressLevel from "../../components/ProgressLevel";
import LoadingIndicator from "../../components/LoadingIndicator";

export const Route = createFileRoute("/profile/")({
  component: ProfileIndex,
});

interface Profile {
  name: string | null;
  email: string | null;
  pfpUrl: string | null;
  cfHandle: string | null;
  cfRating: number | null;
}

export function ProfileIndex() {
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

  const cfRatingNumber =
    profile?.cfRating !== undefined && profile?.cfRating !== null
      ? Number(profile.cfRating)
      : null;

  if (loading) return <LoadingIndicator />;

  if (error)
    return (
      <div className="min-h-screen text-white flex items-center justify-center">
        <div className="text-red-400 animate-pulse">{error}</div>
      </div>
    );

  return (
    <div className="min-h-screen text-white">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8 border-b border-[#25293E]">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold ">
                Your <span className="text-highlight-lighter">Profile</span>
              </h1>
            </div>
            <ProfileHeader
              cfRating={profile?.cfRating}
              className="hidden md:flex"
            />
          </div>
        </div>

        {/* Profile Information Section */}
        <div className="mb-8">
          <div className="bg-highlight-dark rounded-lg p-6 transition-all duration-300 hover:shadow-lg">
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
                        {profile?.cfRating ? (
                          <span>
                            {`${profile?.cfRating}`}{" "}
                            <span className="md:hidden">
                              ({getRatingLevel(profile.cfRating)})
                            </span>
                          </span>
                        ) : (
                          "Unrated"
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Section */}
        <div>
          {profile?.cfRating && profile?.cfHandle && (
            <ProgressLevel cfRating={profile?.cfRating} />
          )}
          {profile?.cfHandle && <StreakHeatmap handle={profile?.cfHandle} />}
          {profile?.cfRating && profile?.cfHandle && (
            <RatingGraph handle={profile?.cfHandle} />
          )}
          {profile?.cfHandle && <ProblemRatingBar handle={profile?.cfHandle} />}
          {profile?.cfHandle && <TagPieChart handle={profile?.cfHandle} />}
        </div>
      </div>
    </div>
  );
}
