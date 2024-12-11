<template>
    <div class="flex flex-col items-center space-y-2">
      <div
        class="w-24 h-24 rounded-full border-4 border-pink overflow-hidden shadow-lg"
      >
        <!-- Thay avatar bằng hình hoặc slot -->
        <img
          src="https://via.placeholder.com/150"
          alt="Avatar"
          class="w-full h-full object-cover"
        />
      </div>
      <div class="flex space-x-4">
        <button class="w-10 h-10 bg-purple rounded-full shadow-md hover:bg-purple-dark">
          🎵
        </button>
        <button class="w-10 h-10 bg-pink rounded-full shadow-md hover:bg-pink-dark">
          💾
        </button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "AvatarComponent",
  };
  </script>
  