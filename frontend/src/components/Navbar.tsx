import { Link } from "@tanstack/react-router";

export default function Navbar() {
  return (
    <nav className="fixed inset-y-0 left-0 w-30 bg-highlight-dark text-white flex flex-col items-center py-4 shadow-lg z-50">
      <Link to="/" className="mb-16 mt-6">
        <img src="/logo-v2.png" alt="Logo" className="w-14 h-14" />
      </Link>

      <div className="flex flex-col items-center gap-12 flex-grow mt-4">
        <Link
          to="/"
          className="group transition-all duration-200 hover:scale-110"
          activeProps={{
            className: "group transition-all duration-200 hover:scale-110",
          }}
        >
          <span className="material-symbols-outlined text-highlight-light group-hover:text-white transition-colors duration-200 [.active_&]:text-white [.active_&]:drop-shadow-lg">
            home
          </span>
        </Link>
        <Link
          to="/leaderboard"
          className="group transition-all duration-200 hover:scale-110"
          activeProps={{
            className:
              "group transition-all duration-200 hover:scale-110 active",
          }}
        >
          <span className="material-symbols-outlined text-highlight-light group-hover:text-white transition-colors duration-200 [.active_&]:text-white [.active_&]:drop-shadow-lg">
            emoji_events
          </span>
        </Link>
        <Link
          to="/stats"
          className="group transition-all duration-200 hover:scale-110"
          activeProps={{
            className:
              "group transition-all duration-200 hover:scale-110 active",
          }}
        >
          <span className="material-symbols-outlined text-highlight-light group-hover:text-white transition-colors duration-200 [.active_&]:text-white [.active_&]:drop-shadow-lg">
            swords
          </span>
        </Link>
        <Link
          to="/resource"
          className="group transition-all duration-200 hover:scale-110"
          activeProps={{
            className:
              "group transition-all duration-200 hover:scale-110 active",
          }}
        >
          <span className="material-symbols-outlined text-highlight-light group-hover:text-white transition-colors duration-200 [.active_&]:text-white [.active_&]:drop-shadow-lg">
            book_ribbon
          </span>
        </Link>
      </div>

      <div className="mb-4">
        <Link
          to="/profile"
          className="group transition-all duration-200 hover:scale-110"
          activeProps={{
            className:
              "group transition-all duration-200 hover:scale-110 active",
          }}
        >
          <span className="material-symbols-outlined text-highlight-light group-hover:text-white transition-colors duration-200 [.active_&]:text-white [.active_&]:drop-shadow-lg">
            account_circle
          </span>
        </Link>
      </div>
    </nav>
  );
}
