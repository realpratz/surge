import { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface Problem {
  rating?: number;
}

export default function ProblemRatingBar({ handle }: { handle: string }) {
  const [data, setData] = useState<{ rating: number; count: number }[]>([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/account/${handle}/solved`, {
        withCredentials: true,
      })
      .then((res) => {
        const ratingCount: Record<number, number> = {};
        res.data.forEach((p: Problem) => {
          if (p.rating)
            ratingCount[p.rating] = (ratingCount[p.rating] || 0) + 1;
        });

        const result = Object.entries(ratingCount)
          .map(([rating, count]) => ({ rating: Number(rating), count }))
          .sort((a, b) => a.rating - b.rating);

        setData(result);
      });
  }, [handle]);

  return (
    <div>
      <h2 className="text-white text-xl mb-4 mt-4">
        Problems <span className="text-gray-400">Solved</span>
      </h2>
      <div className="bg-highlight-dark p-6 rounded-lg">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <XAxis dataKey="rating" tick={{ fill: "white" }} />
            <YAxis tick={{ fill: "white" }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1f2937", // gray-800
                border: "1px solid #374151", // gray-700
                borderRadius: "8px",
              }}
              labelStyle={{ color: "#f9fafb" }} // gray-50
              itemStyle={{ color: "#f9fafb" }} // gray-50
            />{" "}
            <Bar dataKey="count" fill="rgba(235, 87, 87, 1)" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
