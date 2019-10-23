/* eslint-disable import/no-cycle */
import { disableCanvas, hideControls, enableCanvas, showControls, resetCanvas } from "./paint";
import { disableChat, enableChat } from "./chat";

const board = document.getElementById("jsPBoard");
const notifs = document.getElementById("jsNotifs");
const remainingSecs = document.getElementById("jsPlayTime");

const addPlayers = players => {
  board.innerHTML = "";
  players.forEach(player => {
    const playerElement = document.createElement("span");
    playerElement.innerText = `${player.nickname}: ${player.points}`;
    board.appendChild(playerElement);
  });
};

const setNotifs = text => {
  notifs.innerHTML = text;
};

export const handlePlayerUpdate = ({ sockets }) => addPlayers(sockets);

export const handleCountdown = ({ playTime }) => {
  playTime /= 1000;
  const interId = setInterval(() => {
    remainingSecs.innerText = playTime;
    playTime -= 1;
    if (playTime === -1) {
      clearInterval(interId);
    }
  }, 1000);
};

export const handleGameStarted = () => {
  setNotifs("");
  disableCanvas();
  hideControls();
  enableChat();
};

export const handleLeaderNotif = ({ word }) => {
  enableCanvas();
  showControls();
  disableChat();
  notifs.innerHTML = `You are the leader. Paint: ${word}`;
};

export const handleGameEnded = () => {
  setNotifs("Game ended");
  resetCanvas();
  disableCanvas();
  hideControls();
};

export const handleGameStarting = () => setNotifs("Game will start soon");
