<script setup lang="ts">

</script>



<template>
    <q-layout class="grid p-[3vw] pt-6" :style="{ minHeight: '100vh' }">
        <q-page-container class="flex flex-col gap-y-3 overflow-hidden relative">
            <router-view />
        </q-page-container>
    </q-layout>
</template>
