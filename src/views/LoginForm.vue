<template>
  <div class="max-w-md relative flex flex-col mt-8 p-4 rounded-md text-black bg-white">
    <div class="text-2xl font-bold mb-2 text-[#1e0e4b] text-center">Welcome back to <span
        class="text-[#7747ff]">App</span></div>
    <div class="text-sm font-normal mb-4 text-center text-[#1e0e4b]">Log in to your account</div>
    <form @submit.prevent="handleLogin" class="flex flex-col gap-3">
      <div class="block relative">
        <label for="email" class="block text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2">Email</label>
        <input type="text" id="email" name="email" v-model="email"
          class="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2  ring-gray-900 outline-0">

      </div>
      <div class="block relative">
        <label for="password"
          class="block text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2">Password</label>
        <input type="password" id="password" v-model="password"
          class="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2 ring-gray-900 outline-0">
      </div>
      <div>
        <a class="text-sm text-[#7747ff]" href="#">Forgot your password?
        </a>
      </div>
      <button type="submit"
        class="bg-pink-600 font-medium w-max m-auto px-6 py-2 rounded text-white text-sm font-normal">Submit</button>

    </form>
    <div class="text-sm text-center mt-[1.6rem]">Don’t have an account yet? <a class="text-sm text-[#7747ff]"
        href="#">Sign up for free!</a></div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { useToast } from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';

const toast = useToast();

export default {
  name: "LoginForm",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    async handleLogin() {
      try {
        const respone = await this.$store.dispatch('login', { email: this.email, password: this.password });
        console.log(respone.status);
        if (respone.status === 200) {
          toast.open({
            message: 'Login successfully!',
            type: 'success',
            position:"top-right"
          });
        }else if(respone.status === 401 || respone.status === 404){
          toast.open({
            message: 'Email or password is incorrect!',
            type: 'warning',
            position:"top-right"
          });
        }
      } catch (error) {
        toast.open({
          message: 'Email or password is incorrect!',
          type: 'warning',
          position:"top-right"
        });
      }
    },
  },
  computed: {
    ...mapActions(['login']),
  },
};
</script>