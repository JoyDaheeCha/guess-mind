const body = document.querySelector("body");

const fireNotification = (text, color) => {
  const notification = document.createElement("div");
  notification.innerText = text;
  notification.className = "notification";
  notification.style.backgroundColor = color;
  body.appendChild(notification);
};

export const handleNewUser = ({ nickname }) => {
  fireNotification(`${nickname} just joined 🤩`, "#A844CB");
};

export const handleDisconnected = ({ nickname }) => {
  fireNotification(`${nickname} just left 😎`, "#ffb48f");
};
