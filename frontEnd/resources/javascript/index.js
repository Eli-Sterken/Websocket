const socket = new WebSocket("ws://localhost:3001");
const message = document.getElementById("messageP");

socket.addEventListener("message", (event) => {
    message.innerHTML = JSON.parse(event.data);
});
