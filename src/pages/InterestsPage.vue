<script setup lang="ts">
import ProfileInterests from 'src/components/ProfileInterests.vue';
</script>



<template>
   <div class="profile">
      <ProfileInterests @goToHome="$router.push('/home')" />
   </div>
</template>