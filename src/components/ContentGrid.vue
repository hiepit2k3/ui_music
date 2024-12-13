<template>
    <div class="content-grid bg-white w-2/3 p-8 rounded-lg shadow-lgs">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- Card Items -->
        <Card
          v-for="(item, index) in playlists"
          :key="index"
          :title="item.title"
          :image="item.image"
        />
      </div>
    </div>
</template>
  
  <script>
  import Card from "./Card.vue"; // Import component Card (ở dưới)
  
  export default {
    name: "ContentGrid",
    components: {
      Card,
    },
    data() {
      return {
        playlists: [
          { title: "Chill Vibes", image: "playlist1.png" },
          { title: "Road Trip", image: "playlist2.png" },
          { title: "Relax & Unwind", image: "playlist3.png" },
          { title: "Party Hits", image: "playlist4.png" },
          { title: "Focus Mode", image: "playlist5.png" },
          { title: "Throwback", image: "playlist6.png" },
        ],
      };
    },
  };
  </script>
  
  <style scoped>
  /* Thêm style nếu cần */
  </style>
  