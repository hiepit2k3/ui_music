<template>
  <div class="min-h-screen bg-pink-light flex flex-col items-center p-6">
    <HeaderComponent />
    <div class="mt-8 flex space-x-4">
      <LoginRegisterForm />
      <AvatarComponent />
    </div>
    <div class="mt-8 flex space-x-4">
      <RoomCodeComponent />
      <ProfileComponent />
    </div>
  </div>
</template>

<script>
import HeaderComponent from "./components/HeaderComponent.vue";
import LoginRegisterForm from "./components/LoginRegisterForm.vue";
import AvatarComponent from "./components/AvatarComponent.vue";
import RoomCodeComponent from "./components/RoomCodeComponent.vue";
import ProfileComponent from "./components/ProfileComponent.vue";

export default {
  components: {
    HeaderComponent,
    LoginRegisterForm,
    AvatarComponent,
    RoomCodeComponent,
    ProfileComponent,
  },
};
</script>
