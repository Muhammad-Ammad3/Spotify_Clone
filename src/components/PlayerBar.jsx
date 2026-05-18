import {
  Shuffle,
  SkipBack,
  Play,
  Pause,
  SkipForward,
  Repeat,
  Volume2,
  Maximize2,
  ChevronDown,
  List,
} from "lucide-react";
import { usePlayer } from "../context/PlayerContext";
import { useRef } from "react";

const PlayerBar = () => {
  const {
    currentTrack,
    playStatus,
    time,
    play,
    pause,
    next,
    previous,
    seekSong,
    audioRef,
    changeVolume,
  } = usePlayer();

  const progressRef = useRef(null);

  const handlePlayPause = () => {
    playStatus ? pause() : play();
  };

  const getProgressPercent = () => {
    if (audioRef.current && audioRef.current.duration) {
      return (audioRef.current.currentTime / audioRef.current.duration) * 100;
    }
    return 0;
  };

  const progressPercent = getProgressPercent();

  return (
    <div className="w-full h-19 md:h-22.5 bg-linear-to-t from-gray-900 to-gray-800 backdrop-blur-lg border-t border-gray-700 flex flex-row items-center justify-between gap-2 md:gap-4 px-3 sm:px-4 md:px-6 shadow-2xl text-white fixed bottom-0 left-0 z-50">
      <div className="flex items-center gap-2 sm:gap-3 w-[40%] md:w-auto md:flex-1 min-w-0">
        <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-lg overflow-hidden shadow-lg ring-2 ring-white/20 shrink-0">
          {currentTrack?.artwork ? (
            <img
              src={currentTrack.artwork}
              alt={currentTrack?.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-linear-to-br from-gray-700 to-gray-600 animate-pulse" />
          )}
        </div>

        <div className="min-w-0 flex-1">
          <p className="font-semibold text-xs sm:text-sm md:text-base truncate text-white">
            {currentTrack?.title || "No track selected"}
          </p>
          <p className="text-[10px] sm:text-xs md:text-sm text-gray-400 truncate">
            {currentTrack?.artist || "Unknown Artist"}
          </p>
        </div>

        <ChevronDown className="hidden lg:block w-5 h-5 text-gray-400 cursor-pointer hover:text-white transition-colors shrink-0" />
      </div>

      <div className="flex flex-col items-center justify-center w-[55%] md:w-auto md:flex-1 max-w-2xl">
        <div className="flex items-center gap-3 sm:gap-4 md:gap-5 mb-1 md:mb-2">
          <Shuffle className="hidden sm:block w-5 h-5 text-gray-400 cursor-pointer hover:text-white transition-colors" />
          <SkipBack
            onClick={previous}
            className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 cursor-pointer hover:scale-110 transition-all duration-200 text-gray-400 hover:text-white"
          />

          <div
            onClick={handlePlayPause}
            className="w-8 h-8 sm:w-10 sm:h-10 md:w-11 md:h-11 bg-white rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:scale-105 transition-all duration-200"
          >
            {playStatus ? (
              <Pause
                className="w-4 h-4 md:w-5 md:h-5 text-black"
                fill="currentColor"
              />
            ) : (
              <Play
                className="w-4 h-4 md:w-5 md:h-5 ml-0.5 text-black"
                fill="currentColor"
              />
            )}
          </div>

          <SkipForward
            onClick={next}
            className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 cursor-pointer hover:scale-110 transition-all duration-200 text-gray-400 hover:text-white"
          />
          <Repeat className="hidden sm:block w-5 h-5 text-gray-400 cursor-pointer hover:text-white transition-colors" />
        </div>

        <div className="hidden sm:flex items-center gap-2 sm:gap-3 w-full">
          <span className="text-[10px] sm:text-xs text-gray-400 font-mono min-w-8.75 text-right">
            {time.currentTime || "0:00"}
          </span>

          <div
            ref={progressRef}
            onClick={seekSong}
            className="flex-1 h-1 hover:h-1.5 bg-gray-700 rounded-full cursor-pointer relative group transition-all duration-150"
          >
            <div
              className="absolute top-0 left-0 h-full bg-linear-to-r from-emerald-500 to-green-500 rounded-full group-hover:bg-green-400"
              style={{ width: `${progressPercent}%` }}
            >
              <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 w-3 h-3 bg-white rounded-full scale-0 group-hover:scale-100 transition-all duration-100 shadow-lg" />
            </div>
          </div>

          <span className="text-[10px] sm:text-xs text-gray-400 font-mono min-w-8.75">
            {time.totalTime || "0:00"}
          </span>
        </div>
      </div>

      <div className="hidden md:flex items-center gap-3 lg:gap-4 text-gray-400 md:flex-1 justify-end">
        <Volume2 className="w-5 h-5 cursor-pointer hover:text-white transition-colors" />
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          defaultValue="1"
          onChange={(e) => changeVolume(e.target.value)}
          className="w-20 lg:w-24 accent-green-500 cursor-pointer"
        />
        <List className="hidden lg:block w-5 h-5 cursor-pointer hover:text-white transition-colors" />
        <Maximize2 className="hidden lg:block w-5 h-5 cursor-pointer hover:text-white transition-colors" />
      </div>
    </div>
  );
};

export default PlayerBar;
