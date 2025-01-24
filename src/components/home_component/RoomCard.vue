<template>
  <div>
    <!-- Form Overlay -->
    <div v-if="showSearchForm" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="relative bg-gradient-to-br from-gray-100 to-gray-300 rounded-3xl w-3/5 p-8 shadow-xl text-center">
        <div @click="toggleSearchForm"
          class="absolute w-12 h-12 bg-gradient-to-br from-gray-300 to-gray-400 rounded-full shadow-lg -top-6 -right-6 cursor-pointer flex items-center justify-center">
          <i class="fas fa-times text-white text-lg"></i>
        </div>
        <FormSearch/>
      </div>
    </div>

    <!-- Form Overlay -->
    <div v-if="showCreateForm" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="relative bg-gradient-to-br from-gray-100 to-gray-300 rounded-3xl p-8 shadow-xl w-96 text-center">
        <div @click="toggleCreateForm"
          class="absolute w-12 h-12 bg-gradient-to-br from-gray-300 to-gray-400 rounded-full shadow-lg -top-6 -right-6 cursor-pointer flex items-center justify-center">
          <i class="fas fa-times text-white text-lg"></i>
        </div>
        <h1 class="text-2xl font-bold text-gray-700 mb-4">CREATE ROOM</h1>
        <p class="text-lg text-gray-600 mb-6">Enter Details to Create Room...</p>
        <div class="mb-6">
          <div class="relative mb-4">
            <input type="text" placeholder="Room Name" v-model="roomName"
              class="w-full bg-gradient-to-br from-gray-200 to-gray-300 text-center text-gray-700 py-2 px-4 rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-gray-500" />
            <i class="fas fa-door-open absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"></i>
          </div>
          <div class="flex items-center justify-between mb-4">
            <label class="text-gray-700 text-lg font-medium" for="usePassword">Use Password</label>
            <input id="usePassword" type="checkbox" v-model="usePassword"
              class="w-5 h-5 text-blue-500 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div v-if="usePassword" class="relative">
            <input :type="isPasswordVisible ? 'text' : 'password'" placeholder="Room Password" v-model="password"
              class="w-full bg-gradient-to-br from-gray-200 to-gray-300 text-center text-gray-700 py-2 px-4 rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-gray-500 pr-10" />
            <span @click="togglePasswordVisibility">
              <i :class="isPasswordVisible ? 'fas fa-eye-slash' : 'fas fa-eye'"
                class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"></i>
            </span>
            <i class="fas fa-lock absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"></i>
          </div>
        </div>

        <div class="flex justify-center p-2 gap-6">
          <div>
            <input class="sr-only" v-model="groupType" value="COUPLE" name="groupType" id="COUPLE" type="radio" />
            <div
              class="flex h-20 w-36 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-gray-300 bg-gray-50 p-2 transition-transform duration-150 hover:border-blue-400 active:scale-95 active:bg-blue-50"
              :class="{ 'border-blue-500 shadow-md shadow-blue-600': groupType === 'COUPLE' }"
              @click="groupType = 'COUPLE'">
              <label class="flex cursor-pointer items-center justify-center text-sm uppercase text-gray-500"
                :class="{ 'text-blue-500': groupType === 'COUPLE' }" for="COUPLE">
                <i class="fas fa-heart text-blue-500 text-2xl"></i>
                <span class="ml-2">Couple</span>
              </label>
            </div>
          </div>
          <div>
            <input class="sr-only" v-model="groupType" value="EVERYONE" name="groupType" id="EVERYONE" type="radio" />
            <div
              class="flex h-20 w-36 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-gray-300 bg-gray-50 p-2 transition-transform duration-150 hover:border-blue-400 active:scale-95"
              :class="{ 'border-blue-500 shadow-md shadow-blue-600': groupType === 'EVERYONE' }"
              @click="groupType = 'EVERYONE'">
              <label class="flex cursor-pointer items-center justify-center text-sm uppercase text-gray-500"
                :class="{ 'text-blue-500': groupType === 'EVERYONE' }" for="EVERYONE">
                <i class="fas fa-users text-blue-500 text-2xl"></i>
                <span class="ml-2">Everyone</span>
              </label>
            </div>
          </div>
        </div>
        <div v-if="groupType === 'EVERYONE'" class="relative mt-4">
          <input type="number" placeholder="Number of Members" v-model="numberOfMembers"
            class="w-full bg-gradient-to-br from-gray-200 to-gray-300 text-center text-gray-700 py-2 px-4 rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-gray-500" />
          <i class="fas fa-users absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"></i>
        </div>
        <div class="button-container mt-6">
          <button @click="submitDataCreateRoom"
            class="w-full bg-pink-400 text-white py-2 px-4 rounded-full shadow hover:bg-pink-600 focus:outline-none focus:ring-2 transition flex items-center justify-center">
            <i class="fas fa-check text-white text-lg mr-2"></i>
            <span>Create</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Card remains visible -->
    <div
      class="p-8 flex flex-col items-center w-64 relative group sm:w-full sm:max-w-md rounded-2xl lg:hover:shadow-lg lg:hover:scale-105 transition-transform duration-300">
      <img :src="image" alt="Room image" class="rounded-full mb-4 w-24 h-24 sm:w-32 sm:h-32" />
      <h2 class="text-xl font-semibold mb-2 text-center">{{ title }}</h2>
      <p class="text-center mb-4 text-sm sm:text-base">{{ description }}</p>
      <div
        class="flex flex-row justify-center space-x-4 w-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 lg:opacity-0 lg:group-hover:opacity-100">
        <button @click="toggleSearchForm"
          class="bg-blue-500 text-white px-4 py-2 rounded-xl flex items-center justify-center lg:hover:scale-105 transition-transform duration-300 lg:hover:bg-blue-600">
          <i class="fas fa-search text-xl"></i>
          <span>Search Room</span>
        </button>
        <button @click="toggleCreateForm"
          class="bg-pink-400 text-white px-4 py-2 rounded-xl flex items-center justify-center lg:hover:scale-105 transition-transform duration-300 lg:hover:bg-pink-600">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24"
            stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          <span>Create Room</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { axiosPrivateInstance } from "@/services/authAxios";
import FormSearch from "@/components/home_component/FormSearch.vue";

export default {
  name: "RoomInput",
  components: {
    FormSearch,
  },
  props: ["title", "description", "image", "roomClass"],
  data() {
    return {
      showSearchForm: false,
      showCreateForm: false,
      groupType: null,
      isPasswordVisible: false,
      usePassword: false,
      numberOfMembers: 0,
      password: null,
      roomName: null,
    };
  },
  methods: {
    toggleSearchForm() {
      this.showSearchForm = !this.showSearchForm;
    },
    toggleCreateForm() {
      this.showCreateForm = !this.showCreateForm;
      this.groupType = ''; // Reset the selection when the form is closed
    },
    togglePasswordVisibility() {
      this.isPasswordVisible = !this.isPasswordVisible; // Đảo trạng thái hiển thị mật khẩu
    },
    resetForm() {
      this.roomName = null;
      this.password = null;
      this.groupType = null;
      this.numberOfMembers = 0;
      this.usePassword = false;
      this.isPasswordVisible = false;
    },
    async submitDataCreateRoom() {
      console.log(this.groupType);
      try {
        const response = await axiosPrivateInstance.post("/room/createroom", {
          roomName: this.roomName,
          password: this.password,
          groupType: this.groupType,
          numberOfMembers: this.numberOfMembers,
          roomType: this.title,
        });
        if (response.status === 200) {
          alert("Create room success!");
          this.resetForm();
          this.toggleCreateForm();  
        }
      } catch (error) {
        alert("Create room fail!");
      }
    },

    async submitDataSearchRoom() {
      try {
        const response = await axiosPrivateInstance.post("/room/addNumberInRoom", {
          roomID: this.roomID,
        });
        if (response.status === 200) {
          console.log(response);  
        }
      } catch (error) {
        console.log(JSON.parse(error.config.data).roomID);
        if (error.response.status === 409) {
          const roomID = JSON.parse(error.config.data).roomID;
          this.$router.push('/roommusic/' + roomID);
        }
      }
    },
  },
};
</script>

<style scoped>
body {
  font-family: 'Arial', sans-serif;
}

.group:hover .group-hover\:opacity-100 {
  opacity: 1;
}

.group:hover {
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.2);
  transition: box-shadow 0.3s ease, transform 0.3s ease;
}

@media (max-width: 1024px) {
  .group:hover {
    box-shadow: none;
    transform: none;
  }

  .group button {
    transform: none;
  }
}
</style>
