<script setup lang="ts">
import { useQuasar } from 'quasar';

const $q = useQuasar();
</script>



<template>
    <button type="button" @click="$router.back()" class="back-btn" :class="{ 'bg-white': $q.dark.isActive }">
        <svg viewBox="0 0 9 18" fill="none" xmlns="http://www.w3.org/2000/svg" class="h-full">
            <path fill-rule="evenodd" clip-rule="evenodd"
                d="M8.53042 0.549687C8.82331 0.84258 8.82331 1.31745 8.53042 1.61035L2.01042 8.13035C1.53331 8.60745 1.53331 9.39258 2.01042 9.86969L8.53042 16.3897C8.82331 16.6826 8.82331 17.1575 8.53042 17.4503C8.23752 17.7432 7.76265 17.7432 7.46976 17.4503L0.949758 10.9303C-0.113135 9.86745 -0.113135 8.13258 0.949758 7.06969L7.46976 0.549687C7.76265 0.256794 8.23752 0.256794 8.53042 0.549687Z"
                fill="#1F1216" />
        </svg>
    </button>
</template>



<style lang="scss" scoped>
.back-btn {
    width: 25px;
    height: 25px;
    padding: 5px;
    border-radius: 50%;

    >svg {
        margin: 0 auto;
    }
}
</style>
