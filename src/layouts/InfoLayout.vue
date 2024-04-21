<script setup lang="ts">

</script>



<template>
    <q-layout class="grid p-[3vw]">
        <q-page-container class="flex flex-col gap-y-3 overflow-hidden relative">
            <BackBtn class="self-start" />
            <router-view />
        </q-page-container>
    </q-layout>
</template>
