export function getRatingLevel(rating: number | null): string {
  if (rating === null || rating === undefined) return "Unrated";
  if (rating < 1200) return "Newbie";
  if (rating < 1400) return "Pupil";
  if (rating < 1600) return "Specialist";
  if (rating < 1900) return "Expert";
  if (rating < 2100) return "Candidate Master";
  if (rating < 2300) return "Master";
  if (rating < 2400) return "International Master";
  return "Grandmaster";
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
