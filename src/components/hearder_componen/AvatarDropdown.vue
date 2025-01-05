<template>
  <div class="relative inline-block">
    <!-- Avatar -->
    <img src="https://via.placeholder.com/64" alt="User Avatar"
      class="w-10 h-10 rounded-full border-2 border-gray-700 cursor-pointer" @click="toggleDropdown" />

    <!-- Dropdown Menu -->
    <ul v-if="dropdownOpen" class="absolute right-0 mt-2 w-40 bg-gray-700 text-white rounded-lg shadow-lg py-2">
      <li v-for="item in menuItems" :key="item.id"
        class="px-4 py-2 flex items-center transition-colors duration-300 hover:bg-gray-600 hover:text-gray-300 cursor-pointer"
        @click="handleClick(item)">
        <i :class="item.icon + ' mr-2'"></i>
        <span>{{ item.label }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";

export default {
  name: "AvatarDropdown",
  setup() {
    const store = useStore();
    const isAuthenticated = computed(() => store.getters.isAuthenticated);
    console.log(isAuthenticated);
    return { isAuthenticated };
  },
  data() {
    return {
      dropdownOpen: false,
      menuItems: [
        { id: 1, label: "Profile", icon: "fas fa-user", onClick: this.viewProfile },
        { id: 2, label: "Setting", icon: "fas fa-cog", onClick: this.openSettings },
        { id: 3, label: "Appearance", icon: "fas fa-paint-brush", onClick: this.changeAppearance },
        { id: 4, label: "Accessibility", icon: "fas fa-universal-access", onClick: this.openAccessibility },
        { id: 5, label: "Logout", icon: "fa-solid fa-right-from-bracket", onClick: this.logout },
      ],
    };
  },
  methods: {
    toggleDropdown() {
      this.dropdownOpen = !this.dropdownOpen;
    },
    handleClick(item) {
      if (item.onClick) {
        item.onClick();
      }
    },
    viewProfile() {
      console.log("Navigating to Profile...");
      // Thêm logic điều hướng đến trang profile
    },
    openSettings() {
      console.log("Opening Settings...");
      // Thêm logic mở trang cài đặt
    },
    changeAppearance() {
      console.log("Changing Appearance...");
      // Thêm logic thay đổi giao diện
    },
    openAccessibility() {
      console.log("Opening Accessibility...");
      // Thêm logic mở cài đặt truy cập
    },
    async logout() {
      await this.$store.dispatch('logout');
    },
  },
};
</script>

<style scoped></style>
