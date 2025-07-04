import React from "react";
import { getRatingLevel } from "../utils";

interface ProfileHeaderProps {
  cfRating: number | null | undefined;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ cfRating }) => {
  if (cfRating === null || cfRating === undefined) return null;

  return (
    <div className="flex gap-4">
      <div className="rounded-full px-4 py-2 border border-yellow-500">
        <span className="text-yellow-400">⭐</span>
        <span className="text-white ml-2">Rating: {cfRating}</span>
      </div>
      <div className="rounded-full px-4 py-2 border border-red-500">
        <span className="text-red-400">🔥</span>
        <span className="text-white ml-2">
          Rank: {getRatingLevel(cfRating)}
        </span>
      </div>
    </div>
  );
};

export default ProfileHeader;
