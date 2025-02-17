<template>
    <div class="min-h-screen w-full flex flex-col items-center relative">
        <div class="w-full md::min-h-screen md::bg-cover bg-center"
            style="background-image: url('src/assets/image/background_main.jpg');">
            <!-- Gradient chỉ ở phía dưới -->
            <div class="absolute bottom-0 left-0 w-full"></div>

            <!-- Header và HeroSection -->
            <HeaderComponent />
            <div class="flex w-full justify-start">
                <HeroSection />
            </div>
        </div>
        <div class="d-flex justify-center md:min-h-screen lg:min-h-screen">
            <router-view></router-view>
        </div>

        <BackgroundDecorations>
            <div class="relative z-10 text-center p-10">
                <h1 class="text-4xl font-bold text-pink-600">Feel the Love in Every Beat</h1>
                <p class="text-gray-600 mt-4">Discover the music that touches your soul.</p>
            </div>
        </BackgroundDecorations>

        <footer class="mt-8 text-center text-gray-600 text-sm">
            &copy; 2024 Music for Couples. All rights reserved.
        </footer>
    </div>
</template>

<script>
import HeaderComponent from "./components/HeaderComponent.vue";
import LoginRegisterForm from "./components/LoginRegisterForm.vue";
import AvatarComponent from "./components/AvatarComponent.vue";
import RoomCodeComponent from "./components/RoomCodeComponent.vue";
import BackgroundDecorations from "./components/BackgroundDecorations.vue";
import HeroSection from "./components/HeroSection.vue";

export default {
    components: {
        HeaderComponent,
        LoginRegisterForm,
        AvatarComponent,
        RoomCodeComponent,
        HeroSection,
        BackgroundDecorations,
    },
};
</script>
