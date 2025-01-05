// socketService.js (Frontend)
import { reactive } from "vue";
import { io } from "socket.io-client"; // Import socket.io-client

const socketService = {
  socket: null,
  state: reactive({
    isConnected: false,
    lastMessage: null,
  }),
  connect(url) {
    this.socket = io(url);  // Sử dụng socket.io để kết nối
    this.socket.on("connect", () => {
      this.state.isConnected = true;
      console.log("Socket.IO connected");
    });
    this.socket.on("roomJoined", (data) => {
      console.log(`Joined room: ${data.roomId}`);
    });

    this.socket.on("roomLeft", (data) => {
      console.log(`Left room: ${data.roomId}`);
    });

    this.socket.on("receiveMessage", (message) => {
      console.log("Received message:", message);
      this.state.lastMessage = message;
    });

    this.socket.on("disconnect", () => {
      this.state.isConnected = false;
      console.warn("Socket.IO disconnected");
    });
  },

  sendMessage(action, payload) {
    if (this.socket && this.state.isConnected) {
      this.socket.emit(action, payload);  // Gửi sự kiện tới server
    } else {
      console.warn("Socket.IO is not connected");
    }
  },

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();  // Ngắt kết nối
    }
  },
};

export default socketService;
