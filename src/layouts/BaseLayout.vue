<script setup lang="ts">
import TabMenu from 'src/components/TabMenu.vue';


</script>



<template>
    <q-layout class="grid p-[3%] pb-12 overflow-hidden">
        <q-page-container class="grid">
            <router-view />
        </q-page-container>
        <TabMenu />
    </q-layout>
</template>
