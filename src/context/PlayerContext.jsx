import {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
  useCallback,
} from "react";

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
    const fetchSongs = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://corsproxy.io/?https://api.deezer.com/chart",
        );
        const data = await response.json();

        const fallbackSongs = [
          "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
          "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
          "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
          "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
          "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
        ];

        const tracks = (data.tracks?.data || []).map((track, index) => ({
          id: track.id || index + 1,
          title: track.title || "Unknown Track",
          artist: track.artist?.name || "Unknown Artist",
          album: track.album?.title || "Unknown Album",
          duration: formatTime(track.duration),
          artwork:
            track.album?.cover_big ||
            track.album?.cover_medium ||
            "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&q=80",
          preview: fallbackSongs[index % fallbackSongs.length],
        }));

        const albums = (data.albums?.data || []).slice(0, 5).map((album) => ({
          id: album.id,
          title: album.title,
          artwork: album.cover_big,
          description: `Top Album by ${album.artist?.name}`,
          songs: tracks,
        }));

        setSongsData(tracks);
        setAlbumsData(albums);
        if (tracks.length > 0) {
          setCurrentTrack(tracks[0]);
        }
      } catch (error) {
        console.log("Error:", error);
        const demoSongs = [
          {
            id: 1,
            title: "Dream Escape",
            artist: "Alan Walker",
            album: "Top Hits",
            duration: "03:20",
            artwork:
              "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&q=80",
            preview:
              "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
          },
          {
            id: 2,
            title: "Night Vibes",
            artist: "Dua Lipa",
            album: "Future Sounds",
            duration: "04:10",
            artwork:
              "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=500&q=80",
            preview:
              "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
          },
          {
            id: 3,
            title: "Summer Beats",
            artist: "The Weeknd",
            album: "Chill Mix",
            duration: "02:58",
            artwork:
              "https://images.unsplash.com/photo-1501612780327-45045538702b?w=500&q=80",
            preview:
              "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
          },
        ];
        setSongsData(demoSongs);
        setAlbumsData([
          {
            id: 1,
            title: "Today's Top Hits",
            artwork:
              "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500&q=80",
            description: "Trending Music Collection",
            songs: demoSongs,
          },
        ]);
        setCurrentTrack(demoSongs[0]);
      } finally {
        setLoading(false);
      }
    };
    fetchSongs();
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentTrack) return;
    audio.src = currentTrack.preview;
    audio.load();

    if (playStatus) {
      audio.play().catch((err) => console.log(err));
    }
  }, [currentTrack]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !audio.src) return;

    if (playStatus) {
      audio.play().catch((err) => console.log(err));
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
          await audioRef.current.play();
        } catch (error) {
          console.log(error);
        }
      }, 200);
    },
    [songsData],
  );

  const next = useCallback(() => {
    if (!currentTrack || songsData.length === 0) return;
    const currentIndex = songsData.findIndex(
      (song) => song.id === currentTrack.id,
    );
    const nextIndex = (currentIndex + 1) % songsData.length;
    playWithId(songsData[nextIndex].id);
  }, [songsData, currentTrack, playWithId]);

  const previous = useCallback(() => {
    if (!currentTrack || songsData.length === 0) return;
    const currentIndex = songsData.findIndex(
      (song) => song.id === currentTrack.id,
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
    audioRef.current.currentTime = (clickX / width) * duration;
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
