import axios from "axios";
import { useEffect, useState } from "react";
import LoadingIndicator from "../../components/LoadingIndicator";
import StreakHeatmap from "../../components/StreakHeatMap";
import type { User } from "../../types/User";
import { toTitleCase } from "../../utils";
import ProblemRatingBar from "./ProblemRatingsBar";
import ProfileHeader from "../ProfileHeader";
import ProfileInfo from "./ProfileInfo";
import ProgressLevel from "./ProgressLevel";
import RatingGraph from "./RatingGraph";
import TagPieChart from "./TagPieChart";

export default function ProfilePage({ slug }: { slug?: string }) {
  const [profile, setProfile] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/profile/${slug ?? ""}`, {
        withCredentials: true,
      })
      .then((res) => {
        setProfile(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load profile.");
        setLoading(false);
      });
  }, [slug]);

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
                {slug ? `${toTitleCase(profile?.name || undefined)}'s` : "Your"}{" "}
                <span className="text-highlight-lighter">Profile</span>
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
