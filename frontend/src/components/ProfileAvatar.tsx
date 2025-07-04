import React from "react";

type ProfileAvatarProps = {
  pfpUrl: string | null;
};

const ProfileAvatar: React.FC<ProfileAvatarProps> = ({ pfpUrl }) => (
  <div className="relative group">
    <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-highlight-light via-purple-400 to-accent-red blur-sm opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
    <img
      src={pfpUrl || "/logo-new.png"}
      alt="Profile"
      className="w-24 h-24 rounded-full object-cover relative z-10 group-hover:scale-105 transition-transform duration-300"
    />
  </div>
);

export default ProfileAvatar;
