import Guide from './pages/Guide';
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import ModeratorRoomPage from "./pages/ModeratorRoomPage";
import LandingPage from "./pages/LandingPage";
import RoleExplanationRoomPage from "./pages/RoleExplanationRoomPage";
import ModeratorLeaderboardStartgamePage from "./pages/ModeratorLeaderboardStartgamePage";
import LeaderboardPage from "./pages/LeaderboardPage";
import CountdownPage from "./pages/CountdownPage";
import ChooseTopicCardPage from "./pages/ChooseTopicCardPage";
import FirstTopicPage from "./pages/question/FirstTopicPage";
import SecondTopicPage from "./pages/question/SecondTopicPage";
import ThirdTopicPage from "./pages/question/ThirdTopicPage";
import FourthTopicPage from "./pages/question/FourthTopicPage";
import FifthTopicPage from "./pages/question/FifthTopicPage";
import SixthTopicPage from "./pages/question/SixthTopicPage";
import NightPhasePage from "./pages/NightPhasePage";
import ModeratorNightPhasePage from "./pages/ModeratorNightPhasePage";
import ChooseYourTarget from "./pages/ChooseYourTarget";
import WasteManagerReveal from "./pages/WasteManagerRevealPage";
import VideoLearningPage from "./pages/VideoLearningPage";
import DiscussionSessionPage from "./pages/DiscussionSessionPage";
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
          <Route path="/moderator-room" element={<ModeratorRoomPage />} />
          <Route path="/landing" element={<LandingPage />} />
          <Route
            path="/role-explanation-room/:playerId"
            element={<RoleExplanationRoomPage />}
          />
          <Route path="/moderator-room" element={<ModeratorRoomPage />} />
          <Route
            path="/moderator-leaderboard-startgame"
            element={<ModeratorLeaderboardStartgamePage />}
          />
          <Route path="/leaderboard" element={<LeaderboardPage />} />
          <Route path="/countdown" element={<CountdownPage />} />
          <Route path="/choose-topic-card" element={<ChooseTopicCardPage />} />
          <Route path="/question/FirstTopicPage" element={<FirstTopicPage />} />
          <Route
            path="/question/SecondTopicPage"
            element={<SecondTopicPage />}
          />
          <Route path="/question/ThirdTopicPage" element={<ThirdTopicPage />} />
          <Route
            path="/question/FourthTopicPage"
            element={<FourthTopicPage />}
          />
          <Route path="/question/FifthTopicPage" element={<FifthTopicPage />} />
          <Route path="/question/SixthTopicPage" element={<SixthTopicPage />} />
          <Route path="/night-phase" element={<NightPhasePage />} />
          <Route
            path="/moderator-night-phase"
            element={<ModeratorNightPhasePage />}
          />
          <Route path="/choose-target" element={<ChooseYourTarget />} />
          <Route
            path="/waste-manager-reveal"
            element={<WasteManagerReveal />}
          />
          <Route path="/video-learning" element={<VideoLearningPage />} />
          <Route
            path="/start-morning-phase"
            element={<StartMorningPhasePage />}
          />
          <Route path="/morning-phase" element={<MorningPhasePage />} />
          <Route
            path="/discussion-session"
            element={<DiscussionSessionPage />}
          />
          <Route path="/voting" element={<VotingPage />} />
          <Route
            path="/moderator-morning-phase"
            element={<ModeratorMorningPhasePage />}
          />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/guide" element={<Guide />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
