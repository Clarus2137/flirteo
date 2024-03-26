<script setup lang="ts">
import ProfileView from 'src/components/ProfileView.vue';
</script>



<template>
   <div class="profile flex flex-col gap-y-10">
      <ProfileView @goToAuthorization="$router.push('/authorization')" />
   </div>
</template>