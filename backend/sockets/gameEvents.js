module.exports = (io) => {
  io.on('connection', (socket) => {
    socket.on('join_room', (data) => {
      // ...handle join room event...
    });
    socket.on('start_game', (data) => {
      // ...handle start game event...
    });
    socket.on('quiz_answer', (data) => {
      // ...handle quiz answer event...
    });
    socket.on('use_ability', (data) => {
      // ...handle use ability event...
    });
    socket.on('cast_vote', (data) => {
      // ...handle cast vote event...
    });
    socket.on('next_phase', (data) => {
      // ...handle next phase event...
    });
  });
};
