<template>
<div id="default-carousel" class="relative w-full" data-carousel="slide">
    <!-- Carousel wrapper -->
    <div class="relative h-56 overflow-hidden rounded-lg md:h-96">
         <!-- Item 1 -->
        <div class="hidden duration-700 ease-in-out" data-carousel-item>
            <img src="../assets/image/slide.jpg" class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="...">
        </div>
        <!-- Item 2 -->
        <div class="hidden duration-700 ease-in-out" data-carousel-item>
            <img src="../assets/image/slide.jpg" class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="...">
        </div>
        <!-- Item 3 -->
        <div class="hidden duration-700 ease-in-out" data-carousel-item>
            <img src="../assets/image/slide.jpg" class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="...">
        </div>
        <!-- Item 4 -->
        <div class="hidden duration-700 ease-in-out" data-carousel-item>
            <img src="../assets/image/slide.jpg" class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="...">
        </div>
        <!-- Item 5 -->
        <div class="hidden duration-700 ease-in-out" data-carousel-item>
            <img src="../assets/image/slide.jpg" class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="...">
        </div>
    </div>
    <!-- Slider indicators -->
    <div class="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
        <button type="button" class="w-3 h-3 rounded-full" aria-current="true" aria-label="Slide 1" data-carousel-slide-to="0"></button>
        <button type="button" class="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 2" data-carousel-slide-to="1"></button>
        <button type="button" class="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 3" data-carousel-slide-to="2"></button>
        <button type="button" class="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 4" data-carousel-slide-to="3"></button>
        <button type="button" class="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 5" data-carousel-slide-to="4"></button>
    </div>
</div>

  </template>
  
  <script>
  export default {
    data() {
      return {
        currentIndex: 0,
        slides: [
          { image: '/src/assets/image/slide.jpg', title: 'Slide 1 - Mô tả ngắn' },
          { image: '/src/assets/image/slide.jpg', title: 'Slide 2 - Mô tả ngắn' },
          { image: '/src/assets/image/slide.jpg', title: 'Slide 3 - Mô tả ngắn' },
        ],
      };
    },
    methods: {
      nextSlide() {
        if (this.currentIndex < this.slides.length - 1) {
          this.currentIndex++;
        } else {
          this.currentIndex = 0; // Loop back to the first slide
        }
      },
      prevSlide() {
        if (this.currentIndex > 0) {
          this.currentIndex--;
        } else {
          this.currentIndex = this.slides.length - 1; // Loop back to the last slide
        }
      },
    },
  };
  </script>
  
  <style scoped>
  button {
    font-size: 24px;
    background-color: rgba(255, 255, 255, 0.7);
    border: none;
    cursor: pointer;
  }
  
  button:hover {
    background-color: rgba(255, 255, 255, 0.9);
  }
  </style>
  