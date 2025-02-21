<template>
    <label for="username" class="block text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2">{{ labelname }}</label>
    <div class="relative">
        <input :type="showPassword ? 'text' : 'password'" id="password" :value="modelValue"
            @input="$emit('update:modelValue', $event.target.value)"
            class="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2 ring-gray-900 outline-0 pr-10" />
        <button type="button" class="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
            @click="togglePassword">
            <svg v-if="showPassword" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-5.5 0-10-6-10-6s1.125-1.425 3.375-3.375M9 9l-1.5 1.5M15 15l1.5-1.5m-.75 4.575A10.05 10.05 0 0012 19c5.5 0 10-6 10-6s-1.125-1.425-3.375-3.375" />
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M3 3l18 18M10.125 10.125C9.375 10.875 9 11.8125 9 12.75c0 1.875 1.5 3.375 3.375 3.375 1.875 0 3.375-1.5 3.375-3.375 0-1.875-1.5-3.375-3.375-3.375-0.938 0-1.875 0.375-2.625 1.125z" />
            </svg>
        </button>
    </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from "vue";

defineProps({
    modelValue: String,
    labelname: String,
});

defineEmits(["update:modelValue"]);

const showPassword = ref(false);

const togglePassword = () => {
    showPassword.value = !showPassword.value;
};
</script>