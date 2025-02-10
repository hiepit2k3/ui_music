<template>
    <div class="hero-section p-8 flex flex-col md:flex-row items-center justify-between">
      <!-- Nội dung chính -->
      <div class="hero-content text-center md:text-left max-w-md">
        <h1 class="text-4xl font-bold text-pink-600 mb-4">Feel the Love in Every Beat</h1>
        <p class="text-gray-700 mb-6">
          Discover the music that speaks to your soul and brings every moment to life.
        </p>
        <div class="flex flex-col md:flex-row gap-4">
          <button
            class="bg-pink-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-pink-500 transition"
            @click="createAccount"
          >
            Create an Account
          </button>
          <button
            class="border-2 border-pink-600 text-pink-600 px-6 py-3 rounded-lg font-medium hover:bg-pink-50 transition"
            @click="signStarted"
          >
            Sign Started
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "HeroSection",
    methods: {
      createAccount() {
        alert("Redirecting to Create Account page...");
      },
      signStarted() {
        alert("Redirecting to Sign In page...");
      },
    },
  };
  </script>
  