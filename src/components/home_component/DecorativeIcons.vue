<template>
    <div>
        <div class="absolute top-0 left-0 flex space-x-2">
            <div class="decorative-icon text-blue-500"><i class="fas fa-music text-xl"></i></div>
            <div class="decorative-icon text-red-500"><i class="fas fa-play text-xl"></i></div>
        </div>
        <div class="absolute top-0 right-0 flex space-x-2">
            <div class="decorative-icon text-green-500"><i class="fas fa-video text-xl"></i></div>
            <div class="decorative-icon text-blue-500"><i class="fas fa-music text-xl"></i></div>
        </div>
        <div class="absolute bottom-0 left-0 flex space-x-2">
            <div class="decorative-icon text-yellow-500"><i class="fas fa-play text-xl"></i></div>
            <div class="decorative-icon text-red-500"><i class="fas fa-video text-xl"></i></div>
        </div>
        <div class="absolute bottom-0 right-0 flex space-x-2">
            <div class="decorative-icon text-purple-500"><i class="fas fa-music text-xl"></i></div>
            <div class="decorative-icon text-green-500"><i class="fas fa-play text-xl"></i></div>
        </div>
    </div>
</template>

<script>
export default {};
</script>

<style>
.decorative-icon {
    background: linear-gradient(145deg, #e6e6e6, #ffffff);
    box-shadow: 5px 5px 15px #d9d9d9, -5px -5px 15px #ffffff;
    border-radius: 50%;
    padding: 10px;
}
</style>