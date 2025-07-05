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

        const result = Object.entries(tagCount).map(([name, value]) => ({
          name,
          value,
        }));
        setData(result);
      });
  }, [handle]);

  const COLORS = [
    "#f87171",
    "#60a5fa",
    "#facc15",
    "#34d399",
    "#a78bfa",
    "#f472b6",
    "#fb923c",
    "#4ade80",
    "#fcd34d",
    "#c084fc",
  ];

  return (
    <div>
      <h2 className="text-white text-xl mb-4 mt-4">
        Tags <span className="text-gray-400">Distribution</span>
      </h2>

      <div className="bg-highlight-dark p-6 rounded-lg">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              dataKey="value"
              data={data}
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
            >
              {data.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
