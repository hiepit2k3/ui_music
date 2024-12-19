<script setup>
import Card from "./Card.vue";
</script>
<template>
  <div class="mt-8 flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-8">
    <Card
      v-for="(card, index) in cards"
      :key="index"
      :title="card.title"
      :classFather="card.classFather"
      :image="card.image"
      :classchild="card.classchild"
      :to = "card.url"
    />
  </div>
</template>

<script>
export default {
  name: "ContentGrid",

  data() {
    return {
      cards: [
        {
          title:"Room music",
          classFather: "bg-white rounded-lg",
          image: 'src/assets/image/icon_music.jpg',
          classchild: 'rounded-full',
          url:'/roommusic'
        },
        {
          title: 'List music',
          classFather: "bg-white rounded-lg",
          image: 'src/assets/image/icon_list_music.jpg',
          classchild: 'rounded-lg',
          url: "/listmusic"
        },
        // Thêm nhiều đối tượng nữa nếu cần
      ],
    };
  },
};
</script>

<style scoped>
/* Thêm style nếu cần */
</style>