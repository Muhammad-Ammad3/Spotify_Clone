import {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
  useCallback,
} from "react";

import { songsData as localSongsData } from "../data/songs";

const PlayerContext = createContext();

export const usePlayer = () => {
  const context = useContext(PlayerContext);

  if (!context) {
    throw new Error("usePlayer must be used within PlayerProvider");
  }

  return context;
};

export const PlayerProvider = ({ children }) => {
  const [songsData, setSongsData] = useState([]);
  const [albumsData, setAlbumsData] = useState([]);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [playStatus, setPlayStatus] = useState(false);
  const [loading, setLoading] = useState(true);

  const [time, setTime] = useState({
    currentTime: "00:00",
    totalTime: "00:00",
  });

  const audioRef = useRef(null);

  const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) return "00:00";

    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);

    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  useEffect(() => {
    try {
      setLoading(true);

      const formattedSongs = localSongsData.map((track, index) => {
        const trackTitle = track.title || `Track ${index + 1}`;
        const fileName = trackTitle.toLowerCase().replace(/\s+/g, '');

        return {
          id: track.id,
          title: trackTitle,
          artist: track.artist?.name || "Unknown Artist",
          album: track.album?.title || "Unknown Album",
          albumId: track.album?.id,
          duration: formatTime(track.duration),
          artwork:
            track.album?.cover_big ||
            track.album?.cover_medium ||
            "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&q=80",
          
          preview: track.preview || `/songs/${fileName}.mp3`,
        };
      });

      setSongsData(formattedSongs);

      // 2. Har Album ke andar uske gane (songs array) filter karke dalna
      const uniqueAlbums = [];
      const albumIds = new Set();

      localSongsData.forEach((item) => {
        if (item.album && !albumIds.has(item.album.id)) {
          albumIds.add(item.album.id);

          const albumSongs = formattedSongs.filter(
            (song) => song.albumId === item.album.id
          );

          uniqueAlbums.push({
            id: item.album.id,
            title: item.album.title,
            artwork: item.album.cover_big || item.album.cover_medium,
            description: `A collection of hits from ${item.artist?.name || "various artists"}.`,
            songs: albumSongs, 
          });
        }
      });

      setAlbumsData(uniqueAlbums);

      if (formattedSongs.length > 0) {
        setCurrentTrack(formattedSongs[0]);
      }
    } catch (error) {
      console.log("Local Data Error:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentTrack) return;

    audio.src = currentTrack.preview;
    audio.load();

    if (playStatus) {
      audio
        .play()
        .catch((err) => console.log("Play failed on track change:", err));
    }
  }, [currentTrack]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !audio.src) return;

    if (playStatus) {
      audio.play().catch((err) => console.log("Play failed on toggle:", err));
    } else {
      audio.pause();
    }
  }, [playStatus]);

  const play = useCallback(async () => {
    try {
      if (!audioRef.current) return;
      await audioRef.current.play();
      setPlayStatus(true);
    } catch (error) {
      console.log("Play Error:", error);
    }
  }, []);

  const pause = useCallback(() => {
    if (!audioRef.current) return;
    audioRef.current.pause();
    setPlayStatus(false);
  }, []);

  const playWithId = useCallback(
    async (id) => {
      const track = songsData.find((song) => song.id === id);
      if (!track) return;

      setCurrentTrack(track);
      setPlayStatus(true);

      setTimeout(async () => {
        try {
          if (audioRef.current) await audioRef.current.play();
        } catch (error) {
          console.log("Play with ID Error:", error);
        }
      }, 200);
    },
    [songsData]
  );

  const next = useCallback(() => {
    if (!currentTrack || songsData.length === 0) return;

    const currentIndex = songsData.findIndex(
      (song) => song.id === currentTrack.id
    );

    const nextIndex = (currentIndex + 1) % songsData.length;
    playWithId(songsData[nextIndex].id);
  }, [songsData, currentTrack, playWithId]);

  const previous = useCallback(() => {
    if (!currentTrack || songsData.length === 0) return;

    const currentIndex = songsData.findIndex(
      (song) => song.id === currentTrack.id
    );

    const prevIndex =
      currentIndex === 0 ? songsData.length - 1 : currentIndex - 1;

    playWithId(songsData[prevIndex].id);
  }, [songsData, currentTrack, playWithId]);

  const seekSong = useCallback((e) => {
    if (!audioRef.current) return;

    const width = e.currentTarget.offsetWidth;
    const clickX = e.nativeEvent.offsetX;
    const duration = audioRef.current.duration;

    if (duration && !isNaN(duration)) {
      audioRef.current.currentTime = (clickX / width) * duration;
    }
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const update = () => {
      setTime({
        currentTime: formatTime(audio.currentTime),
        totalTime: formatTime(audio.duration),
      });
    };

    const handleEnded = () => {
      next();
    };

    audio.addEventListener("timeupdate", update);
    audio.addEventListener("loadedmetadata", update);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", update);
      audio.removeEventListener("loadedmetadata", update);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [next]);

  const changeVolume = (volume) => {
    if (!audioRef.current) return;
    audioRef.current.volume = volume;
  };

  const value = {
    songsData,
    albumsData,
    currentTrack,
    playStatus,
    loading,
    time,
    play,
    pause,
    playWithId,
    next,
    previous,
    changeVolume,
    seekSong,
    audioRef,
    setCurrentTrack,
  };

  return (
    <PlayerContext.Provider value={value}>
      {children}
      <audio ref={audioRef} preload="auto" />
    </PlayerContext.Provider>
  );
};