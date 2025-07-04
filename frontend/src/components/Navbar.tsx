import { Link } from "@tanstack/react-router";

export default function Navbar() {
  return (
    <nav className="fixed inset-y-0 left-0 w-30 bg-highlight-dark text-white flex flex-col items-center py-4 shadow-lg z-50">
      <Link to="/" className="mb-16 mt-6">
        <img src="/logo.png" alt="Logo" className="w-14 h-14" />
      </Link>

      <div className="flex flex-col items-center gap-12 flex-grow mt-4">
        <Link to="/" className="hover:text-white">
          <span className="material-symbols-outlined  text-highlight-light">
            home
          </span>
        </Link>
        <Link to="/leaderboard" className="hover:text-white">
          <span className="material-symbols-outlined  text-highlight-light">
            emoji_events
          </span>
        </Link>
        <Link to="/stats" className="hover:text-white">
          <span className="material-symbols-outlined text-highlight-light">
            swords
          </span>
        </Link>
        <Link to="/resource" className="hover:text-white">
          <span className="material-symbols-outlined text-[48px] text-highlight-light">
            book_ribbon
          </span>
        </Link>
      </div>

      <div className="mb-4">
        <Link to="/profile" className="hover:text-white">
          <span className="material-symbols-outlined text-highlight-light">
            account_circle
          </span>
        </Link>
      </div>
    </nav>
  );
}
