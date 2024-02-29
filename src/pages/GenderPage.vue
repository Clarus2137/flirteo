<script setup lang="ts">
import ProfileGender from 'src/components/ProfileGender.vue';
import { useUsersStore } from 'src/stores/users';

const usersStore = useUsersStore();

console.log(usersStore.users);
</script>



<template>
   <div class="profile">
      <ProfileGender />
   </div>
</template>