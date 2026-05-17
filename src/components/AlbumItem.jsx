import { MoreHorizontal } from "lucide-react";

const AlbumItem = ({ album, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="group relative w-full bg-linear-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl p-3 sm:p-4 md:p-5 lg:p-6 hover:bg-white/10 transition-all duration-300 hover:scale-[1.02] md:hover:scale-105 cursor-pointer shadow-2xl border border-gray-700 hover:border-white/20 overflow-hidden"
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 bg-linear-to-t from-green-500/5 to-transparent" />

      <div className="relative mb-4">
        <div className="w-full aspect-square max-w-35 sm:max-w-42 md:max-w-47 mx-auto rounded-xl overflow-hidden shadow-2xl group-hover:scale-105 transition-transform duration-500">
          <img
            src={album.artwork}
            alt={album.title}
            className="w-full h-full object-cover group-hover:brightness-110 transition-all duration-500"
          />
        </div>

        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
          <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-green-500 rounded-full flex items-center justify-center shadow-2xl scale-0 group-hover:scale-100 transition-all duration-300">
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6 ml-1 text-black"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      </div>

      <div className="text-center relative z-10">
        <h3 className="font-bold text-sm sm:text-base md:text-lg lg:text-xl mb-1 truncate text-white">
          {album.title}
        </h3>
        <p className="text-gray-400 text-xs sm:text-sm truncate">
          {album.description}
        </p>
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation();
          console.log("More clicked:", album.title);
        }}
        className="absolute top-3 right-3 md:top-4 md:right-4 p-1.5 rounded-full bg-black/40 backdrop-blur-sm opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-200 hover:bg-white/20"
      >
        <MoreHorizontal className="w-4 h-4 sm:w-5 sm:h-5 text-gray-300 hover:text-white" />
      </button>
    </div>
  );
};

export default AlbumItem;
