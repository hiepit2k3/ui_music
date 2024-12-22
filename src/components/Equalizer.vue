<script setup>
import CardNumberRoom from './CardNumberRoom.vue';

</script>
<template>
    <div class="mt-6 bg-pink-200 p-6 rounded-lg shadow-md">
        <h2 class="text-lg font-semibold text-gray-700 mb-4">Equalizer</h2>
        <div class="flex justify-around flex-wrap gap-4">
            <!-- Card Number Room -->
            <div class="flex-grow flex-shrink-0 basis-56 md:basis-64">
                <CardNumberRoom />
            </div>
            <div class="flex-grow flex-shrink-0 basis-56 md:basis-64">
                <CardNumberRoom />
            </div>
        </div>
    </div>
</template>
<script>
export default {
  components: {
    CardNumberRoom,
  },
};
</script>