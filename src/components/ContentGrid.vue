<script setup>
import { onMounted } from "vue";
import { handler } from "flowbite/plugin";
import Card from "./Card.vue";
import { axiosPrivateInstance, axiosInstance } from "@/services/authAxios";

const handlerData = async () => {
  const response = await axiosPrivateInstance.get("/protected");
  if (response.status === 200) {
    console.log(response.data);
  }

};

onMounted(handlerData);
</script>
<template>
  <div class="mt-8 flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-8">
    <Card v-for="(card, index) in cards" :key="index" :title="card.title" :icon="card.icon" :roomType="card.roomType" />
  </div>
</template>

<script>
export default {
  name: "ContentGrid",
  data() {
    return {
      cards: [
        {
          title: 'Music room',
          icon: 'music',
          roomType: 'music',
        },
        {
          title: 'Movie room',
          icon: 'movie',
          roomType: 'movie',
        },
      ],
    };
  }
};

</script>

<style scoped>
/* Thêm style nếu cần */
</style>