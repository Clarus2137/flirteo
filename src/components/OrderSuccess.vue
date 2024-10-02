<script setup lang="ts">
import { onMounted } from 'vue';

const emit = defineEmits(['goToHome']);

onMounted(() => {
    // setTimeout(() => {
    //     emit('goToHome');
    // }, 1500);
});
</script>



<template>
    <div class="grow flex flex-col justify-center items-center gap-3">
        <p class="lexend-bold text-lg text-center">{{ $t('OrderSuccess') }}</p>
    </div>
</template>
