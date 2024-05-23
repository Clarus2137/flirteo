<script setup lang="ts">
import { author, productName, version } from 'app/package.json';
</script>



<template>
    <BackBtn />
    <div class="about">
        <h1 class="text-center">{{ $t('About') }}</h1>
        <p>{{ $t('Name') }}: <span class="lexend-bold text-gradient-primary">{{ productName }}</span></p>
        <p>{{ $t('Version') }}: <span class="lexend-bold text-gradient-primary">{{ version }}</span></p>
        <p>{{ $t('Web_Site') }}: <a href="https://www.flirteo.eu"
                class="lexend-bold text-gradient-primary">www.flirteo.eu</a></p>
        <p>{{ $t('Email') }}: <span class="lexend-bold text-gradient-primary">hello@flirteo.eu</span></p>
        <p>{{ $t('Created') }}: <a class="text-gradient-primary lexend-bold" href="https://web-systems.pl">{{ author
                }}</a></p>
    </div>
</template>

<style scoped lang="scss">
h1 {
    font-size: clamp(1.5rem, 6.25vw, 1.875rem);
}
</style>
