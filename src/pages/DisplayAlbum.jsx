import { useParams, useNavigate } from "react-router-dom";
import { usePlayer } from "../context/PlayerContext";
import SongItem from "../components/SongItem";
import { ChevronLeft, Music, Clock, Play } from "lucide-react";
import SkeletonLoader from "../components/SkeletonLoader";
import { useEffect, useState } from "react";

const DisplayAlbum = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { albumsData, loading, playWithId, currentTrack } = usePlayer();
  const [album, setAlbum] = useState(null);

  useEffect(() => {
    const foundAlbum = albumsData.find((a) => String(a.id) === String(id));
    setAlbum(foundAlbum);
  }, [id, albumsData]);

  if (loading || !album) {
    return (
      <div className="p-4 sm:p-6 md:p-10 bg-neutral-950 min-h-screen text-white">
        <SkeletonLoader count={8} viewType="list" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-neutral-900 via-neutral-950 to-black text-white overflow-y-auto px-4 sm:px-6 md:px-10 lg:px-12 py-6 md:py-10 select-none">
      <button
        onClick={() => navigate("/")}
        className="flex items-center gap-2 mb-6 md:mb-8 text-gray-400 hover:text-white transition-colors p-2 rounded-full hover:bg-white/5"
      >
        <ChevronLeft className="w-5 h-5" />
        <span className="text-sm font-medium">Back</span>
      </button>

      <div className="flex flex-col md:flex-row items-center md:items-end gap-6 md:gap-8 mb-10 text-center md:text-left">
        <div className="relative w-44 h-44 sm:w-52 md:w-64 md:h-64 rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10 shrink-0 group">
          <img
            src={album.artwork}
            alt={album.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
            <button
              onClick={() => album.songs?.[0] && playWithId(album.songs[0].id)}
              className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-all duration-300"
            >
              <Play className="w-6 h-6 text-black ml-1" fill="currentColor" />
            </button>
          </div>
        </div>

        <div className="max-w-3xl min-w-0">
          <span className="inline-block px-3 py-1 bg-white/10 rounded-full text-[10px] sm:text-xs font-semibold uppercase tracking-wider mb-3 text-green-400">
            Playlist
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-3 leading-tight tracking-tight wrap-break-word">
            {album.title}
          </h1>
          <p className="text-sm sm:text-base text-gray-400 mb-5 line-clamp-3">
            {album.description}
          </p>
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 sm:gap-6 text-xs sm:text-sm text-gray-400 font-medium">
            <span className="flex items-center gap-1.5">
              <Music className="w-4 h-4 text-green-500" />
              <span className="text-white font-semibold">
                {album.songs?.length || 0} songs
              </span>
            </span>
            {album.songs?.length > 0 && (
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                <span>~ {album.songs.length * 3} mins</span>
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="mt-6">
        <div className="hidden md:flex items-center gap-4 text-xs font-bold uppercase tracking-wider text-gray-500 border-b border-neutral-800 pb-3 mb-4 px-3">
          <span className="w-8 text-center">#</span>
          <span className="flex-1">Title</span>
          <span className="flex-1">Album</span>
          <span className="w-20 text-right pr-4">
            <Clock className="inline w-3.5 h-3.5" />
          </span>
        </div>

        <div className="space-y-1 pb-32">
          {album.songs?.map((song, index) => (
            <SongItem
              key={song.id}
              song={song}
              index={index + 1}
              isActive={currentTrack?.id === song.id}
              onClick={() => playWithId(song.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DisplayAlbum;
