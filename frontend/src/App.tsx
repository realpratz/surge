import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Leaderboard from "./pages/Leaderboard";
import Resources from "./pages/Resources";
import Stats from "./pages/Stats";
import Profile from "./pages/Profile";
import ProtectedApp from "./ProtectedApp";

function App() {
  return (
    <BrowserRouter>
      <ProtectedApp>
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/stats" element={<Stats />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      </ProtectedApp>
    </BrowserRouter>
  );
}
export default App;
