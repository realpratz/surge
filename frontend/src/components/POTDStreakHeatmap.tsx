import { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import classNames from "classnames";

interface PotdSolve {
  solve: {
    solvedAt: string;
  };
}

const getPastYearDates = (): string[] => {
  const today = dayjs().startOf("day");
  return Array.from({ length: 365 }).map((_, i) =>
    today.subtract(364 - i, "day").format("YYYY-MM-DD")
  );
};

const getColor = (count: number) => {
  if (count >= 10) return "bg-cyan-600";
  if (count >= 5) return "bg-cyan-400";
  if (count >= 3) return "bg-cyan-200";
  if (count >= 1) return "bg-cyan-100";
  return "bg-gray-700";
};

const computeStats = (days: string[], heatmap: Record<string, number>) => {
  const totalAll = Object.values(heatmap).reduce((sum, c) => sum + c, 0);
  let maxStreak = 0,
    curStreak = 0;

  days.forEach((d) => {
    const c = heatmap[d] || 0;
    if (c > 0) {
      curStreak++;
      maxStreak = Math.max(maxStreak, curStreak);
    } else {
      curStreak = 0;
    }
  });

  return {
    totalAll,
    maxStreak,
    curStreak,
  };
};

export default function PotdStreakHeatmap() {
  const [heatmap, setHeatmap] = useState<Record<string, number>>({});
  const [stats, setStats] = useState<ReturnType<typeof computeStats> | null>(
    null
  );

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/potd/solve-history`, {
        withCredentials: true,
      })
      .then((res) => {
        const map: Record<string, number> = {};
        (res.data as PotdSolve[]).forEach((entry) => {
          const date = dayjs(entry.solve.solvedAt).format("YYYY-MM-DD");
          map[date] = (map[date] || 0) + 1;
        });

        const days = getPastYearDates();
        setHeatmap(map);
        setStats(computeStats(days, map));
      });
  }, []);

  const days = getPastYearDates();
  const weeks: string[][] = [];
  const indexOfFirstSaturday = days.findIndex(
    (day) => dayjs(day).format("ddd") === "Sat"
  );
  weeks.push(days.slice(0, indexOfFirstSaturday + 1));
  for (let i = indexOfFirstSaturday + 1; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }
  weeks[0] = Array(7 - weeks[0].length)
    .fill(weeks[0][0])
    .concat(weeks[0]);

  const monthNums = weeks.map((w) => dayjs(w[0]).month());
  const monthLabels = monthNums.map((m, i) =>
    i === 0 || m !== monthNums[i - 1] ? dayjs(weeks[i][0]).format("MMM") : ""
  );

  return (
    <div className="mt-6">
      <h2 className="text-white text-xl mb-4">
        Streak <span className="text-gray-400">History</span>
      </h2>

      <div className="bg-highlight-dark p-4 rounded-lg">
        <div
          className="grid grid-flow-col text-[.5rem] md:text-xs text-gray-300 mb-1 w-full md:ml-7 md:w-[calc(100%-1.75rem)]"
          style={{
            gridTemplateColumns: `repeat(${weeks.length}, minmax(0, 1fr))`,
          }}
        >
          {monthLabels.map((m, i) => (
            <div key={i} className="text-center">
              {m}
            </div>
          ))}
        </div>

        <div className="flex">
          <div className="hidden md:flex flex-col justify-between text-xs text-gray-400 mr-2 w-5">
            {["", "Mon", "", "Wed", "", "Fri", ""].map((d) => (
              <div key={d} className="h-4">
                {d}
              </div>
            ))}
          </div>

          <div
            className="grid gap-[2px] w-full aspect-53/7"
            style={{
              gridTemplateRows: "repeat(7, 1fr)",
              gridTemplateColumns: `repeat(${weeks.length}, 1fr)`,
            }}
          >
            {weeks.map((week, wi) =>
              week.map((date, di) => {
                const c = heatmap[date] || 0;
                return (
                  <div
                    key={`${wi}-${di}`}
                    style={{ gridColumn: wi + 1, gridRow: di + 1 }}
                    className={classNames(
                      getColor(c),
                      "w-full h-full md:rounded-sm"
                    )}
                    title={`${date}: ${c} solve${c !== 1 ? "s" : ""}`}
                  />
                );
              })
            )}
          </div>
        </div>

        {stats && (
          <div className="grid grid-cols-3 gap-4 text-center text-white mt-6">
            <div>
              <div className="text-xl md:text-2xl font-semibold">
                {stats.totalAll}
              </div>
              <div className="text-xs md:text-sm text-gray-400">
                total POTDs solved
              </div>
            </div>
            <div>
              <div className="text-xl md:text-2xl font-semibold">
                {stats.maxStreak} days
              </div>
              <div className="text-xs md:text-sm text-gray-400">max streak</div>
            </div>
            <div>
              <div className="text-xl md:text-2xl font-semibold">
                {stats.curStreak} days
              </div>
              <div className="text-xs md:text-sm text-gray-400">
                current streak
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
