<template>
    <div
        class="relative flex flex-col items-center justify-center p-4 bg-gradient-to-b from-purple-600 to-pink-500 rounded-lg shadow-md">
        <!-- Vòng sáng bao quanh -->
        <div class="relative w-40 h-40">
            <div
                class="absolute inset-0 rounded-full border-4 border-transparent bg-gradient-to-r from-pink-500 via-orange-400 to-yellow-300 animate-spin-slow">
            </div>
            <img :src="avatar" alt="User Avatar"
                class="absolute inset-1/2 transform -translate-x-1/2 -translate-y-1/2 w-36 h-36 rounded-full object-cover shadow-md" />
        </div>
        <!-- Thông tin người dùng -->
        <div class="text-center mt-4 text-white">
            <div class="text-xl font-semibold">{{ username }}</div>
            <div class="text-sm opacity-75">{{ userStatus }}</div>
        </div>
    </div>
</template>

<script setup>
defineProps({
    avatar: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    userStatus: {
        type: String,
        required: true,
    }
});
</script>

<style scoped>
/* Animation for spinning */
@keyframes spin-slow {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}

.animate-spin-slow {
    animation: spin-slow 8s linear infinite;
}
</style>