import { useEffect, useState } from "react";
import axios from "axios";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

export default function TagPieChart({ handle }: { handle: string }) {
  const [data, setData] = useState<{ name: string; value: number }[]>([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/account/${handle}/solved`, {
        withCredentials: true,
      })
      .then((res) => {
        const tagCount: Record<string, number> = {};
        res.data.forEach((p: any) => {
          p.tags.forEach((tag: string) => {
            tagCount[tag] = (tagCount[tag] || 0) + 1;
          });
        });

        const result = Object.entries(tagCount)
          .map(([name, value]) => ({ name, value }))
          .sort((a, b) => b.value - a.value); // sort descending

        setData(result);
      });
  }, [handle]);

  const COLORS = [
    "#f87171",
    "#fb923c",
    "#facc15",
    "#4ade80",
    "#34d399",
    "#60a5fa",
    "#818cf8",
    "#a78bfa",
    "#f472b6",
    "#e879f9",
    "#c084fc",
    "#22d3ee",
    "#2dd4bf",
    "#86efac",
    "#fde68a",
    "#fcd34d",
    "#fbbf24",
    "#f97316",
    "#ef4444",
    "#e11d48",
    "#10b981",
    "#93c5fd",
    "#c7d2fe",
    "#fda4af",
  ];

  return data.length ? (
    <div>
      <h2 className="text-white text-xl mb-4 mt-4">
        Tags <span className="text-gray-400">Solved</span>
      </h2>

      <div className="bg-highlight-dark p-4 md:p-6 rounded-lg flex flex-col md:flex-row gap-4">
        {/* Pie chart container */}
        <div className="w-full md:w-[60%] h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                dataKey="value"
                data={data}
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={130}
                paddingAngle={0}
              >
                {data.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1f2937",
                  border: "1px solid #374151",
                  borderRadius: "8px",
                }}
                labelStyle={{ color: "#f9fafb" }}
                itemStyle={{ color: "#f9fafb" }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Legend container */}
        <div className="w-full md:w-[40%] max-h-[400px] overflow-y-auto pr-4">
          <ul className="text-sm space-y-1 text-white">
            {data.map((entry, index) => (
              <li key={index} className="flex items-center gap-2">
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                ></span>
                {entry.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  ) : null;
}
