<script setup lang="ts">
import { ref } from 'vue';

const method = ref('gpay')
</script>



<template>
    <div class="payments lexend">
        <q-radio v-model="method" checked-icon="task_alt" unchecked-icon="panorama_fish_eye" val="gpay"
            label="Google Pay" />
    </div>
</template>
