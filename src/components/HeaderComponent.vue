<template>
    <div class="bg-purple-light flex justify-between items-center p-4 shadow-md max-w-screen-xl mx-auto">
      <!-- Logo -->
      <h1 class="text-xl font-bold text-purple-dark">Music App</h1>
  
      <!-- Menu Điều Hướng (ẩn trên màn hình nhỏ) -->
      <div class="hidden md:flex space-x-8">
        <button class="text-purple-dark hover:underline">Home</button>
        <button class="text-purple-dark hover:underline">Features</button>
        <button class="text-purple-dark hover:underline">Pricing</button>
      </div>
  
      <!-- Nút Đăng Nhập và Đăng Ký -->
      <div class="flex space-x-4">
        <button class="text-purple-dark hover:underline">Login</button>
        <button class="text-purple-dark hover:underline">Register</button>
      </div>
      
      <!-- Menu Burger (hiển thị trên màn hình nhỏ) -->
      <div class="md:hidden">
        <button class="text-purple-dark hover:underline">☰</button>
      </div>
    </div>
  </template>
  
  
  
  <script>
  export default {
    name: "HeaderComponent",
  };
  </script>
  