<template>
  <div class="bg-purple-light rounded-lg p-6 shadow-lg w-80">
    <h2 class="text-2xl font-bold text-purple-dark text-center mb-4">Login/Register</h2>
    <form class="space-y-4">
      <div>
        <input
          type="email"
          placeholder="Email"
          class="w-full px-4 py-2 rounded-lg border border-purple-dark focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
      </div>
      <div>
        <input
          type="password"
          placeholder="Password"
          class="w-full px-4 py-2 rounded-lg border border-purple-dark focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
      </div>
      <button
        class="w-full bg-pink font-semibold text-white py-2 rounded-lg hover:bg-pink-dark"
      >
        Register
      </button>
    </form>
  </div>
</template>

<script>
export default {
  name: "LoginRegisterForm",
};
</script>

<style scoped>
/* Tùy chỉnh thêm nếu cần */
</style>
