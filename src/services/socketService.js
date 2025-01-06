import { io } from "socket.io-client";

let socket = null;

const connectToNamespace = (namespace) => {
  console.log(namespace);
  if (socket) {
    socket.disconnect();
  }

  socket = io(`http://localhost:4000/${namespace}`, {
    withCredentials: true,
  });

  socket.on("connect", () => {
    console.log(`Connected to ${namespace} namespace:`, socket.id);
  });

  socket.on("receiveMessage", (message) => {
    console.log(`[${namespace}] Message received:`, message);
  });

  socket.on("disconnect", () => {
    console.log(`Disconnected from ${namespace} namespace`);
  });

  return socket;
};

const joinRoom = (roomId) => {
  if (!socket) {
    console.error("Socket is not connected. Please connect first.");
    return;
  }
  socket.emit("joinRoom", roomId);
};

const leaveRoom = (roomId) => {
  if (!socket) {
    console.error("Socket is not connected. Please connect first.");
    return;
  }
  socket.emit("leaveRoom", roomId);
};

const sendMessage = (message) => {
  if (!socket) {
    console.error("Socket is not connected. Please connect first.");
    return;
  }
  socket.emit("sendMessage", message);
};

export default {
  connectToNamespace,
  joinRoom,
  leaveRoom,
  sendMessage,
};
