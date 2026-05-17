import { Play, Pause, MoreHorizontal, Clock } from "lucide-react";
import { usePlayer } from "../context/PlayerContext";

const SongItem = ({ song, index, isActive, onClick }) => {
  const { playStatus, playWithId } = usePlayer();

  const handlePlay = () => {
    playWithId(song.id);
  };

  return (
    <div
      onClick={onClick || handlePlay}
      className={`flex items-center gap-2 sm:gap-3 md:gap-4 p-2 sm:p-3 rounded-xl cursor-pointer transition-all duration-200 hover:bg-white/10 group select-none ${
        isActive ? "bg-white/10 border border-white/10 shadow-lg" : ""
      }`}
    >
      <div className="w-6 sm:w-8 shrink-0 flex items-center justify-center text-sm font-medium">
        {isActive ? (
          playStatus ? (
            <Pause className="w-4 h-4 text-green-500" fill="currentColor" />
          ) : (
            <Play className="w-4 h-4 text-green-500" fill="currentColor" />
          )
        ) : (
          <>
            <span className="block group-hover:hidden text-gray-400 text-xs sm:text-sm">
              {index}
            </span>
            <Play
              className="hidden group-hover:block w-4 h-4 text-white"
              fill="currentColor"
            />
          </>
        )}
      </div>

      <div className="min-w-0 flex-1 flex items-center gap-2 sm:gap-3">
        <img
          src={song.artwork || song.image || "https://via.placeholder.com/100"}
          alt={song.title}
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg object-cover shrink-0 shadow-md"
        />
        <div className="min-w-0">
          <p
            className={`font-semibold text-xs sm:text-sm md:text-base truncate ${isActive ? "text-green-500" : "text-white"}`}
          >
            {song.title || song.name}
          </p>
          <p className="text-[11px] sm:text-xs md:text-sm text-gray-400 truncate">
            {song.artist || song.desc}
          </p>
        </div>
      </div>

      <div className="hidden lg:block min-w-0 flex-1">
        <p className="text-sm text-gray-400 truncate">
          {song.album || "Single"}
        </p>
      </div>

      <div className="flex items-center gap-2 sm:gap-4 shrink-0">
        <div className="flex items-center gap-1 text-gray-400">
          <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          <span className="text-[10px] sm:text-xs font-mono">
            {song.duration || "3:00"}
          </span>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            console.log("Track options:", song.title);
          }}
          className="opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity p-1 rounded-full hover:bg-white/10"
        >
          <MoreHorizontal className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 hover:text-white" />
        </button>
      </div>
    </div>
  );
};

export default SongItem;
