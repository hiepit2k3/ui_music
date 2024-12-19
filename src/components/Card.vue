<template>
  <div class="flex flex-col gap-5 group mx-2 cursor-pointer">
    <div :class="['w-44 sm:w-52 aspect-square items-center justify-center flex shadow-lg', classFather]">
      <img :src="image"
        :class="['group-hover:ease-in-out transition duration-700 rounded-full group-hover:duration-1000 cursor-pointer object-center object-cover group-hover:scale-110 sm:group-hover:scale-150 w-16 sm:w-28 aspect-square rotate-0 group-hover:-rotate-[350deg] group-hover:stroke-lime-600 fill-lime-600 group-hover:-translate-y-12 group-hover:-skew-y-12 group-hover:skew-x-12', classchild]" />
    </div>

    <div class="flex flex-row items-center justify-center">
      <div class="flex flex-row items-center justify-center flex-col cursor-pointer">
        <router-link :to="to" >
          <svg clip-rule="evenodd"  fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            class="text-gray-600 font-semibold group flex items-center justify-center from-gray-800 text-white font-semibold hover:rounded-[50%] transition-all duration-500 hover:from-[#331029] hover:to-[#310413] text-lg sm:text-xl transition-all duration-300 group-hover:transition-all group-hover:duration-300 group-hover:text-gray-200 fill-pink-600 group-hover:bg-pink-600 group-hover:fill-white group-hover:rotate-45 p-px rounded-full w-10 group-hover:rounded-full group-hover:animate-pulse">
            <path
              d="m12.012 1.995c-5.518 0-9.998 4.48-9.998 9.998s4.48 9.998 9.998 9.998 9.997-4.48 9.997-9.998-4.479-9.998-9.997-9.998zm0 1.5c4.69 0 8.497 3.808 8.497 8.498s-3.807 8.498-8.497 8.498-8.498-3.808-8.498-8.498 3.808-8.498 8.498-8.498zm1.528 4.715s1.502 1.505 3.255 3.259c.146.147.219.339.219.531s-.073.383-.219.53c-1.753 1.754-3.254 3.258-3.254 3.258-.145.145-.336.217-.527.217-.191-.001-.383-.074-.53-.221-.293-.293-.295-.766-.004-1.057l1.978-1.977h-6.694c-.414 0-.75-.336-.75-.75s.336-.75.75-.75h6.694l-1.979-1.979c-.289-.289-.286-.762.006-1.054.147-.147.339-.221.531-.222.19 0 .38.071.524.215z"
              fill-rule="nonzero"></path>
          </svg>
          <span
            class="opacity-0 text-white font-semibold group-hover:opacity-100 group-hover:text-gray-700 group-hover:text-sm group-hover:-translate-y-15 duration-700">
            {{ title }}
          </span>
        </router-link>
      </div>
    </div>
  </div>

</template>

<script setup>
defineProps({
  image: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  classFather: {
    type: String,
    required: false,
  },
  classchild: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: false, // Không bắt buộc
  },
});
</script>

<script>
export default {
  name: "Card",
};
</script>

<style scoped>
/* Thêm style nếu cần */
</style>