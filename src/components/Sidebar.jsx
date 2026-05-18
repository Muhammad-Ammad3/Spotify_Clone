import { Home, Search, PlusCircle, Menu, X } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useState } from "react";

const Sidebar = () => {
  const [open, setOpen] = useState(false);

  const linkStyles = ({ isActive }) =>
    `flex items-center gap-4 p-3 rounded-xl transition-all duration-200 group ${
      isActive
        ? "bg-white text-black shadow-lg"
        : "hover:bg-white/10 text-gray-400 hover:text-white"
    }`;

  return (
    <>
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 flex items-center justify-between px-4 bg-black/95 backdrop-blur-xl border-b border-gray-800 z-50">
        <h1 className="text-2xl font-bold bg-linear-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
          Spotify
        </h1>
        <button
          onClick={() => setOpen(!open)}
          className="p-2 rounded-lg hover:bg-white/10 transition-all"
        >
          {open ? (
            <X className="w-6 h-6 text-white" />
          ) : (
            <Menu className="w-6 h-6 text-white" />
          )}
        </button>
      </div>

      {open && (
        <div
          onClick={() => setOpen(false)}
          className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
        />
      )}

      <div
        className={`fixed md:static top-0 left-0 h-screen md:h-full w-70 sm:w-[320px] md:w-64 bg-black/95 flex flex-col p-5 md:p-6 border-r border-gray-800 text-white z-50 transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="mt-14 md:mt-0 mb-10 md:mb-12 pl-2">
          <h1 className="text-3xl font-bold bg-linear-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent tracking-tighter">
            Spotify
          </h1>
        </div>

        <nav className="flex-1">
          <ul className="space-y-3">
            <li>
              <NavLink
                to="/"
                className={linkStyles}
                onClick={() => setOpen(false)}
              >
                <Home className="w-5 h-5 group-hover:scale-105 transition-transform" />
                <span className="font-semibold text-sm sm:text-base">Home</span>
              </NavLink>
            </li>
            <li>
              <NavLink className={linkStyles} onClick={() => setOpen(false)}>
                <Search className="w-5 h-5 group-hover:scale-105 transition-transform" />
                <span className="font-semibold text-sm sm:text-base">
                  Search
                </span>
              </NavLink>
            </li>
          </ul>
        </nav>

        <div className="mt-auto border-t border-gray-800 pt-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-4 pl-2">
            <h3 className="font-semibold text-xs uppercase tracking-wider text-gray-400">
              Playlists
            </h3>
            <PlusCircle className="w-5 h-5 text-gray-400 hover:text-white transition-colors cursor-pointer" />
          </div>

          {/* Playlist List */}
          <ul className="space-y-1 max-h-64 overflow-y-auto pr-1">
            {[
              "Chill Hits",
              "Daily Mix 1",
              "Workout Beats",
              "Party Playlist",
              "Top Global",
              "Sad Songs",
              "Focus Mode",
            ].map((playlist) => (
              <li key={playlist}>
                <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white cursor-pointer transition-all duration-150 group">
                  <div className="w-8 h-8 bg-linear-to-br from-purple-600 to-pink-500 rounded shrink-0 group-hover:scale-105 transition-transform" />
                  <span className="truncate font-medium text-sm sm:text-base">
                    {playlist}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
