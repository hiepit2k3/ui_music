export default class WebSocketClient {
  constructor(url) {
    this.url = url;
    this.socket = null;
    this.listeners = {};
    this.isConnected = false; // Trạng thái kết nối
  }

  connect() {
    return new Promise((resolve, reject) => {
      if (this.socket && this.socket.readyState === WebSocket.OPEN) {
        resolve(); // Nếu socket đã kết nối, trả về ngay
        return;
      }

      this.socket = new WebSocket(this.url);

      this.socket.onopen = () => {
        console.log("WebSocket connected");
        this.isConnected = true; // Đánh dấu kết nối đã sẵn sàng
        resolve(); // Trả về Promise khi kết nối thành công
      };

      this.socket.onmessage = (event) => {
        const message = JSON.parse(event.data);
        console.log("Message received:", message);

        // Gọi callback được đăng ký nếu sự kiện tồn tại
        if (this.listeners[message.event]) {
          this.listeners[message.event](message.data);
        }
      };

      this.socket.onclose = () => {
        console.log("WebSocket disconnected");
        this.isConnected = false; // Đánh dấu kết nối bị ngắt
      };

      this.socket.onerror = (error) => {
        console.error("WebSocket error:", error);
        reject(error); // Nếu có lỗi xảy ra, từ chối Promise
      };
    });
  }

  send(event, data) {
    return new Promise((resolve, reject) => {
      if (this.socket && this.socket.readyState === WebSocket.OPEN) {
        const message = {
          event: event, // Tên sự kiện
          data: data,   // Dữ liệu sự kiện
        };
        this.socket.send(JSON.stringify(message));
        console.log("Sent message:", message);
        resolve(); // Trả về Promise khi gửi thành công
      } else {
        console.error("WebSocket is not open");
        reject(new Error("WebSocket is not open"));
      }
    });
  }

  on(event, callback) {
    // Đăng ký callback cho một sự kiện
    this.listeners[event] = callback;
  }

  close() {
    if (this.socket) {
      this.socket.close();
    }
  }
}
  