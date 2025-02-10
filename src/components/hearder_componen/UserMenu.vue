<template>
    <div class="relative group">
      <!-- Menu button -->
      <button
        @click="toggleMenu"
        ref="menuButton"
        class="flex items-center gap-2 p-2 rounded-full bg-orange-500 text-white"
      >
        <span class="w-8 h-8 flex items-center justify-center rounded-full bg-gray-800">HI</span>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
  
      <!-- Dropdown menu -->
      <div
        ref="dropdownMenu"
        :class="menuVisible ? 'opacity-100 visible' : 'opacity-0 invisible'"
        class="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg transition-all duration-300"
      >
        <ul>
          <li class="p-2 hover:bg-gray-100 cursor-pointer">My GPTs</li>
          <li class="p-2 hover:bg-gray-100 cursor-pointer">Customize ChatGPT</li>
          <li class="p-2 hover:bg-gray-100 cursor-pointer">Settings</li>
          <li class="p-2 hover:bg-gray-100 cursor-pointer">Download the Windows app</li>
          <li class="p-2 hover:bg-gray-100 cursor-pointer">Upgrade Plan</li>
          <li class="p-2 hover:bg-gray-100 cursor-pointer">Get ChatGPT search extension</li>
          <li class="p-2 hover:bg-gray-100 cursor-pointer">Log out</li>
        </ul>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "UserMenu",
    data() {
      return {
        menuVisible: false, // Trạng thái hiển thị menu
      };
    },
    methods: {
      toggleMenu() {
        this.menuVisible = !this.menuVisible;
      },
      handleClickOutside(event) {
        const menuButton = this.$refs.menuButton;
        const dropdownMenu = this.$refs.dropdownMenu;
  
        if (
          menuButton &&
          dropdownMenu &&
          !menuButton.contains(event.target) &&
          !dropdownMenu.contains(event.target)
        ) {
          this.menuVisible = false;
        }
      },
    },
    mounted() {
      // Lắng nghe sự kiện click trên toàn bộ tài liệu
      document.addEventListener("click", this.handleClickOutside);
    },
    beforeUnmount() {
      // Gỡ sự kiện khi component bị hủy
      document.removeEventListener("click", this.handleClickOutside);
    },
  };
  </script>
  
  <style scoped>
  /* Bạn có thể thêm CSS tùy chỉnh nếu cần */
  </style>
  