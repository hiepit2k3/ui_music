<script setup>
import CardNumberRoom from '@/components/CardNumberRoom.vue';
</script>
<template>
    <div class="w-full md:min-h-screen flex flex-col items-center md:p-8">
        <!-- Phần Video Theo Ngày -->
        <div class="bg-white bg-opacity-90 p-6 rounded-lg shadow-lg w-2/3 mt-10">
            <!-- Tiêu đề -->
            <div class="text-center mb-6">
                <h2 class="text-3xl font-extrabold text-pink-600 tracking-wide">🎵 Watch & Listen 🎶</h2>
                <p class="text-sm text-gray-500 mt-2">Relax with your favorite playlists and videos</p>
            </div>

            <!-- Nội dung Video -->
            <div class="space-y-4">
                <div class="p-4">
                    <!-- Video -->
                    <iframe class="w-full rounded-lg" height="515"
                        src="https://www.youtube.com/embed/JXEBEWuOJnk?si=le6MAgXWydJHk8xD" title="YouTube video player"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

                    <!-- Phần Ngày phát hành và Tiêu đề -->
                    <div class="mt-4">
                        <!-- Ngày phát hành -->
                        <p class="text-sm font-medium text-pink-500 uppercase tracking-wide">📅 12 Tháng 10, 2022</p>
                        <!-- Tiêu đề video -->
                        <p class="text-xl font-bold text-gray-800 mt-2">
                            Let Me Down Slowly, Let Her Go ~ Sad songs playlist for broken hearts that will make you
                        </p>
                    </div>
                </div>
            </div>
        </div>



        <div class="bg-white bg-opacity-90 p-6 rounded-lg shadow-lg w-2/3 mt-6">
            <h1 class="text-3xl font-bold text-gray-800 text-center mb-4">Movie Downloader</h1>

            <!-- Phần Nhập Link -->
            <div class="flex justify-center mb-6">
                <div class="flex flex-col md:flex-row justify-between items-center">
                    <div class="w-full">
                        <input type="text" v-model="movieUrl" placeholder="Enter movie link..."
                            class="w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring focus:ring-pink-300" />
                        <button @click="downloadMovie" :disabled="isDownloading || !movieUrl"
                            class="mt-4 w-full bg-pink-500 text-white py-2 px-4 rounded-lg hover:bg-pink-600 disabled:bg-gray-300 disabled:cursor-not-allowed">
                            {{ isDownloading ? "Downloading..." : "Download" }}
                        </button>
                        <div v-if="progressVisible" class="mt-2 text-pink-500">Downloading...</div>
                    </div>
                </div>
            </div>

            <!-- Phần Danh Sách -->
            <div v-if="downloadedMovies.length" class="mt-6">
                <h2 class="text-2xl font-bold text-gray-800 text-center mb-4">Downloaded Movies</h2>
                <ul class="space-y-4">
                    <li v-for="(movie, index) in downloadedMovies" :key="index"
                        class="flex justify-between items-center bg-pink-100 p-4 rounded-lg shadow-md">
                        <div>
                            <p class="text-lg font-semibold text-gray-700">{{ movie.name }}</p>
                            <p class="text-sm text-gray-500">{{ movie.url }}</p>
                        </div>
                        <a :href="movie.url" target="_blank"
                            class="text-pink-500 underline hover:text-pink-600">Watch</a>
                    </li>
                </ul>
            </div>
            <div v-else class="mt-6 text-center text-gray-500">
                No downloaded movies yet.
            </div>
        </div>


        <!-- Phần Trình Phát Video -->
        <div v-if="showPlayer" class="bg-white bg-opacity-90 p-6 rounded-lg shadow-lg w-full mt-6">
            <h2 class="text-2xl font-bold text-gray-800 text-center mb-4">Now Playing</h2>
            <video controls class="w-full rounded-lg shadow-lg">
                <source :src="movieSource" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </div>

        <!-- Danh Sách Thành Viên -->
        <div class="mt-6 w-2/3 bg-pink-200 p-6 rounded-lg shadow-md">
            <h2 class="text-lg font-semibold text-gray-700 mb-4">Member</h2>
            <div class="flex justify-center flex-wrap gap-4">
                <CardNumberRoom v-for="(number, index) in numbers" :key="index" :avatar="number.avatar"
                    :username="number.username" :userStatus="number.userStatus" />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            movieUrl: "",
            isDownloading: false,
            progressVisible: false,
            showPlayer: false,
            movieSource: "",
            downloadedMovies: [],
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
            videoByDate: [
                {
                    date: "2024-01-01",
                    title: "New Year Celebration",
                    url: "video1.mp4",
                },
                {
                    date: "2024-01-02",
                    title: "Holiday Memories",
                    url: "video2.mp4",
                },
            ],
        };
    },
    methods: {
        downloadMovie() {
            if (!this.movieUrl) return;

            this.isDownloading = true;
            this.progressVisible = true;

            // Mô phỏng tải phim (sau 2 giây, thêm vào danh sách)
            setTimeout(() => {
                this.downloadedMovies.push({
                    name: `Movie ${this.downloadedMovies.length + 1}`,
                    url: this.movieUrl
                });
                this.movieUrl = ""; // Reset input
                this.isDownloading = false;
                this.progressVisible = false;
            }, 2000);
        },
        playVideo(url) {
            this.movieSource = url;
            this.showPlayer = true;
        },
    },
};
</script>

<style scoped>
body {
    margin: 0;
    font-family: 'Arial', sans-serif;
}
</style>