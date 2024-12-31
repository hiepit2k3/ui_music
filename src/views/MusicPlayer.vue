<script setup>
import Playlist from '@/components/Playlist.vue';
import CardNumberRoom from '@/components/CardNumberRoom.vue';
import { ref, reactive, onMounted, onUnmounted } from "vue";

const isPlaylistHovered = ref(false);
const isSearchHovered = ref(false);
const isPlaying = ref(false);
const youtubePlayer = ref(null);

const musicState = reactive({
  songTitle: "Song Title",
  artistName: "Artist Name",
  youtubeVideoId: "stvWuowo1dU",
  numbers: [
    {
      avatar: "src/assets/image/avatar_A.jpg",
      username: "User A",
      userStatus: 'Listening',
    },
    {
      avatar: "src/assets/image/boy.jpg",
      username: "User B",
      userStatus: 'Listening',
    },
  ],
});

let socket = null;

function handleMusicListMouseEnter() {
  isPlaylistHovered.value = true;
}

function handleMusicListMouseLeave() {
  isPlaylistHovered.value = false;
}

function handleMusicSearchMouseEnter() {
  isSearchHovered.value = true;
}

function handleMusicSearchMouseLeave() {
  isSearchHovered.value = false;
}

function musicPlayerClass() {
  const isHovered = isPlaylistHovered.value || isSearchHovered.value;
  return {
    'md:col-span-2': isHovered,
    'md:col-span-3': !isHovered,
    'transform scale-100 transition-transform duration-300': true,
  };
}

function musicListClass() {
  return {
    'md:col-span-2': isPlaylistHovered.value,
    'transform scale-100 transition-transform duration-300': true,
  };
}

function musicSearchClass() {
  return {
    'md:col-span-2': isSearchHovered.value,
    'transform scale-100 transition-transform duration-300': true,
  };
}

function togglePlayPause() {
  if (youtubePlayer.value) {
    if (isPlaying.value) {
      youtubePlayer.value.pauseVideo();
      sendMessage("pause", {});
    } else {
      youtubePlayer.value.playVideo();
      sendMessage("play", {});
    }
    isPlaying.value = !isPlaying.value;
  } else {
    console.warn("Player chưa được khởi tạo!");
  }
}

function nextSong() {
  if (youtubePlayer.value) {
    musicState.youtubeVideoId = "nextVideoId"; // Cập nhật ID video thực tế
    youtubePlayer.value.loadVideoById(musicState.youtubeVideoId);
    isPlaying.value = true;
    sendMessage("next", { videoId: musicState.youtubeVideoId });
  } else {
    console.warn("Player chưa được khởi tạo!");
  }
}

function previousSong() {
  if (youtubePlayer.value) {
    musicState.youtubeVideoId = "previousVideoId"; // Cập nhật ID video thực tế
    youtubePlayer.value.loadVideoById(musicState.youtubeVideoId);
    isPlaying.value = true;
    sendMessage("previous", { videoId: musicState.youtubeVideoId });
  } else {
    console.warn("Player chưa được khởi tạo!");
  }
}

function initializePlayer() {
  youtubePlayer.value = new YT.Player("youtube-player", {
    height: "100%",
    width: "100%",
    videoId: musicState.youtubeVideoId,
    events: {
      onReady: (event) => {
        console.log("Player ready", event);
      },
      onStateChange: (event) => {
        if (event.data === YT.PlayerState.ENDED) {
          nextSong();
        }
      },
    },
  });
}

function connectWebSocket() {
  socket = new WebSocket("ws://localhost:8000/ws/heartbeats/422134/");

  socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    const { action, payload } = data;

    switch (action) {
      case "play":
        youtubePlayer.value?.playVideo();
        isPlaying.value = true;
        break;
      case "pause":
        youtubePlayer.value?.pauseVideo();
        isPlaying.value = false;
        break;
      case "next":
      case "previous":
        if (payload.videoId) {
          musicState.youtubeVideoId = payload.videoId;
          youtubePlayer.value?.loadVideoById(payload.videoId);
          isPlaying.value = true;
        }
        break;
      default:
        console.warn("Hành động không được hỗ trợ:", action);
    }
  };

  socket.onclose = () => {
    console.warn("WebSocket đã đóng kết nối.");
  };
}

function sendMessage(action, payload) {
  if (socket && socket.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify({ action, payload }));
  } else {
    console.warn("WebSocket chưa kết nối.");
  }
}

(() => {
  if (typeof YT === "undefined" || typeof YT.Player === "undefined") {
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    window.onYouTubeIframeAPIReady = initializePlayer;
  } else {
    initializePlayer();
  }

  connectWebSocket();
});

onUnmounted(() => {
  if (socket) {
    socket.close();
  }
});
</script>

<template>
  <div class="min-h-screen flex justify-center items-center p-4 md:p-8">
    <div class="bg-white p-6 rounded-xl shadow-xl w-full max-w-6xl">
      <div class="grid grid-cols-1 md:grid-cols-5 gap-4">
        <!-- Search Bar -->
        <div @mouseover="handleMusicSearchMouseEnter" @mouseleave="handleMusicSearchMouseLeave"
          :class="musicSearchClass()"
          class="col-span-1 bg-gradient-to-b from-pink-200 via-pink-100 to-purple-100 p-4 rounded-lg shadow-md hover:scale-105">
          <div class="relative">
            <input placeholder="Search..."
              class="input shadow-lg focus:border-2 border-gray-300 rounded-xl w-full transition-all focus:w-full outline-none p-2 pr-10"
              name="search" type="search" />
            <svg class="absolute top-3 right-3 text-gray-500 w-5 h-5" stroke="currentColor" stroke-width="1.5"
              viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                stroke-linejoin="round" stroke-linecap="round" />
            </svg>
          </div>
        </div>

        <!-- Main Music Player -->
        <div :class="musicPlayerClass()"
          class="col-span-1 bg-pink-200 p-3 rounded-lg shadow-md relative transition-transform duration-300 hover:scale-105"
          id="music-player">

          <!-- Ảnh nền -->
          <div class="rounded-lg overflow-hidden">
            <img src="../assets/image/background_music.jpg" alt="Album art"
              class="w-full h-40 object-cover rounded-lg transition-transform duration-300 hover:scale-110" />
          </div>

          <!-- Tên bài hát & Nghệ sĩ -->
          <div class="mt-4 text-center">
            <h2 class="text-lg font-semibold text-gray-700">{{ musicState.songTitle }}</h2>
            <p class="text-sm text-gray-500">{{ musicState.artistName }}</p>
          </div>

          <!-- Trình phát YouTube -->
          <div class="mt-4">
            <div ref="youtubePlayer" id="youtube-player" class="w-full h-40 rounded-lg"></div>
          </div>

          <!-- <iframe loading="lazy" title="Xem phim Đông Chí Tập 1 Vietsub, Love Song in Winter (2024)" height="455"
            width="100%" id="mainPlayer" src="https://cloudasiatv.xyz/embed/vt/Vde49Ulx" frameborder="0"
            allowfullscreen="true">Browser not compatible.
          </iframe> -->

          <video class="jw-video jw-reset" tabindex="-1" disableremoteplayback="" webkit-playsinline="" playsinline=""
            preload="auto"
            src="https://storage.googleapis.com/mediastorage/1735618804489/of4g8v1r1ca/156375862.mp4#mp4/156375862/360p"></video>

          <!-- Thanh điều khiển -->
          <div class="flex items-center justify-between mt-4">
            <button @click="previousSong" class="text-gray-500 hover:text-pink-500">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button @click="togglePlayPause"
              class="bg-pink-500 text-white p-3 rounded-full shadow-lg hover:bg-pink-600">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                stroke="currentColor" class="w-6 h-6">
                <path v-if="!isPlaying" stroke-linecap="round" stroke-linejoin="round" d="M5 3v18l15-9L5 3z" />
                <path v-else stroke-linecap="round" stroke-linejoin="round" d="M6 4h4v16H6zm8 0h4v16h-4z" />
              </svg>
            </button>
            <button @click="nextSong" class="text-gray-500 hover:text-pink-500">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          <!-- Thanh tiến trình -->
          <div class="mt-4">
            <div class="h-2 bg-gray-200 rounded-full">
              <div class="h-2 bg-pink-500 rounded-full w-1/2"></div>
            </div>
          </div>
          <div class="mt-2 flex justify-between text-sm text-gray-500">
            <span>0:00</span>
            <span>3:45</span>
          </div>
        </div>

        <!-- Playlist -->
        <div @mouseover="handleMusicListMouseEnter" @mouseleave="handleMusicListMouseLeave" :class="musicListClass()"
          class="col-span-1 bg-gradient-to-b from-pink-200 via-pink-100 to-purple-100 p-4 rounded-lg shadow-md transition-transform duration-300 hover:scale-105"
          id="playlist">
          <Playlist />
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
