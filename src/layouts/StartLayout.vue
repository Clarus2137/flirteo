<script setup lang="ts">

</script>



<template>
    <q-layout class="grid p-[3vw] pt-6 step-slider" :style="{ minHeight: '100vh' }">
        <q-page-container class="grid">
            <router-view></router-view>
        </q-page-container>
    </q-layout>
</template>


<style lang="scss">
.body--dark {
    .step-slider {
        background: $dark;
    }
}
</style>
