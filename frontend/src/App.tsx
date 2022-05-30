import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Game } from "./components/Game";
import { Leaderboard } from "./components/Leaderboard";
import { StartGame } from "./components/StartGame";
import { Verdict } from "./components/Verdict";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StartGame />} />
        <Route path="/game" element={<Game />} />
        <Route path="/verdict" element={<Verdict />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
