<template>
    <div class="p-6">
        <div class="flex justify-between items-center mb-6">
            <div class="text-3xl font-bold text-gray-800">Search</div>
            <div class="flex items-center space-x-4">
                <div class="bg-red-500 text-white rounded-full px-4 py-2">{{ userPoints }}</div>
                <button class="bg-yellow-500 text-white rounded-full p-2" @click="play">
                    <i class="fas fa-play"></i>
                </button>
                <div class="bg-pink-500 text-white rounded-full px-4 py-2">
                    {{ progress }} / 10
                </div>
            </div>
        </div>

        <div class="flex justify-center mb-6">
            <input v-model="searchQuery" class="px-4 py-2 rounded-full border border-gray-300 focus:outline-none"
                placeholder="Search here" type="text" />
            <button class="bg-blue-500 text-white rounded-full px-4 py-2 ml-4" @click="search">
                Search
            </button>
        </div>

        <!-- Khu vực hiển thị kết quả -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 lg:w-full gap-6">
            <!-- Nếu có dữ liệu, hiển thị danh sách card -->
            <div v-if="items.length" v-for="(item, index) in items" :key="index"
                :class="item.bgColor + ' rounded-3xl p-4 text-white shadow-lg'">
                <div class="text-center mb-4"></div>
                <img :src="item.image" alt="Illustration" class="mx-auto mb-4" />
                <div class="text-center font-bold mb-2">{{ item.name }}</div>
                <div class="flex justify-center items-center space-x-2 mb-4">
                    <div class="flex items-center space-x-1">
                        <i class="fas fa-users"></i>
                        <span>{{ item.users }}</span>
                    </div>
                    <div class="flex items-center space-x-1">
                        <i class="fas fa-heart"></i>
                        <span>{{ item.likes }}</span>
                    </div>
                </div>
                <button class="bg-blue-500 text-white rounded-full px-4 py-2 w-full" @click="join(item.name)">
                    Join Now
                </button>
            </div>

            <!-- Nếu không có dữ liệu, hiển thị thông báo -->
            <div v-else class="col-span-full text-center text-gray-500">
                No results found. Try a different search!
            </div>
        </div>
    </div>
</template>


<script>
export default {
    name: 'FormSearch',
    data() {
        return {
            userPoints: 30,
            progress: 5,
            searchQuery: '',
            items: [
                {
                    title: 'Rearch roun, perguictafaters',
                    image: 'https://placehold.co/100x100',
                    name: 'Case Mame',
                    users: 2,
                    likes: 110,
                    bgColor: 'bg-red-400',
                },
                {
                    title: 'Rotea plaigod stecinpiripepies',
                    image: 'https://placehold.co/100x100',
                    name: 'Läzy Haim',
                    users: 2,
                    likes: 110,
                    bgColor: 'bg-pink-400',
                },
                {
                    title: 'Join Now',
                    image: 'https://placehold.co/100x100',
                    name: 'Coan Maüsid',
                    users: 2,
                    likes: 110,
                    bgColor: 'bg-indigo-600',
                },
                {
                    title: 'Curentnt peripitapent',
                    image: 'https://placehold.co/100x100',
                    name: 'Cheerpeflaftio',
                    users: 5,
                    likes: 10,
                    bgColor: 'bg-blue-500',
                },
            ],
        };
    },
    methods: {
        play() {
            alert('Play button clicked!');
        },
        search() {
            alert(`Search for: ${this.searchQuery}`);
        },
        join(itemName) {
            alert(`Joining: ${itemName}`);
        },
    },
};
</script>