<script setup lang="ts">
import LogIn from 'src/components/LogIn.vue';
</script>



<template>
    <LogIn @goToHome="$router.push('/home')" @goToInterests="$router.push('/info/interests')" />
</template>