import { initSockets } from "./sockets";

/* eslint-disable no-undef */
const main = document.querySelector("main");
const loginForm = document.getElementById("jsLogin");

const LOGGED_OUT = "loggedOut";
const LOGGED_IN = "loggedIn";
const NICKNAME = "nickname";
const nickname = localStorage.getItem(NICKNAME);

const logIn = nickname => {
  const socket = io("/");
  socket.emit(window.events.setNickname, { nickname });
  initSockets(socket);
};

const handleLoginFormSubmit = e => {
  e.preventDefault();
  const input = loginForm.querySelector("input");
  const { value } = input;
  input.value = "";
  localStorage.setItem(NICKNAME, value);
  main.className = LOGGED_IN;
  logIn(value);
};

if (nickname === null) {
  main.className = LOGGED_OUT;
} else {
  main.className = LOGGED_IN;
  logIn(nickname);
}

if (loginForm) {
  loginForm.addEventListener("submit", handleLoginFormSubmit);
}
