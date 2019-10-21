const main = document.querySelector("main");
const loginForm = document.getElementById("jsLogin");

const LOGGED_OUT = "loggedOut";
const LOGGED_IN = "loggedIn";
const NICKNAME = "nickname";
const nickname = localStorage.getItem(NICKNAME);

if (nickname === null) {
  main.className = LOGGED_OUT;
} else {
  main.className = LOGGED_IN;
}

const handleLoginFormSubmit = e => {
  e.preventDefault();
  const input = loginForm.querySelector("input");
  const { value } = input;
  input.value = "";
  localStorage.setItem(NICKNAME, value);
};

if (loginForm) {
  loginForm.addEventListener("submit", handleLoginFormSubmit);
}
