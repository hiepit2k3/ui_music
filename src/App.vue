<template>
    <div class="min-h-screen w-full flex flex-col items-center relative">
        <div class="w-full md::min-h-screen md::bg-cover bg-center"
            style="background-image: url(src/assets/image/background_main.jpg);">   
            <!-- Gradient chỉ ở phía dưới -->
            <div class="absolute bottom-0 left-0 w-full"></div>

            <!-- Header và HeroSection -->
            <HeaderComponent />
            <div class="relative flex w-full justify-start z-10">
                <HeroSection />
            </div>
        </div>

        <!-- <SlideComponent /> -->

        <!-- Slide Section (Carousel) -->
        <!-- <div class="mt-8 w-full">
      <SlideComponent />
    </div> -->

        <!-- <div class="mt-8 flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-8 relative">
        <div class="absolute inset-0 -z-10 overflow-hidden">
            <svg class="w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                <path fill="#fbcfe8" fill-opacity="0.8" d="M0,64L40,85.3C80,107,160,149,240,181.3C320,213,400,235,480,240C560,245,640,235,720,208C800,181,880,139,960,138.7C1040,139,1120,181,1200,176C1280,171,1360,117,1400,90.7L1440,64L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"></path>
                <path fill="#e5d0f4" fill-opacity="0.5" d="M0,96L48,117.3C96,139,192,181,288,202.7C384,224,480,224,576,192C672,160,768,96,864,96C960,96,1056,160,1152,186.7C1248,213,1344,203,1392,197.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
            </svg>
        </div>

        <LoginRegisterForm class="w-full md:w-1/2 bg-white rounded-lg shadow-md p-4" />
        <AvatarComponent class="w-full md:w-1/2 bg-white rounded-lg shadow-md p-4" />
    </div>

    <div class="mt-8 flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-8">
        <RoomCodeComponent class="w-full md:w-1/2 bg-white rounded-lg shadow-md p-4" />
        <ProfileComponent class="w-full md:w-1/2 bg-white rounded-lg shadow-md p-4" />
    </div>

    <footer class="mt-8 text-center text-gray-600 text-sm">
        &copy; 2024 Music for Couples. All rights reserved.
    </footer> -->

        <router-view></router-view>

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
import ProfileComponent from "./components/ProfileComponent.vue";
import SlideComponent from "./components/SlideComponent.vue";
import BackgroundDecorations from "./components/BackgroundDecorations.vue";
import HeroSection from "./components/HeroSection.vue";

export default {
    components: {
        HeaderComponent,
        LoginRegisterForm,
        AvatarComponent,
        RoomCodeComponent,
        ProfileComponent,
        SlideComponent,
        HeroSection,
        BackgroundDecorations,
    },
};
</script>
