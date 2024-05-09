<script setup lang="ts">
import UserSettings from 'src/components/UserSettings.vue';
</script>



<template>
    <UserSettings @goToPass="$router.push('edit-password')" />
</template>
