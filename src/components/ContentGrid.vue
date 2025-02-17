<template>
  <div class="flex flex-col items-center justify-center min-h-screen p-4">
    <h1 class="text-4xl font-bold mb-8">CREATE SYNC ROOM</h1>
    <MainContainer>
      <template #decorative-icons>
        <DecorativeIcons />
      </template>

      <div class="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8">
        <RoomCard class="bg-gradient-to-br from-blue-200 to-blue-400
 shadow-lg rounded-2xl" title="MUSIC ROOM" description="Listen to your favorite tunes with friends in real-time."
          buttonColor="bg-blue-500" :image="logoMusic" />
        <RoomCard class="bg-gradient-to-br from-pink-200 to-pink-400 shadow-lg rounded-2xl  
" title="MOVIE ROOM" description="Watch movies together with friends in sync." buttonColor="bg-pink-500"
          :image="logoMovie" />
      </div>

      <div class="flex items-center justify-center space-x-4 mt-8">
        <IconButton icon="fas fa-music" color="decorative-icon-blue" />
        <IconButton icon="fas fa-play" color="decorative-icon-pink" />
        <IconButton icon="fas fa-video" color="decorative-icon-blue" />
      </div>

      <h2 class="text-2xl font-bold mt-8">Create Sync Room</h2>
      <div class="flex items-center justify-center space-x-4 mt-4">
        <button class="bg-blue-500 text-white px-4 py-2 rounded-full">MUSIC ROOM</button>
        <button class="bg-pink-500 text-white px-4 py-2 rounded-full">MOVIE ROOM</button>
      </div>
    </MainContainer>
  </div>
</template>

<script>
import MainContainer from "./home_component/MainContainer.vue";
import RoomCard from "./home_component/RoomCard.vue";
import IconButton from "./home_component/IconButton.vue";
import DecorativeIcons from "./home_component/DecorativeIcons.vue";
import logoMusic from "../assets/image/logo_music.webp";
import logoMovie from "../assets/image/logo_movie.webp";

export default {
  data() {
    return {
      logoMusic,
      logoMovie,
    };
  },
  components: {
    MainContainer,
    RoomCard,
    IconButton,
    DecorativeIcons,
  },
};
</script>

<style>
body {
  font-family: 'Arial', sans-serif;
  background-color: #f5d0d0;
}
</style>
