<template>
  <div class="max-w-3xl mx-auto p-6 bg-pink-100 rounded-lg shadow-xl relative">
    <h1 class="text-4xl font-bold text-center text-pink-800 mb-6 tracking-wider">Phòng Nghe Nhạc</h1>

    <!-- Music Player -->
    <div class="relative bg-pink-200 p-6 rounded-xl shadow-lg mb-6">
      <div class="text-center">
        <p class="text-2xl font-medium text-pink-800 mb-4">{{ trackName }}</p>
      </div>

      <!-- Progress Bar -->
      <div class="relative w-full h-2 bg-pink-300 rounded-lg overflow-hidden mb-4">
        <div class="absolute top-0 left-0 h-full bg-pink-500 transition-all" :style="{ width: `${progress}%` }"></div>
      </div>
      <div class="flex justify-between text-pink-800 text-sm">
        <span>{{ currentTimeFormatted }}</span>
        <span>{{ durationFormatted }}</span>
      </div>

      <div class="flex justify-center mt-4 space-x-4">
        <button @click="prevTrack"
          class="w-12 h-12 flex justify-center items-center bg-pink-300 rounded-full shadow-md hover:scale-110 transition-transform">
          ⏮️
        </button>
        <button @click="playPause"
          class="w-16 h-16 flex justify-center items-center bg-pink-400 rounded-full shadow-md hover:scale-110 transition-transform">
          {{ isPlaying ? '⏸️' : '▶️' }}
        </button>
        <button @click="nextTrack"
          class="w-12 h-12 flex justify-center items-center bg-pink-300 rounded-full shadow-md hover:scale-110 transition-transform">
          ⏭️
        </button>
      </div>
    </div>

    <!-- List of Songs -->
    <div class="mb-6">
      <ul class="space-y-4">
        <li v-for="(track, index) in tracks" :key="index" class="relative">
          <button @click="selectTrack(index)"
            class="w-full text-left px-4 py-2 bg-pink-50 rounded-lg shadow-sm hover:bg-pink-100 transition duration-300">
            {{ track.name }}
          </button>
        </li>
      </ul>
    </div>

    <!-- Hidden iframe -->
    <iframe ref="youtubePlayer"
      class="hidden"></iframe>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isPlaying: false, // Ban đầu dừng
      currentTrackIndex: 0,
      currentTime: 0,
      duration: 0,
      player: null, // YouTube Player
      playerReady: false, // Thêm cờ kiểm tra player đã sẵn sàng chưa
      tracks: [
        { name: 'Bài Hát 1', url: '5H3SC47cBpo' },
        { name: 'Bài Hát 2', url: 'dQw4w9WgXcQ' },
        { name: 'Bài Hát 3', url: '3JZ_D3ELwOQ' },
      ],
    };
  },
  computed: {
    videoId() {
      return this.tracks[this.currentTrackIndex].url;
    },
    trackName() {
      return this.tracks[this.currentTrackIndex].name;
    },
    progress() {
      return this.duration > 0 ? (this.currentTime / this.duration) * 100 : 0;
    },
    currentTimeFormatted() {
      return this.formatTime(this.currentTime);
    },
    durationFormatted() {
      return this.formatTime(this.duration);
    },
  },
  methods: {
    initializePlayer() {
      this.player = new YT.Player(this.$refs.youtubePlayer, {
        videoId: this.videoId,
        events: {
          onReady: this.onPlayerReady,
          onStateChange: this.onPlayerStateChange,
        },
      });
    },
    onPlayerReady(event) {
      this.duration = event.target.getDuration();
      this.playerReady = true; // Đánh dấu player đã sẵn sàng
    },
    onPlayerStateChange(event) {
      if (event.data === YT.PlayerState.PLAYING) {
        this.isPlaying = true;
        this.trackProgress();
      } else {
        this.isPlaying = false;
      }
    },
    trackProgress() {
      if (this.isPlaying) {
        this.currentTime = Math.floor(this.player.getCurrentTime());
        setTimeout(this.trackProgress, 1000); // Cập nhật mỗi giây
      }
    },
    playPause() {
      if (!this.playerReady) {
        console.error("Player chưa sẵn sàng, đang đợi...");
        // Kiểm tra lại sau một khoảng thời gian khi player sẵn sàng
        const checkPlayerReadyInterval = setInterval(() => {
          if (this.playerReady) {
            clearInterval(checkPlayerReadyInterval); // Dừng kiểm tra khi player đã sẵn sàng
            this.playPause(); // Gọi lại playPause() sau khi player sẵn sàng
          }
        }, 500); // Kiểm tra mỗi 500ms
        return;
      }

      if (this.isPlaying) {
        this.player.pauseVideo();
      } else {
        this.player.playVideo();
      }
    },
    prevTrack() {
      if (this.currentTrackIndex > 0) {
        this.currentTrackIndex--;
      } else {
        this.currentTrackIndex = this.tracks.length - 1;
      }
      this.loadTrack();
    },
    nextTrack() {
      if (this.currentTrackIndex < this.tracks.length - 1) {
        this.currentTrackIndex++;
      } else {
        this.currentTrackIndex = 0;
      }
      this.loadTrack();
    },
    selectTrack(index) {
      this.currentTrackIndex = index;
      this.loadTrack();
    },
    loadTrack() {
      this.isPlaying = false;
      this.currentTime = 0;
      this.duration = 0;
      if (this.playerReady) {
        this.player.loadVideoById(this.videoId);
      }
    },
    formatTime(seconds) {
      const minutes = Math.floor(seconds / 60);
      const secs = Math.floor(seconds % 60);
      return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    },
  },
  mounted() {
    // Tải YouTube Iframe API chỉ một lần
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      // Khi API YouTube sẵn sàng, gọi initializePlayer
      window.onYouTubeIframeAPIReady = this.initializePlayer;
    } else {
      this.initializePlayer();
    }
  },
};

</script>
