<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';

const handleBackButton = () => {
    navigator.app.exitApp();
};

onMounted(() => {
    document.addEventListener('backbutton', handleBackButton, false);
});

onUnmounted(() => {
    document.removeEventListener('backbutton', handleBackButton);
});
</script>



<template>
    <router-view />
</template>
