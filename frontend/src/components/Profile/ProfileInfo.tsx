import React, { useEffect, useState } from "react";
import { Pencil } from "lucide-react";
import ProfileAvatar from "./ProfileAvatar";
import { getRatingColor } from "../../utils";
import { useAuth } from "../../context/AuthContext";
import EditProfileModal from "../EditProfileModal";
import type { User } from "../../types/User";

const PLATFORM_LOGOS: Record<string, string> = {
  "codeforces.com": "/logos/codeforces.svg",
  "codechef.com": "/logos/codechef-4.webp",
  "atcoder.jp": "/logos/atcoder.png",
  "leetcode.com": "/logos/leetcode.png",
};

const ProfileInfo: React.FC<{ profile: User | null }> = ({ profile }) => {
  const { user, setUser } = useAuth();
  const [isModalOpen, setModalOpen] = useState(false);
  const [localProfile, setLocalProfile] = useState<User | null>(profile);

  useEffect(() => {
    setLocalProfile(profile);
  }, [profile]);

  const isOwner = user?.email === localProfile?.email;

  const platformLinks = [
    {
      label: "Codeforces",
      handle: localProfile?.cfHandle,
      rating: localProfile?.cfRating,
      href: `https://codeforces.com/profile/${localProfile?.cfHandle}`,
      logo: PLATFORM_LOGOS["codeforces.com"],
    },
    {
      label: "LeetCode",
      handle: localProfile?.leetcodeHandle,
      rating: undefined,
      href: `https://leetcode.com/${localProfile?.leetcodeHandle}`,
      logo: PLATFORM_LOGOS["leetcode.com"],
    },
    {
      label: "CodeChef",
      handle: localProfile?.codechefHandle,
      rating: undefined,
      href: `https://www.codechef.com/users/${localProfile?.codechefHandle}`,
      logo: PLATFORM_LOGOS["codechef.com"],
    },
    {
      label: "AtCoder",
      handle: localProfile?.atcoderHandle,
      rating: undefined,
      href: `https://atcoder.jp/users/${localProfile?.atcoderHandle}`,
      logo: PLATFORM_LOGOS["atcoder.jp"],
    },
  ];

  return (
    <>
      <div className="mb-8">
        <div className="bg-highlight-dark rounded-lg p-6 transition-all hover:shadow-lg relative">
          {isOwner && (
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-white hover:cursor-pointer transition-colors"
              onClick={() => setModalOpen(true)}
            >
              <Pencil size={20} />
            </button>
          )}

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
            <div className="flex-shrink-0 flex justify-center sm:block">
              <ProfileAvatar pfpUrl={localProfile?.pfpUrl || null} />
            </div>

            {/* Info Grid */}
            <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-4">
                <InfoItem label="Name" value={localProfile?.name || "N/A"} />
                <InfoItem label="Email" value={localProfile?.email || "N/A"} />
              </div>

              {/* Right Column */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {platformLinks.map(
                  ({ label, handle, rating, href, logo }) =>
                    handle && (
                      <PlatformLink
                        key={label}
                        label={label}
                        logo={logo}
                        handle={handle}
                        href={href}
                        rating={rating}
                      />
                    )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {isOwner && isModalOpen && (
        <EditProfileModal
          initialValues={{
            pfpUrl: localProfile?.pfpUrl || "",
            atcoderHandle: localProfile?.atcoderHandle || "",
            leetcodeHandle: localProfile?.leetcodeHandle || "",
            codechefHandle: localProfile?.codechefHandle || "",
          }}
          onClose={() => setModalOpen(false)}
          onSuccess={(updatedUser) => {
            setUser(updatedUser);
            setLocalProfile(updatedUser);
            setModalOpen(false);
          }}
        />
      )}
    </>
  );
};

const InfoItem = ({ label, value }: { label: string; value: string }) => (
  <div className="group">
    <div className="text-sm text-gray-400 mb-1">{label}</div>
    <div className="text-white font-medium break-words">{value}</div>
  </div>
);

const PlatformLink = ({
  label,
  handle,
  href,
  logo,
  rating,
}: {
  label: string;
  handle: string;
  href: string;
  logo: string;
  rating?: number | null | undefined;
}) => (
  <div className="flex items-center gap-3 group">
    <img src={logo} alt={`${label} logo`} className="w-6 h-6 opacity-80" />
    <div className="flex flex-col text-sm">
      <span className="text-gray-400">{label}</span>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-white font-mono font-semibold hover:text-blue-400 transition-colors break-all"
      >
        {handle}
        {rating && (
          <span className={`ml-1 ${getRatingColor(rating)}`}>({rating})</span>
        )}
      </a>
    </div>
  </div>
);

export default ProfileInfo;
