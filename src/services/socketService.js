// src/utils/websocket.js

export default class WebSocketClient {
  constructor(url) {
    this.url = url;
    this.socket = null;
    this.listeners = {};
  }

  connect() {
    this.socket = new WebSocket(this.url);

    this.socket.onopen = () => {
      this.socket = this.socket.readyState;
      console.log("WebSocket connected");
    };

    this.socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      console.log("Message received:", message);

      // Gọi callback được đăng ký
      if (this.listeners[message.event]) {
        this.listeners[message.event](message);
      }
    };

    this.socket.onclose = () => {
      console.log("WebSocket disconnected");
    };

    this.socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };
  }

  // send(data) {
  //   console.log("Send message:", this.socket.readyState);
  //   if (this.socket && this.socket.readyState === WebSocket.OPEN) {
  //     this.socket.send(JSON.stringify(data));
  //   } else {
  //     console.error("WebSocket is not open");
  //   }
  // }

  on(event, callback) {
    this.listeners[event] = callback;
  }

  close() {
    if (this.socket) {
      this.socket.close();
    }
  }
}
