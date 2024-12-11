<template>
    <div class="bg-blue-light p-6 rounded-lg shadow-lg">
      <h2 class="text-center text-lg font-bold text-blue-dark mb-4">
        Continue with Room Code
      </h2>
      <input
        type="text"
        placeholder="Enter Room Code"
        class="w-full px-4 py-2 rounded-lg border border-blue-dark focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <button
        class="w-full mt-4 bg-blue text-white font-semibold py-2 rounded-lg hover:bg-blue-dark"
      >
        Continue
      </button>
    </div>
  </template>
  
  <script>
  export default {
    name: "RoomCodeComponent",
  };
  </script>
  