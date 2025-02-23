<template>
    <div
        class="text-neutral-800 py-6 relative overflow-hidden flex flex-col justify-around w-96 h-44 border border-neutral-500 rounded-lg bg-neutral-50 p-3 px-6">
        <div
            class="before:absolute before:w-32 before:h-20 before:right-2 before:bg-rose-300 before:-z-10 before:rounded-full before:blur-xl before:-top-12 z-10 after:absolute after:w-24 after:h-24 after:bg-purple-300 after:-z-10 after:rounded-full after:blur after:-top-12 after:-right-6">
            <span class="font-extrabold text-2xl text-violet-600">Room {{ name_room }}</span>
        </div>
        <div class="flex gap-1">
            <div
                class="relative rounded-lg w-full overflow-hidden before:absolute before:w-12 before:h-12 before:content[''] before:right-0 before:bg-violet-500 before:rounded-full before:blur-lg after:absolute after:z-10 after:w-20 after:h-20 after:content[''] after:bg-rose-300 after:right-12 after:top-3 after:rounded-full after:blur-lg">
                <input type="text" v-model="room_password"
                    class="relative bg-transparent ring-0 outline-none border border-neutral-500 text-neutral-900 placeholder-violet-700 text-sm rounded-lg focus:ring-violet-500 placeholder-opacity-60 focus:border-violet-500 block w-full p-2.5 checked:bg-emerald-500"
                    placeholder="Input password..." />
            </div>
        </div>
        <div class="flex justify-center mt-4">
            <button @click="closeModal" class="bg-gray-500 text-white px-4 py-2 rounded mr-2">Cannel</button>
            <button @click="submitPassword()" class="bg-violet-500 text-white px-4 py-2 rounded">Join</button>
        </div>
    </div>
</template>
<script>
import { axiosPrivateInstance } from '@/services/authAxios';
import { useToast } from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';

const toast = useToast();

export default {
    data() {
        return {
            room_password: null
        }
    },
    props: {
        room_id: {
            type: String,
            required: true,
        },
        name_room: {
            type: String,
            required: true
        }
    },
    methods: {
        closeModal() {
            this.$emit("close");
        },
        async submitPassword() {
            try {
                const data = {
                    roomId: this.room_id,
                    password: this.room_password
                }
                const response = await axiosPrivateInstance.post('/room/ischeckpass', data)
                console.log(response);
                if (response.data.data.isCheck == true) {
                    this.$router.push(`/roommusic/${this.room_id}`);
                }
                else {
                    toast.open({
                        message: 'Password is incorrect!',
                        type: 'error',
                        position: "top-right"
                    });
                }
            } catch (error) {

            }
        }
    }
};
</script>
