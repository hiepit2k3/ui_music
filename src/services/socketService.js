import { io } from "socket.io-client";

let socket = null;

const connectToNamespace = async (namespace) => {
  console.log(namespace);
  if (socket) {
    await new Promise((resolve) => {
      socket.once("disconnect", resolve);
      socket.disconnect();
    });
  }

  socket = io(`http://ec2-34-229-20-179.compute-1.amazonaws.com/${namespace}`, {
    withCredentials: true,
  });

  socket.on("connect", () => {
    console.log(`Connected to ${namespace} namespace:`, socket.id);
  });

  socket.on("receiveMessage", (message) => {
    console.log(`[${namespace}] Message received:`, message);
  });

  socket.on("userJoined", (data) => {
    console.log(`User ${data.userId} joined room ${data.roomId}`);
    // Cập nhật danh sách thành viên
  });

  socket.on("userLeft", (data) => {
    console.log(`User ${data.userId} left room ${data.roomId}`);
    // Cập nhật danh sách thành viên
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