<template>
  <div
    class="parent-menu group cursor-pointer relative overflow-hidden bg-gradient-to-b from-gray-800 to-gray-900 rounded-2xl p-6 shadow-xl border-2 border-transparent transition-transform duration-500 ease-in-out hover:scale-105 hover:border-indigo-500 hover:shadow-indigo-500/20 flex flex-col justify-center items-center">
    <!-- Nội dung trước khi hover -->
    <div
      class="content-initial transition-all duration-500 ease-in-out flex flex-col items-center justify-center group-hover:scale-75 group-hover:translate-y-[-30%]">
      <!-- Logo -->
      <div
        class="w-12 h-12 bg-indigo-500/20 rounded-lg border-2 border-indigo-500/40 group-hover:border-indigo-400 group-hover:bg-indigo-500/30 transition-all duration-500 ease-in-out flex items-center justify-center">
        <svg v-if="icon === 'music'" xmlns="http://www.w3.org/2000/svg"
          class="h-8 w-8 text-indigo-400 group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"
          stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 19V6l12-2v13M9 10l12-2m-12 5v6m-6-6h6m-6 6h6" />
        </svg>
        <svg v-if="icon === 'movie'" xmlns="http://www.w3.org/2000/svg"
          class="h-8 w-8 text-indigo-400 group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"
          stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M4 17V7m0 10l3-3m5 3l3-3m-8 0h3m5 3V7m0 10l3-3m-8 0h3M4 7h16" />
        </svg>
      </div>

      <!-- Tiêu đề -->
      <div class="text-center mt-4">
        <p class="font-medium group-hover:text-indigo-400 transition-colors duration-500 ease-in-out">
          {{ title }}
        </p>
        <p
          class="text-xs mt-1 opacity-60 group-hover:opacity-100 group-hover:text-indigo-200 transition-opacity duration-500 ease-in-out">
          {{ roomType }}
        </p>
      </div>
    </div>

    <!-- Nút hiển thị khi hover -->
    <div
      class="content-hover opacity-0 group-hover:opacity-100 translate-y-[100%] group-hover:translate-y-0 transition-all duration-500 ease-in-out flex flex-col items-center gap-3 absolute bottom-4 left-1/2 transform -translate-x-1/2">
      <!-- Nút Tạo Mới Phòng -->
      <button
        class="w-40 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 shadow-md cursor-pointer transition-all duration-500 ease-in-out">
        Create Room
      </button>

      <!-- Nút Tìm Phòng -->
      <button
        class="w-40 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-md py-2 shadow-md cursor-pointer transition-all duration-500 ease-in-out">
        Search Room
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  roomType: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
});
</script>

<style scoped>
.parent-menu {
  width: 10rem;
  height: 15rem;
  position: relative;
}

.content-initial {
  z-index: 10;
  transform: translateY(0) scale(1);
}

.group-hover .content-initial {
  transform: translateY(-30%) scale(0.75);
}

.content-hover {
  z-index: 5;
  opacity: 0; 
  transform: translateY(100%);
}

.group-hover .content-hover {
  opacity: 1;
  transform: translateY(0);
}
</style>
