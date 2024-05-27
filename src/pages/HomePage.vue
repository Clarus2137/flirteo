<script setup lang="ts">
import UserView from 'src/components/UserView.vue';
</script>



<template>
    <UserView @goToComplete="$router.push('/complete')" />
</template>
