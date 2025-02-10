<template>
    <div class="main-container flex flex-col items-center justify-center space-y-4 md:space-y-0 md:space-x-8 p-8 relative">
      <slot name="decorative-icons"></slot>
      <slot></slot>
    </div>
  </template>
  
  <script>
  export default {};
  </script>
  
  <style>
  .main-container {
    background: linear-gradient(145deg, #e6e6e6, #ffffff);
    box-shadow: 20px 20px 60px #d9d9d9, -20px -20px 60px #ffffff;
    border-radius: 30px;
    padding: 20px;
    position: relative;
  }
  </style>
  