// Quiz Service: handle quiz session, answer submission, scoring
const GameSession = require('../models/GameSession');
const Question = require('../models/Question');

const startQuiz = async (sessionId) => {
    // Set quiz active, pick questions
    const session = await GameSession.findOne({ sessionId });
    if (!session) throw new Error('Session not found');
    const questions = await Question.aggregate([{ $sample: { size: 5 } }]);
    session.gameState.quiz = { active: true, questions, answers: [] };
    await session.save();
    return questions;
};

const submitAnswer = async (sessionId, userId, answers) => {
    // Simpan jawaban user
    const session = await GameSession.findOne({ sessionId });
    if (!session) throw new Error('Session not found');
    session.gameState.quiz.answers.push({ userId, answers });
    await session.save();
    return session;
};

const scoreQuiz = async (sessionId) => {
    // Hitung skor quiz untuk tiap pemain
    const session = await GameSession.findOne({ sessionId });
    if (!session) throw new Error('Session not found');
    const { questions, answers } = session.gameState.quiz;
    session.players.forEach(player => {
        const userAnswers = answers.find(a => a.userId === player.userId?.toString());
        let score = 0;
        if (userAnswers) {
            userAnswers.answers.forEach((ans, idx) => {
                if (questions[idx] && ans === questions[idx].correctAnswer) score++;
            });
        }
        player.quizScore = score;
    });
    await session.save();
    return session.players;
};

module.exports = { startQuiz, submitAnswer, scoreQuiz };
