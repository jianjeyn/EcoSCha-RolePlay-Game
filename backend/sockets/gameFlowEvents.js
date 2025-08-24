// Socket.IO event handler for game flow: join/leave room, start game, phase change, role reveal, voting, etc.
const { startGame, nextPhase, performNightAction, votePlayer } = require('../services/gameService');

module.exports = (io, socket) => {
    // Join Room
    socket.on('joinRoom', async ({ roomId, userId }) => {
        socket.join(roomId);
        io.to(roomId).emit('userJoined', { userId });
    });

    // Leave Room
    socket.on('leaveRoom', async ({ roomId, userId }) => {
        socket.leave(roomId);
        io.to(roomId).emit('userLeft', { userId });
    });

    // Start Game
    socket.on('startGame', async ({ roomId }) => {
        await startGame(roomId);
        io.to(roomId).emit('gameStarted');
    });

    // Next Phase
    socket.on('nextPhase', async ({ sessionId }) => {
        await nextPhase(sessionId);
        io.to(sessionId).emit('phaseChanged');
    });

    // Night Action
    socket.on('nightAction', async ({ sessionId, userId, action }) => {
        await performNightAction(sessionId, userId, action);
        io.to(sessionId).emit('nightActionPerformed', { userId, action });
    });

    // Voting
    socket.on('votePlayer', async ({ sessionId, voterId, targetId }) => {
        await votePlayer(sessionId, voterId, targetId);
        io.to(sessionId).emit('voteSubmitted', { voterId, targetId });
    });
};
