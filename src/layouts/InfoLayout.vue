<script setup lang="ts">

</script>



<template>
    <q-layout class="flex flex-col justify-center items-center p-[3vw] pt-6" :style="{ minHeight: '100vh' }">
        <q-page-container class="grow flex flex-col gap-y-3 overflow-hidden relative max-w-[400px]">
            <router-view />
        </q-page-container>
    </q-layout>
</template>
