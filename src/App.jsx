import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { PlayerProvider, usePlayer } from "./context/PlayerContext";
import Sidebar from "./components/Sidebar";
import PlayerBar from "./components/PlayerBar";
import DisplayHome from "./pages/DisplayHome";
import DisplayAlbum from "./pages/DisplayAlbum";
import { useEffect } from "react";

function Display() {
  const { playWithId, songsData } = usePlayer();

  useEffect(() => {
    if (songsData.length > 0) {
      playWithId(songsData[0].id);
    }
  }, [songsData, playWithId]);

  return (
    <div className="flex flex-col md:flex-row h-[calc(100vh-80px)] bg-linear-to-br from-gray-900 via-black to-gray-900 overflow-hidden">
      <div className="w-full md:w-70 lg:w-[320px] shrink-0 border-b md:border-b-0 md:border-r border-gray-800 bg-black z-20">
        <Sidebar />
      </div>

      <div className="flex-1 overflow-hidden overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700">
        <Routes>
          <Route path="/" element={<DisplayHome />} />
          <Route path="/album/:id" element={<DisplayAlbum />} />
        </Routes>
      </div>
    </div>
  );
}

function AppContent() {
  return (
    <div className="h-screen flex flex-col bg-black text-white overflow-hidden">
      <div className="flex-1 overflow-hidden">
        <Display />
      </div>

      <div className="h-20 md:h-22.5 border-t border-gray-800 bg-linear-to-r from-gray-900 via-gray-950 to-gray-900 backdrop-blur-lg z-50">
        <PlayerBar />
      </div>
    </div>
  );
}

function App() {
  return (
    <PlayerProvider>
      <Router>
        <AppContent />
      </Router>
    </PlayerProvider>
  );
}

export default App;
