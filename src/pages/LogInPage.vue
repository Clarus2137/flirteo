<script setup lang="ts">
import LogIn from 'src/components/LogIn.vue';
</script>



<template>
    <LogIn @goToComplete="$router.push('/complete')" @goToHome="$router.push('/home')"
        @goToPass="$router.push('/edit-password')" />
</template>
