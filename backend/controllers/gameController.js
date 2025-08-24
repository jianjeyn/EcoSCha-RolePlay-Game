const { getQuizPrivilegePlayer } = require('../services/gameService');

exports.getQuizPrivilege = async (req, res) => {
  try {
    const privilegePlayer = await getQuizPrivilegePlayer(req.body.sessionId);
    res.json({ privilegePlayer });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// Quiz logic
const { startQuiz, submitAnswer, scoreQuiz } = require('../services/quizService');

exports.startQuiz = async (req, res) => {
  try {
    const questions = await startQuiz(req.body.sessionId);
    res.json({ questions });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.submitQuizAnswer = async (req, res) => {
  try {
    await submitAnswer(req.body.sessionId, req.body.userId, req.body.answers);
    res.json({ message: 'Answer submitted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.scoreQuiz = async (req, res) => {
  try {
    const players = await scoreQuiz(req.body.sessionId);
    res.json({ players });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.createRoom = (req, res) => {
  // Buat room baru
  const { roomCode, hostId } = req.body;
  const sessionId = `${roomCode}-${Date.now()}`;
  const newSession = new (require('../models/GameSession'))({
    sessionId,
    roomCode,
    hostId,
    players: [],
    gameState: { phase: 'lobby', round: 0 },
    startedAt: null,
    endedAt: null
  });
  newSession.save()
    .then(() => res.json({ message: 'Room created', sessionId }))
    .catch(err => res.status(500).json({ error: err.message }));
};

exports.joinRoom = (req, res) => {
  // Join room
  const { sessionId, userId, username } = req.body;
  const GameSession = require('../models/GameSession');
  GameSession.findOne({ sessionId })
    .then(session => {
      if (!session) return res.status(404).json({ error: 'Room not found' });
      if (session.players.find(p => p.userId.toString() === userId)) {
        return res.json({ message: 'Already joined' });
      }
      session.players.push({ userId, username, isAlive: true, isReady: false, joinedAt: new Date() });
      return session.save().then(() => res.json({ message: 'Joined room' }));
    })
    .catch(err => res.status(500).json({ error: err.message }));
};

exports.getSession = (req, res) => {
  // ...implement get session logic...
  res.json({ message: 'Get session endpoint' });
};

exports.startGame = (req, res) => {
  // ...implement start game logic...
  res.json({ message: 'Start game endpoint' });
};
// Tambahan endpoint untuk game flow
const GameSession = require('../models/GameSession');
const User = require('../models/User');
const Achievement = require('../models/Achievement');
const { startGame, nextPhase, performNightAction, votePlayer, awardAchievement } = require('../services/gameService');

exports.listRooms = async (req, res) => {
  // List all active rooms
  const GameSession = require('../models/GameSession');
  const rooms = await GameSession.find({ endedAt: null });
  res.json({ rooms });
};

exports.leaveRoom = async (req, res) => {
  // Leave room
  const { sessionId, userId } = req.body;
  const GameSession = require('../models/GameSession');
  const session = await GameSession.findOne({ sessionId });
  if (!session) return res.status(404).json({ error: 'Room not found' });
  session.players = session.players.filter(p => p.userId.toString() !== userId);
  await session.save();
  res.json({ message: 'Left room' });
};

const mongoose = require('mongoose');

exports.startGame = async (req, res) => {
  // Ambil data karakter dari collection 'characters' untuk role assignment
  const Character = mongoose.connection.collection('characters');
  const allCharacters = await Character.find({}).toArray();
  // ...lanjutkan logika start game dan assign role sesuai data karakter...
  await startGame(req.body.roomId, allCharacters);
  res.json({ message: 'Game started' });
};

exports.nextPhase = async (req, res) => {
  await nextPhase(req.body.sessionId);
  res.json({ message: 'Phase changed' });
};

exports.nightAction = async (req, res) => {
  await performNightAction(req.body.sessionId, req.body.userId, req.body.action);
  res.json({ message: 'Night action performed' });
};

exports.votePlayer = async (req, res) => {
  await votePlayer(req.body.sessionId, req.body.voterId, req.body.targetId);
  res.json({ message: 'Vote submitted' });
};

exports.getLeaderboard = async (req, res) => {
    // Leaderboard: top players by gameScore
    const GameSession = require('../models/GameSession');
    const sessions = await GameSession.find({ endedAt: { $ne: null } });
    let leaderboard = [];
    sessions.forEach(session => {
      session.players.forEach(player => {
        leaderboard.push({ username: player.username, score: player.gameScore || 0 });
      });
    });
    leaderboard = leaderboard.sort((a, b) => b.score - a.score).slice(0, 10);
    res.json({ leaderboard });
};

exports.getUserAchievements = async (req, res) => {
  // Get user achievements
  const User = require('../models/User');
  const user = await User.findById(req.params.userId).populate('achievements');
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json({ achievements: user.achievements });
};
