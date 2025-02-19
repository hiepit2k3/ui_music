import { createStore } from "vuex";
import { axiosInstance, axiosPrivateInstance } from "@/services/authAxios";

export default createStore({
  state: {
    isAuthenticated: false,
    permission: null,
  },
  mutations: {
    setAuthenticated(state, payload) {
      state.isAuthenticated = payload.isAuthenticated;
      state.permission = payload.permission || null;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.permission = null;
    },
  },
  actions: {
    async login({ commit }, credentials) {
      try {
        const response = await axiosPrivateInstance.post("login", credentials);

        if (response.status === 200) {
          commit("setAuthenticated", {
            isAuthenticated: true,
            permission: response.data.data.permission,
          });
          return response;
        }
        return response;
      } catch (error) {
        return error;
      }
    },
    async checkAuth({ commit }) {
      try {
        const response = await axiosPrivateInstance.get("status");  // Gửi yêu cầu đến API /status

        if (response.status === 200) {
          // Nếu trạng thái là 200, cập nhật trạng thái xác thực trong Vuex
          commit("setAuthenticated", {
            isAuthenticated: true,
            permission: response.data.data.permission,
          });
        } else {
          // Nếu không phải 200, coi như không xác thực và cập nhật trạng thái
          commit("setAuthenticated", { isAuthenticated: false });
        }
      } catch (error) {
        // Kiểm tra lỗi và xử lý trường hợp lỗi 401
        if (error.response && error.response.status === 401) {
          console.error("Unauthorized: No access token provided");
          commit("setAuthenticated", { isAuthenticated: false });
        } else {
          // Xử lý các lỗi khác
          console.error("Error:", error);
          commit("setAuthenticated", { isAuthenticated: false });
        }
      }
    },
    async logout({ commit }) {
      try {
        const response = await axiosInstance.post("/logout");
        if (response.status === 200) {
          commit("logout");
          console.log("Đăng xuất thành công");
        } else {
          throw new Error("Đăng xuất thất bại");
        }
      } catch (error) {
        console.error("Lỗi khi đăng xuất:", error);
      }
    },

  },
  getters: {
    // Getter để kiểm tra quyền người dùng
    isUser: (state) => state.permission === 'USER',
    isAuthenticated: (state) => {
      console.log("Getter isAuthenticated:", state.isAuthenticated);
      return state.isAuthenticated;
    }
  }
});
