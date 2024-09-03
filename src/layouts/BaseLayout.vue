<script setup lang="ts">
import TabMenu from 'src/components/TabMenu.vue';


</script>



<template>
    <q-layout class="grid px-[3vw] pb-12 overflow-hidden" :style="{ minHeight: '100vh' }">
        <q-page-container class="grid justify-self-center max-w-[400px] w-full">
            <router-view />
        </q-page-container>
        <TabMenu />
    </q-layout>
</template>
