import events from "./events";
import { chooseWord } from "./words";

const playTime = 5000;
let sockets = [];
let inProgress = false;
let word = null;
let leader = null;

const chooseLeader = () => sockets[Math.floor(Math.random() * sockets.length)];

const socketController = (socket, io) => {
  const broadcast = (event, data) => socket.broadcast.emit(event, data);

  const superBroadcast = (event, data) => io.emit(event, data);

  const sendPlayerUpdate = () => superBroadcast(events.playerUpdate, { sockets });

  const endGame = () => {
    inProgress = false;
    superBroadcast(events.gameEnded);
    setTimeout(() => startGame(), 2000);
  };

  const startGame = () => {
    if (sockets.length > 1 && inProgress === false) {
      inProgress = true;
      leader = chooseLeader();
      word = chooseWord();
      superBroadcast(events.gameStarting);
      setTimeout(() => {
        superBroadcast(events.gameStarted);
        io.to(leader.id).emit(events.leaderNotif, { word });
        superBroadcast(events.countdown, { playTime });
      }, 3000);
      setTimeout(() => endGame(), 10000);
    }
  };

  const addPoints = id => {
    sockets.map(aSocket => {
      if (aSocket.id === id) {
        aSocket.points += 10;
      }
      return aSocket;
    });
    sendPlayerUpdate();
    endGame();
  };

  socket.on(events.setNickname, ({ nickname }) => {
    broadcast(events.newUser, { nickname });
    socket.nickname = nickname;
    sockets.push({ id: socket.id, points: 0, nickname });
    sendPlayerUpdate();
    startGame();
  });

  socket.on(events.disconnect, () => {
    broadcast(events.disconnected, { nickname: socket.nickname });
    sockets = sockets.filter(aSocket => aSocket.id !== socket.id);
    sendPlayerUpdate();
    if (sockets.length === 1 || (leader !== null && leader.id === socket.id)) {
      endGame();
    }
  });

  socket.on(events.sendMsg, ({ message }) => {
    if (sockets.length >= 2 && message.toUpperCase() === word.toUpperCase()) {
      superBroadcast(events.newMsg, {
        message: `Winner is ${socket.nickname}, word was ${word}`,
        nickname: "Bot"
      });
      addPoints(socket.id);
    } else {
      broadcast(events.newMsg, { message, nickname: socket.nickname });
    }
  });

  socket.on(events.beginPath, ({ x, y }) => {
    broadcast(events.beganPath, { x, y });
  });

  socket.on(events.strokePath, ({ x, y, color }) => {
    broadcast(events.strokedPath, { x, y, color });
  });

  socket.on(events.canvasClick, color => {
    broadcast(events.canvasClicked, color);
  });
};

export default socketController;
