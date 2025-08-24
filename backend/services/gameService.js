// Game Service: Core game logic for phase transitions, role actions, voting, scoring, elimination, etc.
const GameSession = require('../models/GameSession');
const User = require('../models/User');
const Role = require('../models/Role');
const NightAction = require('../models/NightAction');
const Achievement = require('../models/Achievement');

const startGame = async (roomId) => {
    // Cari session berdasarkan roomId
    let session = await GameSession.findOne({ roomCode: roomId });
    if (!session) throw new Error('Room not found');
    // Assign roles ke semua pemain
    const roles = await Role.find({ isActive: true });
    let roleIdx = 0;
    session.players = session.players.map((player) => {
        const role = roles[roleIdx % roles.length];
        roleIdx++;
        return {
            ...player._doc,
            roleId: role.roleId,
            roleName: role.roleName,
            characterName: role.displayName,
            isAlive: true,
            isReady: false,
            joinedAt: new Date(),
        };
    });
    session.gameState = { phase: 'morning', round: 1 };
    session.startedAt = new Date();
    await session.save();
    return session;
}

const nextPhase = async (sessionId) => {
    let session = await GameSession.findOne({ sessionId });
    if (!session) throw new Error('Session not found');
    const currentPhase = session.gameState?.phase || 'morning';
    session.gameState.phase = currentPhase === 'morning' ? 'night' : 'morning';
    session.gameState.round = (session.gameState.round || 1) + 1;
    await session.save();
    return session;
};

const performNightAction = async (sessionId, userId, action) => {
    let session = await GameSession.findOne({ sessionId });
    if (!session) throw new Error('Session not found');
    // Simpan aksi malam ke history pemain
    const player = session.players.find(p => p.userId.toString() === userId);
    if (!player) throw new Error('Player not found');
    player.actionHistory = player.actionHistory || [];
    player.actionHistory.push({ phase: 'night', action, time: new Date() });
    await session.save();
    return player;
};

const votePlayer = async (sessionId, voterId, targetId) => {
    let session = await GameSession.findOne({ sessionId });
    if (!session) throw new Error('Session not found');
    // Simpan voting ke history
    const voter = session.players.find(p => p.userId.toString() === voterId);
    if (!voter) throw new Error('Voter not found');
    voter.votingHistory = voter.votingHistory || [];
    voter.votingHistory.push({ targetId, time: new Date() });
    // Tally vote
    const voteCounts = {};
    session.players.forEach(p => {
        if (p.votingHistory && p.votingHistory.length > 0) {
            const lastVote = p.votingHistory[p.votingHistory.length - 1];
            voteCounts[lastVote.targetId] = (voteCounts[lastVote.targetId] || 0) + 1;
        }
    });
    // Eliminasi jika ada mayoritas
    const maxVotes = Math.max(...Object.values(voteCounts));
    const eliminatedId = Object.keys(voteCounts).find(id => voteCounts[id] === maxVotes);
    if (maxVotes > session.players.length / 2) {
        const eliminated = session.players.find(p => p.userId.toString() === eliminatedId);
        if (eliminated) {
            eliminated.isAlive = false;
            // Kurangi poin pemain yang tereliminasi
            eliminated.gameScore = (eliminated.gameScore || 0) - 20;
        }
        // Tambah poin ke voter yang benar (jika target Waste Villain)
        session.players.forEach(p => {
            const lastVote = p.votingHistory && p.votingHistory[p.votingHistory.length - 1];
            if (lastVote && lastVote.targetId === eliminatedId) {
                // Cek role target
                if (eliminated.roleName === 'Waste Villain') {
                    p.gameScore = (p.gameScore || 0) + 10;
                } else {
                    p.gameScore = (p.gameScore || 0) - 5;
                }
            }
        });
    }
    await session.save();
    return session;
};

// Privilege quiz tertinggi (sekali pakai, bisa lihat role pemain lain)
// Ambil data player privilege dari session.players (GameSession), bukan dari collection karakter
const getQuizPrivilegePlayer = async (sessionId) => {
    const session = await GameSession.findOne({ sessionId });
    if (!session) throw new Error('Session not found');
    let privilegePlayer = null;
    if (session.players && session.players.length > 0) {
        // Jika field quizScore ada, ambil player dengan nilai tertinggi
        if (session.players[0].hasOwnProperty('quizScore')) {
            const maxQuizScore = Math.max(...session.players.map(p => p.quizScore || 0));
            privilegePlayer = session.players.find(p => (p.quizScore || 0) === maxQuizScore);
        } else {
            // Jika field quizScore tidak ada, set manual: ambil pemain pertama sebagai privilege
            privilegePlayer = session.players[0];
        }
    }
    return privilegePlayer;
};

// Achievement otomatis
const assignAchievements = async (sessionId) => {
    const session = await GameSession.findOne({ sessionId });
    if (!session) throw new Error('Session not found');
    // Best Eco Thinker: skor quiz akhir tertinggi
    const maxQuizScore = Math.max(...session.players.map(p => p.quizScore || 0));
    const bestEcoThinker = session.players.find(p => (p.quizScore || 0) === maxQuizScore);
    // Most Strategic Play: poin akhir tertinggi
    const maxGameScore = Math.max(...session.players.map(p => p.gameScore || 0));
    const mostStrategic = session.players.find(p => (p.gameScore || 0) === maxGameScore);
    // Simpan achievement ke user
    if (bestEcoThinker) await awardAchievement(bestEcoThinker.userId, 'BEST_ECO_THINKER');
    if (mostStrategic) await awardAchievement(mostStrategic.userId, 'MOST_STRATEGIC_PLAY');

    return { bestEcoThinker, mostStrategic };
};

const awardAchievement = async (userId, achievementId) => {
    const user = await User.findById(userId);
    if (!user) throw new Error('User not found');
    if (!user.achievements.includes(achievementId)) {
        user.achievements.push(achievementId);
        await user.save();
    }
    return user;
};

module.exports = {
    startGame,
    nextPhase,
    performNightAction,
    votePlayer,
    awardAchievement,
    getQuizPrivilegePlayer,
    assignAchievements
};