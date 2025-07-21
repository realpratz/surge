import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import axios from "axios";

import ProfileHeader from "../../components/ProfileHeader";
import RatingGraph from "../../components/RatingGraph";
import ProblemRatingBar from "../../components/ProblemRatingsBar";
import TagPieChart from "../../components/TagPieChart";
import StreakHeatmap from "../../components/StreakHeatMap";
import ProgressLevel from "../../components/ProgressLevel";
import LoadingIndicator from "../../components/LoadingIndicator";
import type { User } from "../../types/User";
import ProfileInfo from "../../components/ProfileInfo";

export const Route = createFileRoute("/profile/")({
  component: ProfileIndex,
});

export function ProfileIndex() {
  const [profile, setProfile] = useState<User | null>(null);
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

        <ProfileInfo profile={profile} />

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
