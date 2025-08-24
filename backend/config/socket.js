const socketIO = require('socket.io');
const gameFlowEvents = require('../sockets/gameFlowEvents');
const roomEvents = require('../sockets/roomEvents');
const quizEvents = require('../sockets/quizEvents');
const quizSessionEvents = require('../sockets/quizSessionEvents');

function setupSocket(server) {
    const io = socketIO(server, {
        cors: {
            origin: process.env.CORS_ORIGIN || '*',
            methods: ['GET', 'POST']
        }
    });

    io.on('connection', (socket) => {
        // Register all event handlers
        gameFlowEvents(io, socket);
        roomEvents(io, socket);
        quizEvents(io, socket);
        quizSessionEvents(io, socket);
    });
}

module.exports = { setupSocket };
