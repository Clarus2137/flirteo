<script setup lang="ts">
import ProfileGender from 'src/components/ProfileGender.vue';
</script>



<template>
   <div class="profile">
      <ProfileGender @goToInterests="$router.push('interests')" />
   </div>
</template>