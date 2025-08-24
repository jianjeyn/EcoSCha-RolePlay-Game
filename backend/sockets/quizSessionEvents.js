// Socket.IO event handler for quiz session
const { startQuiz, submitAnswer, scoreQuiz } = require('../services/quizService');

module.exports = (io, socket) => {
    // Start Quiz
    socket.on('startQuiz', async ({ sessionId }) => {
        const questions = await startQuiz(sessionId);
        io.to(sessionId).emit('quizStarted', { questions });
    });

    // Submit Quiz Answer
    socket.on('submitQuizAnswer', async ({ sessionId, userId, answers }) => {
        await submitAnswer(sessionId, userId, answers);
        io.to(sessionId).emit('quizAnswerSubmitted', { userId });
    });

    // Score Quiz
    socket.on('scoreQuiz', async ({ sessionId }) => {
        const players = await scoreQuiz(sessionId);
        io.to(sessionId).emit('quizScored', { players });
    });
};
