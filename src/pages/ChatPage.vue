<script setup lang="ts">
import { ref, onBeforeMount } from 'vue';
import { useChatStore } from 'src/stores/chatStore';
import ChatConfig from 'src/components/ChatConfig.vue';
import ChatBody from 'src/components/ChatBody.vue';


const chatStore = useChatStore();

const isVisible = ref(true);

onBeforeMount(() => {
    if (chatStore.session.id) {
        isVisible.value = !isVisible.value;
    }
});
</script>



<template>
    <ChatConfig @goToChat="isVisible = !isVisible" v-if="isVisible" />
    <ChatBody @goToHome="$router.push('/profile')" @goToChatConfig="isVisible = !isVisible" v-else />
</template>
