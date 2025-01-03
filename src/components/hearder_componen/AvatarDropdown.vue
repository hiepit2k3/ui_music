<template>
  <div class="relative inline-block">
    <!-- Avatar -->
    <img
      src="https://via.placeholder.com/64"
      alt="User Avatar"
      class="w-10 h-10 rounded-full border-2 border-gray-700 cursor-pointer"
      @click="toggleDropdown"
    />

    <!-- Dropdown Menu -->
    <ul
      v-if="dropdownOpen"
      class="absolute right-0 mt-2 w-40 bg-gray-700 text-white rounded-lg shadow-lg py-2"
    >
      <li
        v-for="item in menuItems"
        :key="item.id"
        class="px-4 py-2 flex items-center transition-colors duration-300 hover:bg-gray-600 hover:text-gray-300"
      >
        <i :class="item.icon + ' mr-2'"></i>
        <span>{{ item.label }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "AvatarDropdown",
  data() {
    return {
      dropdownOpen: false,
      menuItems: [
        { id: 1, label: "Public profile", icon: "fas fa-user" },
        { id: 2, label: "Account", icon: "fas fa-cog" },
        { id: 3, label: "Appearance", icon: "fas fa-paint-brush" },
        { id: 4, label: "Accessibility", icon: "fas fa-universal-access" },
        { id: 5, label: "Notifications", icon: "fas fa-bell" },
      ],
    };
  },
  methods: {
    toggleDropdown() {
      this.dropdownOpen = !this.dropdownOpen;
    },
  },
};
</script>

<style scoped>
/* Optional custom styles */
</style>
