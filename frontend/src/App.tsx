import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <h1 className="text-2xl font-bold text-blue-500">CC Website</h1>
          }
        />
        <Route path="/leaderboard" element={<h1>Leaderboard</h1>} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
