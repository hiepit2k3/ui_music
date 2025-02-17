<template>
    <div class='flex items-center justify-center min-h-screen'>
        <div class='bg-pink-200 p-8 rounded-lg shadow-lg text-center relative'>
            <!-- <div class='absolute top-0 left-0 w-full h-full flex items-center justify-center'>
                <img v-for='(pos, index) in positions' :key='index' :class='pos.class' class='absolute w-6 h-6'
                    :src='pos.src' alt='Decorative elements' />
            </div> -->
            <div class='relative z-10'>
                <div class='text-2xl font-bold text-black mb-2'>OOPS!</div>
                <img class='mx-auto mb-4 w-80 h-50 border-2 border-gray-300 rounded-full shadow-md opacity-80' :src='robotIcon' alt='Robot icon' />
                <div class='text-6xl font-bold text-red-600 mb-2'>404</div>
                <div class='text-sm text-gray-700 mb-4'>404E NOT FOUND</div>
                <div class='text-2xl font-bold text-black mb-4'>PAGE NOT FOUND</div>
                <button class='bg-red-500 text-white py-2 px-4 rounded-full' @click='goHome'>
                    RETURN TO THE HOMEPAGE
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            robotIcon: "/src/assets/image/404.gif",
            positions: [
                { class: "top-4 left-4", src: "https://placehold.co/24x24" },
                { class: "top-4 right-4", src: "https://placehold.co/24x24" },
                { class: "bottom-4 left-4", src: "https://placehold.co/24x24" },
                { class: "bottom-4 right-4", src: "https://placehold.co/24x24" }
            ]
        }
    },
    methods: {
        goHome() {
            this.$router.push('/');
        }
    }
}
</script>

<style scoped>
button {
    transition: background-color 0.3s;
}
button:hover {
    background-color: #c53030;
}
</style>
