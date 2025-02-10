<template>
    <div class="flex justify-center rounded-lg items-center ">
      <div class="p-3 w-full">
        <!-- Spotify Header -->
        <div class="flex items-center mb-4">
          <img src="https://upload.wikimedia.org/wikipedia/commons/2/26/Spotify_logo_with_text.svg" alt="Spotify Logo" class="w-6 h-6 mr-2">
          <h2 class="text-lg font-bold text-gray-800">Play List</h2>
        </div>
  
        <!-- Song List -->
        <ul class="space-y-4">
          <li class="flex items-center hover:bg-gray-100 p-2 rounded transition">
            <div class="w-6 h-6 flex justify-center items-center bg-green-500 text-white rounded-full">
              <i class="fas fa-signal"></i>
            </div>
            <div class="ml-4">
              <p class="text-gray-800 font-semibold">Time in a Bottle</p>
              <p class="text-gray-500 text-sm">Jim Croce</p>
            </div>
          </li>
  
          <li class="flex items-center hover:bg-gray-100 p-2 rounded transition">
            <div class="w-6 h-6 flex justify-center items-center bg-gray-200 text-black rounded-full">
              <i class="fas fa-play"></i>
            </div>
            <div class="ml-4">
              <p class="text-gray-800 font-semibold">My Way</p>
              <p class="text-gray-500 text-sm">Frank Sinatra</p>
            </div>
          </li>
  
          <li class="flex items-center hover:bg-gray-100 p-2 rounded transition">
            <div class="w-6 h-6 flex justify-center items-center bg-gray-200 text-black rounded-full">
              <i class="fas fa-play"></i>
            </div>
            <div class="ml-4">
              <p class="text-gray-800 font-semibold">Lemon Tree</p>
              <p class="text-gray-500 text-sm">Fools Garden</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name:"Playlist",
    data() {
      return {
        songs: [
          { title: 'Time in a Bottle', artist: 'Jim Croce', isPlaying: true },
          { title: 'My Way', artist: 'Frank Sinatra', isPlaying: false },
          { title: 'Lemon Tree', artist: 'Fools Garden', isPlaying: false },
        ],
      };
    },
  };
  </script>
  
  <style scoped>
  body {
    font-family: 'Arial', sans-serif;
  }

  li:hover {
    cursor: pointer;
    background-color: #e692e9;
    transition: background-color 0.3s ease;
  }
  </style>
