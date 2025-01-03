import { createStore } from "vuex";
import { axiosInstance, axiosPrivateInstance } from "@/services/authAxios";

export default createStore({
  state: {
    permission: null,
  },
  mutations: {
    setPermission(state, permission) {
      state.permission = permission;
    },
    // Mutation để đăng xuất, làm trống quyền
    logout(state) {
      state.permission = null;
    },
  },
  actions: {
    async login({ commit }, credentials) {
      try {
        const response = await axiosPrivateInstance.post("login", credentials);

        console.log(response);

        if (response.status === 200) {
            commit('setPermission', response.data.data.permission);
        } else {
          throw new Error("Đăng nhập thất bại");
        }
      } catch (error) {
        console.error(error);
      }
    },
    logout({ commit }) {
      commit("logout");
    },
  },
  getters: {
    // Getter để kiểm tra quyền người dùng
    isUser: (state) => state.permission === 'USER',
    isAuthenticated: (state) => !!state.permission // Kiểm tra người dùng đã đăng nhập
  }
});
