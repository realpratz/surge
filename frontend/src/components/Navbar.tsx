import {
  HomeIcon,
  TrophyIcon,
  ChartBarIcon,
  BookOpenIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import { Link } from "@tanstack/react-router";

export default function Navbar() {
  return (
    <nav className="fixed inset-y-0 left-0 w-30 bg-highlight-dark text-white flex flex-col items-center py-4 shadow-lg">
      <Link to="/" className="mb-16 mt-6">
        <img src="/logo.png" alt="Logo" className="w-14 h-14" />
      </Link>

      <div className="flex flex-col items-center gap-12 flex-grow mt-4">
        <Link to="/" className="text-highlight-light hover:text-white">
          <HomeIcon className="w-12 h-12" />
        </Link>
        <Link
          to="/leaderboard"
          className="text-highlight-light hover:text-white"
        >
          <TrophyIcon className="w-12 h-12" />
        </Link>
        <Link to="/stats" className="text-highlight-light hover:text-white">
          <ChartBarIcon className="w-12 h-12" />
        </Link>
        <Link to="/resource" className="text-highlight-light hover:text-white">
          <BookOpenIcon className="w-12 h-12" />
        </Link>
      </div>

      <div className="mb-4">
        <Link to="/profile" className="text-highlight-light hover:text-white">
          <UserIcon className="w-12 h-12" />
        </Link>
      </div>
    </nav>
  );
}
