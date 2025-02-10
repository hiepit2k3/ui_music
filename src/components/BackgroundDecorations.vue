<template>
    <div class="relative w-full h-full overflow-hidden">
        <!-- Decoration 1: Nốt nhạc -->
        <div
            class="absolute top-10 left-10 w-12 h-12 bg-pink-300 rounded-full flex items-center justify-center opacity-70 animate-bounce">
            🎵
        </div>

        <!-- Decoration 2: Lá hoa -->
        <div class="absolute bottom-20 right-10 w-16 h-16 bg-pink-200 rounded-full opacity-50"></div>

        <!-- Decoration 3: Bông hoa lớn -->
        <div class="absolute top-1/4 left-1/3 w-32 h-32 bg-pink-100 rounded-full opacity-50"></div>

        <!-- Decoration 4: Nốt nhạc khác -->
        <div
            class="absolute bottom-10 left-1/4 w-10 h-10 bg-pink-400 flex items-center justify-center rounded-full opacity-60 animate-pulse">
                
        </div>

        <!-- Decoration 5: Hoa tròn nhỏ -->
        <div class="absolute top-1/2 right-1/4 w-8 h-8 bg-pink-300 rounded-full opacity-70"></div>

        <!-- Nội dung con -->
        <slot />
    </div>
</template>

<script>
export default {
    name: "BackgroundDecorations",
};
</script>

<style scoped>
/* Thêm Animation nếu Tailwind chưa đủ */
@keyframes bounce {

    0%,
    100% {
        transform: translateY(0);
    }

    50% {
        transform: translateY(-10px);
    }
}

@keyframes pulse {

    0%,
    100% {
        transform: scale(1);
    }

    50% {
        transform: scale(1.1);
    }
}
</style>