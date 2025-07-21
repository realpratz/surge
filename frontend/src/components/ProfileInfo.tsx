import React from "react";
import ProfileAvatar from "./ProfileAvatar";
import { getRatingColor, getRatingLevel } from "../utils";
import type { User } from "../types/User";

interface ProfileInfoProps {
  profile: User | null;
}

const ProfileInfo: React.FC<ProfileInfoProps> = ({ profile }) => {
  const cfRatingNumber = profile?.cfRating || 0;

  return (
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
                {/* Codeforces Handle */}
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

                {/* Codeforces Rating */}
                <div className="group">
                  <div className="text-sm text-gray-400 mb-1">
                    Codeforces Rating
                  </div>
                  <div
                    className={`font-bold text-xl ${getRatingColor(cfRatingNumber)} group-hover:scale-105 transition-transform duration-300 inline-block animate-pulse`}
                  >
                    {profile?.cfRating ? (
                      <span>
                        {profile.cfRating}{" "}
                        <span className="md:hidden">
                          ({getRatingLevel(profile.cfRating)})
                        </span>
                      </span>
                    ) : (
                      "Unrated"
                    )}
                  </div>
                </div>

                {/* Optional Handles */}
                {profile?.leetcodeHandle && (
                  <div className="group">
                    <div className="text-sm text-gray-400 mb-1">LeetCode</div>
                    <a
                      href={`https://leetcode.com/${profile.leetcodeHandle}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white font-medium hover:text-yellow-400 transition-colors duration-300"
                    >
                      {profile.leetcodeHandle}
                    </a>
                  </div>
                )}

                {profile?.codechefHandle && (
                  <div className="group">
                    <div className="text-sm text-gray-400 mb-1">CodeChef</div>
                    <a
                      href={`https://www.codechef.com/users/${profile.codechefHandle}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white font-medium hover:text-purple-400 transition-colors duration-300"
                    >
                      {profile.codechefHandle}
                    </a>
                  </div>
                )}

                {profile?.atcoderHandle && (
                  <div className="group">
                    <div className="text-sm text-gray-400 mb-1">AtCoder</div>
                    <a
                      href={`https://atcoder.jp/users/${profile.atcoderHandle}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white font-medium hover:text-green-400 transition-colors duration-300"
                    >
                      {profile.atcoderHandle}
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
