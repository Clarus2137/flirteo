<script setup lang="ts">
import { ref, onBeforeMount } from 'vue';
import { useI18n } from 'vue-i18n';
import { useUserStore } from 'src/stores/userStore';
import { useChatStore } from 'src/stores/chatStore';


const isDark = ref(false);

onBeforeMount(() => {
    if (localStorage.getItem('darkMode') !== null) {
        if (localStorage.darkMode === 'true') {
            document.body.classList.add('dark-mode');
        } else {
            isDark.value = false;
        }
    }
    const userStore = useUserStore();
    const chatStore = useChatStore();
    const { locale } = useI18n();
    userStore.lang = locale.value;
    chatStore.lang = locale.value;
});

</script>



<template>
    <router-view />
</template>
