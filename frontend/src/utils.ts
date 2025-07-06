export function getRatingLevel(rating: number | null): string {
  if (rating === null || rating === undefined) return "Unrated";
  if (rating < 1200) return "Newbie";
  if (rating < 1400) return "Pupil";
  if (rating < 1600) return "Specialist";
  if (rating < 1900) return "Expert";
  if (rating < 2100) return "Candidate Master";
  if (rating < 2300) return "Master";
  if (rating < 2400) return "International Master";
  if (rating < 2600) return "Grandmaster";
  if (rating < 3000) return "International Grandmaster";
  return "Legendary Grandmaster";
}

export function getRatingColor(rating: number | null): string {
  if (!rating) return "text-gray-400";
  if (rating < 1200) return "text-gray-300";
  if (rating < 1400) return "text-green-400";
  if (rating < 1600) return "text-cyan-400";
  if (rating < 1900) return "text-blue-400";
  if (rating < 2100) return "text-purple-400";
  if (rating < 2300) return "text-yellow-400";
  if (rating < 2400) return "text-orange-400";
  return "text-red-400";
}

export function getRatingBand(rating: number | null): [number, number] {
  rating = rating ?? 0;
  if (rating < 1200) return [0, 1199];
  if (rating < 1400) return [1200, 1399];
  if (rating < 1600) return [1400, 1599];
  if (rating < 1900) return [1600, 1899];
  if (rating < 2100) return [1900, 2099];
  if (rating < 2300) return [2100, 2299];
  if (rating < 2400) return [2300, 2399];
  if (rating < 2600) return [2400, 2599];
  if (rating < 3000) return [2600, 2999];
  return [3000, 3999];
}
