<script setup lang="ts">
import { ref, onBeforeMount, onMounted, onBeforeUnmount } from 'vue';
import { useI18n } from 'vue-i18n';
import { useUserStore } from 'src/stores/userStore';
import { useChatStore } from 'src/stores/chatStore';


interface CordovaNavigator extends Navigator {
    app: {
        exitApp: () => void;
    };
}


const onBackButton = (e: Event) => {
    e.preventDefault();
    (navigator as CordovaNavigator).app.exitApp();
}

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

onMounted(() => {
    document.addEventListener('backbutton', onBackButton, false);
});

onBeforeUnmount(() => {
    document.removeEventListener('backbutton', onBackButton, false);
});
</script>



<template>
    <router-view />
</template>
