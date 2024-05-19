<script setup lang="ts">
import { author, productName, version } from 'app/package.json';
</script>



<template>
    <BackBtn />
    <div class="aboutr">
        <h1 class="text-center">About us</h1>
        <p>Name: {{ productName }}</p>
        <p>Version: {{ version }}</p>
        <p>Web Site: <a href="https://flirteo.eu" class="lexend-bold text-gradient-primary">flirteo.eu</a></p>
        <p>Created by: <a class="text-gradient-primary lexend-bold" href="https://web-systems.pl">{{ author }}</a></p>
    </div>
</template>

<style scoped lang="scss">
h1 {
    font-size: clamp(1.5rem, 6.25vw, 1.875rem);
}
</style>
