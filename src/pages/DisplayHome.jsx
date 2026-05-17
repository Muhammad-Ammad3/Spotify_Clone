import { usePlayer } from "../context/PlayerContext";
import AlbumItem from "../components/AlbumItem";
import SongItem from "../components/SongItem";
import SkeletonLoader from "../components/SkeletonLoader";
import { useNavigate } from "react-router-dom";
import { TrendingUp, Music2 } from "lucide-react";

const DisplayHome = () => {
  const { albumsData, songsData, loading, currentTrack, playWithId } =
    usePlayer();
  const navigate = useNavigate();

  const handleAlbumClick = (album) => {
    navigate(`/album/${album.id}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-950 p-4 sm:p-6 md:p-10 space-y-10">
        <div>
          <div className="h-8 w-48 bg-neutral-800 rounded-lg animate-pulse mb-8" />
          <SkeletonLoader count={5} viewType="grid" />
        </div>
        <div>
          <div className="h-8 w-56 bg-neutral-800 rounded-lg animate-pulse mb-8" />
          <SkeletonLoader count={8} viewType="list" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-neutral-900 via-neutral-950 to-black text-white overflow-y-auto px-4 sm:px-6 md:px-10 lg:px-12 py-6 md:py-10 space-y-12 select-none">
      <div className="relative overflow-hidden rounded-3xl p-6 sm:p-8 md:p-10 bg-linear-to-r from-green-500/20 via-emerald-500/10 to-transparent border border-white/10 shadow-2xl">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-xs sm:text-sm font-semibold mb-4">
            <TrendingUp className="w-4 h-4 text-green-400" />
            Trending Worldwide
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight mb-4">
            Feel the beat <br />
            <span className="bg-linear-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
              everywhere.
            </span>
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-gray-300 max-w-xl">
            Discover trending songs, top albums, and premium vibes with your
            Spotify Clone.
          </p>
        </div>
        <div className="absolute -top-20 -right-20 w-72 h-72 bg-green-500/20 blur-3xl rounded-full" />
      </div>

      <section>
        <div className="flex items-center gap-3 mb-6">
          <TrendingUp className="w-7 h-7 text-green-400" />
          <h2 className="text-2xl md:text-3xl font-black tracking-tight">
            Featured Charts
          </h2>
        </div>
        <div className="flex gap-4 sm:gap-6 overflow-x-auto pb-4 snap-x custom-scrollbar">
          {albumsData.map((album) => (
            <div
              key={album.id}
              className="snap-start shrink-0 w-45 sm:w-55 md:w-60"
            >
              <AlbumItem
                album={album}
                onClick={() => handleAlbumClick(album)}
              />
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="flex items-center gap-3 mb-6">
          <Music2 className="w-7 h-7 text-green-400" />
          <h2 className="text-2xl md:text-3xl font-black tracking-tight">
            Today's Biggest Hits
          </h2>
        </div>
        <div className="space-y-1 max-h-[60vh] overflow-y-auto pr-1 custom-scrollbar pb-28">
          {songsData.slice(0, 20).map((song, index) => (
            <SongItem
              key={song.id}
              song={song}
              index={index + 1}
              isActive={currentTrack?.id === song.id}
              onClick={() => playWithId(song.id)}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default DisplayHome;
