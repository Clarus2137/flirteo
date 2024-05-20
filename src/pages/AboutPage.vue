<script setup lang="ts">
import { author, productName, version } from 'app/package.json';
</script>



<template>
    <BackBtn />
    <div class="about">
        <h1 class="text-center">{{ $t('About') }}</h1>
        <p>{{ $t('Name') }}: {{ productName }}</p>
        <p>{{ $t('Version') }}: {{ version }}</p>
        <p>{{ $t('Web_Site') }}: <a href="https://flirteo.eu" class="lexend-bold text-gradient-primary">flirteo.eu</a></p>
        <p>{{ $t('Created') }}: <a class="text-gradient-primary lexend-bold" href="https://web-systems.pl">{{ author
                }}</a></p>
    </div>
</template>

<style scoped lang="scss">
h1 {
    font-size: clamp(1.5rem, 6.25vw, 1.875rem);
}
</style>
