import Guide from './pages/Guide';
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import LandingPage from "./pages/LandingPage";
import RoleExplanationRoomPage from "./pages/RoleExplanationRoomPage";
import ModeratorLeaderboardStartgamePage from "./pages/ModeratorLeaderboardStartgamePage";
import LeaderboardPage from "./pages/LeaderboardPage";
import CountdownPage from "./pages/CountdownPage";
import ChooseTopicCardPage from "./pages/ChooseTopicCardPage";
import VotingPage from "./pages/VotingPage";
import StartMorningPhasePage from "./pages/StartMorningPhasePage";
import MorningPhasePage from "./pages/MorningPhasePage";
import ModeratorMorningPhasePage from "./pages/ModeratorMorningPhasePage";
import ProfilePage from "./pages/ProfilePage";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/landing" element={<LandingPage />} />
          <Route path="/role-explanation-room/:playerId" element={<RoleExplanationRoomPage />} />
          <Route path="/moderator-leaderboard-startgame" element={<ModeratorLeaderboardStartgamePage />} />
          <Route path="/leaderboard" element={<LeaderboardPage />} />
          <Route path="/countdown" element={<CountdownPage />} />
          <Route path="/choose-topic-card" element={<ChooseTopicCardPage />} />
          <Route path="/voting" element={<VotingPage />} />
          <Route path="/start-morning-phase" element={<StartMorningPhasePage />} />
          <Route path="/morning-phase" element={<MorningPhasePage />} />
          <Route path="/moderator-morning-phase" element={<ModeratorMorningPhasePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/guide" element={<Guide />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
