<script setup lang="ts">
import UserGender from 'src/components/UserGender.vue';
</script>



<template>
  <div class="profile">
    <UserGender @goToInterests="$router.push('interests')" />
  </div>
</template>
