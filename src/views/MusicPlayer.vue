<script setup>
import Playlist from "@/components/Playlist.vue";
import CardNumberRoom from "@/components/CardNumberRoom.vue";
import { ref, reactive, onMounted, onUnmounted } from "vue";
import socketService from "@/services/socketService";
import { axiosPrivateInstance } from "@/services/authAxios";
import { useRoute } from "vue-router";

const route = useRoute();
const isPlaying = ref(false);
const searcher = ref("");
const searchResults = ref([]);
const currentTime = ref(0);
const duration = ref(0);
const roomId = ref(route.params.roomid);
const permission = ref("");

let player = null;
let socket = null;

// Cờ để kiểm tra YouTube Player đã sẵn sàng
const isPlayerReady = ref(false);

// Lưu hành động chờ thực hiện khi Player sẵn sàng
const queuedAction = ref(null);

const musicState = reactive({
  songTitle: "Song Title",
  artistName: "Artist Name",
  youtubeVideoId: null,
  numbers: [
    {
      avatar: "src/assets/image/avatar_A.jpg",
      username: "User A",
      userStatus: "Listening",
    },
    {
      avatar: "src/assets/image/boy.jpg",
      username: "User B",
      userStatus: "Listening",
    },
  ],
});

const searchMusic = async () => {
  try {
    const response = await axiosPrivateInstance.post("music/search", {
      query: searcher.value,
    });
    searchResults.value = response.data.data;
    console.log("Search results:", searchResults.value);
  } catch (error) {
    console.error("Search Music Error:", error);
  }
};

const connectToSocket = async () => {
  // Kết nối tới namespace "music"
  socket = await socketService.connectToNamespace("music");

  // Tham gia phòng
  socketService.joinRoom(roomId.value);

  socket.on("receiveMessage", (message) => {
    console.log("Message received:", message);
    if (message.action === "changeSong") {
      musicState.youtubeVideoId = message.video_source;
      player.loadVideoById(musicState.youtubeVideoId);
      setTimeout(() => {
        player.seekTo(1);
      }, 1000);
    } else {
      handleSocketAction(message);
    }
  });

  socket.on("syncMusic", (data) => {
    console.log("Syncing music:", data);
    onPlayerReady();
    permission.value = data.role;
    musicState.youtubeVideoId = data.track;
    player.loadVideoById(musicState.youtubeVideoId);  
    setTimeout(() => {
      player.seekTo(data.elapsedTime);
    }, 1000);
  });
};

const disconnectFromSocket = () => {
  if (socket) {
    socketService.leaveRoom(roomId.value);
    socket.disconnect();
    console.log("Disconnected from Music namespace");
  }
};

const onPlayerReady = () => {
  console.log("Player is ready!");
  isPlayerReady.value = true;
  duration.value = player.getDuration();

  if (queuedAction.value) {
    console.log("Executing queued action:", queuedAction.value);
    handleSocketAction(queuedAction.value);
    queuedAction.value = null;
  }

  updateProgressBar();
};

const handleSocketAction = (message) => {
  if (message.action === "play") {
    player.playVideo();
  } else if (message.action === "pause") {
    player.pauseVideo();
  } else if (message.action === "seek") {
    player.seekTo(message.currentTime);
  }
};

// Kiểm tra trạng thái của player
const onPlayerStateChange = (event) => {
  if (event.data === YT.PlayerState.PLAYING) {
    isPlaying.value = true;
    updateProgressBar();
  } else {
    isPlaying.value = false;
  }
};

// Cập nhật thanh tiến trình
const updateProgressBar = () => {
  if (isPlaying.value) {
    const interval = setInterval(() => {
      currentTime.value = player.getCurrentTime(); // Cập nhật thời gian hiện tại
      if (!isPlaying.value) clearInterval(interval);
    }, 1000); // Cập nhật mỗi giây
  }
};

// Play/Pause video
const togglePlay = () => {
  if (isPlaying.value) {
    socketService.sendMessage({
      action: "pause",
      roomId: roomId.value,
    });
    player.pauseVideo();
  } else {
    socketService.sendMessage({
      action: "play",
      roomId: roomId.value,
    });
    player.playVideo();
  }
};

// Seek video
const seekVideo = () => {
  player.seekTo(currentTime.value);
  socketService.sendMessage({
    action: "seek",
    currentTime: currentTime.value,
    roomId: roomId.value,
  });
};

const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
};

const handleChooseMusic = (videoId) => {
  musicState.youtubeVideoId = videoId;
  musicState.songTitle = searchResults.value.find((result) => result.videoId === videoId).title;
  player.loadVideoById(videoId);
  socketService.sendMessage({
    action: "changeSong",
    roomId: roomId.value,
    youtubeVideoId: videoId,
    isPlaying: isPlaying.value,
  });
};


onMounted(() => {
  // Kết nối tới WebSocket khi vào phòng
  connectToSocket();

  // Tải và khởi tạo YouTube Iframe Player API
  const tag = document.createElement("script");
  tag.src = "https://www.youtube.com/iframe_api";
  document.body.appendChild(tag);

  window.onYouTubeIframeAPIReady = () => {
    player = new YT.Player("player", {
      videoId: musicState.youtubeVideoId,
      events: {
        onReady: onPlayerReady,
        onStateChange: onPlayerStateChange,
      },
    });
  };
});

onUnmounted(() => {
  disconnectFromSocket();
});
</script>


<template>
  <div class="md:min-h-screen lg:min-h-screen xl:min-h-screen flex w-full justify-center items-center p-4 md:p-8">
    <div class="bg-white p-6 rounded-xl shadow-xl w-full">
      <div class="flex flex-wrap gap-4 w-full">
        <!-- Search Bar -->
        <div
          class="w-full md:w-[calc(50%-9px)] p-2 bg-gradient-to-b from-pink-200 via-pink-100 to-purple-100 rounded-lg shadow-md cursor-pointer">
          <div class="relative">
            <input placeholder="Search..." v-model="searcher"
              class="input shadow-lg focus:border-2 border-gray-300 rounded-xl w-full transition-all focus:w-full outline-none p-2 pr-10"
              name="search" type="search" />
            <svg class="absolute top-3 right-3 text-gray-500 w-5 h-5" @click="searchMusic" stroke="currentColor"
              stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                stroke-linejoin="round" stroke-linecap="round" />
            </svg>
          </div>

          <!-- Kết quả tìm kiếm -->
          <div v-if="searchResults.length > 0">
            <div v-for="(result, index) in searchResults" :key="index"
              class="mt-3 h-40 flex flex-col justify-center gap-2 bg-indigo-500 rounded-lg shadow p-2">
              <div class="flex gap-2" @click="handleChooseMusic(result.videoId)">
                <img :src="result.thumbnail" alt="" class="bg-purple-200 w-24 h-24 shrink-0 rounded-lg" />
                <div class="flex flex-col text-white">
                  <span class="font-bold italic">{{ result.title }}</span>
                </div>
              </div>
              <button class="hover:bg-purple-300 bg-neutral-50 font-bold text-indigo-500 rounded p-2">
                Download
              </button>
            </div>
          </div>
        </div>

        <!-- Playlist -->
        <div
          class="w-full md:w-[calc(50%-9px)] p-2 bg-gradient-to-b from-pink-200 via-pink-100 to-purple-100 rounded-lg shadow-md cursor-pointer">
          <Playlist />
        </div>
      </div>

      <!-- Main Music Player -->
      <div class="mt-6 bg-gradient-to-b from-pink-200 via-pink-100 to-purple-100 rounded-lg shadow-md">
        <div
          class="p-3 bg-gradient-to-b from-pink-200 via-pink-100 to-purple-100 rounded-lg shadow-md relative transition-transform duration-300 cursor-pointer">
          <div class="rounded-lg overflow-hidden">
            <img src="../assets/image/background_music.jpg" alt="Album art"
              class="w-full h-40 object-cover rounded-lg transition-transform duration-300 hover:scale-110" />
          </div>

          <div class="mt-4 text-center">
            <h2 class="text-lg font-semibold text-gray-700">{{ musicState.songTitle }}</h2>
            <p class="text-sm text-gray-500">{{ musicState.artistName }}</p>
          </div>

          <div class="video-container relative h-64 hidden">
            <div id="player"></div>
          </div>
          <div class="mt-4 text-center">
            <button @click="togglePlay" :disabled="permission !== 'OWNER'"
              class="bg-pink-500 text-white font-bold px-4 py-2 rounded-full shadow-md hover:bg-indigo-600 transition">
              {{ isPlaying ? "Pause" : "Play" }}
            </button>
          </div>

          <div class="mt-4">
            <input type="range" v-model="currentTime" :max="duration" @input="seekVideo"
              class="w-full h-2 bg-pink-500 rounded-lg cursor-pointer" />
            <div class="flex justify-between text-sm text-gray-600 mt-2">
              <span>{{ formatTime(currentTime) }}</span> / <span>{{ formatTime(duration) }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Equalizer Section -->
      <div class="mt-6 bg-pink-200 p-6 rounded-lg shadow-md">
        <h2 class="text-lg font-semibold text-gray-700 mb-4">Member</h2>
        <div class="flex justify-center flex-wrap gap-4">
          <CardNumberRoom v-for="(number, index) in musicState.numbers" :key="index" :avatar="number.avatar"
            :username="number.username" :userStatus="number.userStatus" />
        </div>
      </div>
    </div>
  </div>
</template>