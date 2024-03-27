<script setup lang="ts">
import LogIn from 'src/components/LogIn.vue';
</script>



<template>
  <LogIn @goToAdd="$router.push('/add/common')" />
</template>
