import React from "react";
import { getRatingLevel, getRatingBand } from "../utils";

interface ProgressLevelProps {
  cfRating: number | null;
}

const ProgressLevel: React.FC<ProgressLevelProps> = ({ cfRating }) => {
  const rating = cfRating ?? 0;
  const [bandFloor, bandCeil] = getRatingBand(rating);
  const progressPercent = (rating - bandFloor) / (bandCeil + 1 - bandFloor) * 100;

  return (
    <div>
      <h3 className="text-xl font-light mb-4">
        Progress <span className="text-gray-400">Level</span>
      </h3>

      <div className="bg-highlight-dark rounded-lg p-4 md:p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="text-white font-medium">
            {getRatingLevel(cfRating)} to{" "}
            {getRatingLevel(bandCeil + 1)}
          </div>
        </div>

        <div className="mb-4">
          <div className="text-sm text-gray-400 mb-2">
            Rating: {rating}/{bandCeil + 1}
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-blue-300 to-accent-red h-2 rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
          <div className="text-sm text-gray-400 mt-2">
            {Math.round(progressPercent)}% along the way!
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-400">
            🏆 Next milestone at {bandCeil + 1}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressLevel;
