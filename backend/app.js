require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const http = require('http');
const app = express();

app.use(cors({ origin: process.env.CORS_ORIGIN || '*' }));
app.use(express.json());


// Import routes

const authRoutes = require('./routes/auth');
const contentRoutes = require('./routes/content');
const gameRoutes = require('./routes/game');
const quizRoutes = require('./routes/quiz');
const gameFlowRoutes = require('./routes/gameFlow');

const characterRoutes = require('./routes/character');
const gameNarrativeRoutes = require('./routes/gameNarrative');
const learningMaterialRoutes = require('./routes/learningMaterial');
const quizTopicRoutes = require('./routes/quizTopic');
const gameSessionRoutes = require('./routes/gameSession');
const userRoutes = require('./routes/user');
const achievementRoutes = require('./routes/achievement');


app.use('/api/auth', authRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/game', gameRoutes);
app.use('/api/quiz', quizRoutes);
app.use('/api/gameflow', gameFlowRoutes);

app.use('/api/characters', characterRoutes);
app.use('/api/game-narratives', gameNarrativeRoutes);
app.use('/api/learning-materials', learningMaterialRoutes);
app.use('/api/quiz-topics', quizTopicRoutes);
app.use('/api/game-sessions', gameSessionRoutes);
app.use('/api/users', userRoutes);
app.use('/api/achievements', achievementRoutes);

// Health check
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

module.exports = app;
