<script setup lang="ts">
import { ref } from 'vue';
import ChatConfig from 'src/components/ChatConfig.vue';
import ChatBody from 'src/components/ChatBody.vue';

const isVisible = ref(true);
</script>



<template>
    <ChatConfig @goToChat="isVisible = !isVisible" v-if="isVisible" />
    <ChatBody v-else />
</template>
