<script setup lang="ts">
import LogIn from 'src/components/LogIn.vue';
</script>



<template>
    <LogIn @goToComplete="$router.push('/complete')" />
</template>
