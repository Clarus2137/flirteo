<script setup lang="ts">
import { ref, onMounted } from 'vue';

const isIOS = ref(false);


onMounted(() => {
    document.addEventListener('deviceready', function () {
        // Проверка на платформу iOS
        if (window.device && window.device.platform === 'iOS') {
            isIOS.value = true;
        }
    }, false);
});
</script>



<template>
    <q-layout class="grid p-[3vw] pt-6" :style="{ minHeight: '100vh' }" :class="{ 'safe-area-padding': isIOS }">
        <q-page-container class="grid reg-wrapper">
            <router-view></router-view>
        </q-page-container>
    </q-layout>
</template>
