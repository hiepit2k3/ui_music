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
        <div
          class="absolute top-0 left-0 h-full bg-pink-500 transition-all"
          :style="{ width: `${progress}%` }"
        ></div>
      </div>
      <div class="flex justify-between text-pink-800 text-sm">
        <span>{{ currentTimeFormatted }}</span>
        <span>{{ durationFormatted }}</span>
      </div>

      <div class="flex justify-center mt-4 space-x-4">
        <button
          @click="prevTrack"
          class="w-12 h-12 flex justify-center items-center bg-pink-300 rounded-full shadow-md hover:scale-110 transition-transform"
        >
          ⏮️
        </button>
        <button
          @click="playPause"
          class="w-16 h-16 flex justify-center items-center bg-pink-400 rounded-full shadow-md hover:scale-110 transition-transform"
        >
          {{ isPlaying ? '⏸️' : '▶️' }}
        </button>
        <button
          @click="nextTrack"
          class="w-12 h-12 flex justify-center items-center bg-pink-300 rounded-full shadow-md hover:scale-110 transition-transform"
        >
          ⏭️
        </button>
      </div>
    </div>

    <!-- List of Songs -->
    <div class="mb-6">
      <ul class="space-y-4">
        <li
          v-for="(track, index) in tracks"
          :key="index"
          class="relative"
        >
          <button
            @click="selectTrack(index)"
            class="w-full text-left px-4 py-2 bg-pink-50 rounded-lg shadow-sm hover:bg-pink-100 transition duration-300"
          >
            {{ track.name }}
          </button>
        </li>
      </ul>
    </div>

    <!-- Hidden iframe -->
    <iframe
      ref="youtubePlayer"
      :src="audioUrl"
      frameborder="0"
      allow="autoplay"
      allowfullscreen
      class="hidden"
    ></iframe>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isPlaying: true,
      currentTrackIndex: 0,
      currentTime: 0,
      duration: 0,
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
    audioUrl() {
      return `https://www.youtube.com/embed/${this.videoId}?autoplay=1&controls=0&modestbranding=1&showinfo=0&rel=0`;
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
    playPause() {
      this.isPlaying = !this.isPlaying;
      const iframe = this.$refs.youtubePlayer;
      if (this.isPlaying) {
        iframe.src = this.audioUrl; // Replay
      } else {
        iframe.src = ''; // Stop
      }
    },
    prevTrack() {
      if (this.currentTrackIndex > 0) {
        this.currentTrackIndex--;
      } else {
        this.currentTrackIndex = this.tracks.length - 1;
      }
      this.isPlaying = true;
    },
    nextTrack() {
      if (this.currentTrackIndex < this.tracks.length - 1) {
        this.currentTrackIndex++;
      } else {
        this.currentTrackIndex = 0;
      }
      this.isPlaying = true;
    },
    selectTrack(index) {
      this.currentTrackIndex = index;
      this.isPlaying = true;
    },
    formatTime(seconds) {
      const minutes = Math.floor(seconds / 60);
      const secs = Math.floor(seconds % 60);
      return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    },
  },
  mounted() {
    // Mock duration & progress (YouTube iframe API can also be integrated)
    this.duration = 240; // Example duration: 4 minutes
    setInterval(() => {
      if (this.isPlaying && this.currentTime < this.duration) {
        this.currentTime++;
      }
    }, 1000);
  },
};
</script>
