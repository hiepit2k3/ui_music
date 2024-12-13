<template>
    <div class="card bg-pink-50 rounded-lg shadow-md hover:shadow-lg transition p-4 text-center">
      <img
        :src="image"
        :alt="title"
        class="w-full h-32 object-cover rounded-md mb-4"
      />
      <h3 class="text-lg font-semibold text-gray-700">{{ title }}</h3>
    </div>
  </template>
  
  <script>
  export default {
    name: "Card",
    props: {
      title: {
        type: String,
        required: true,
      },
      image: {
        type: String,
        required: true,
      },
    },
  };
  </script>
  
  <style scoped>
  /* Thêm style nếu cần */
  </style>
  