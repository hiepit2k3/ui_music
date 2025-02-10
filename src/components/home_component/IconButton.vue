<template>
    <button class="icon-button p-4" :class="color">
      <i :class="icon + ' text-xl'"></i>
    </button>
  </template>
  
  <script>
  export default {
    props: ['icon', 'color'],
  };
  </script>
  
  <style>
  .icon-button {
    background: linear-gradient(145deg, #e6e6e6, #ffffff);
    box-shadow: 5px 5px 15px #d9d9d9, -5px -5px 15px #ffffff;
    border-radius: 50%;
  }
  </style>
  