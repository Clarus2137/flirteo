<script setup lang="ts">
import { ref, onBeforeMount, onMounted, onBeforeUnmount } from 'vue';
import { useI18n } from 'vue-i18n';
import { useUserStore } from 'src/stores/userStore';
import { useChatStore } from 'src/stores/chatStore';
import { useOrderStore } from './stores/orderStore';


interface CordovaNavigator extends Navigator {
    app: {
        exitApp: () => void;
    };
}

const onBackButton = (e: Event) => {
    e.preventDefault();
    e.stopPropagation();
    (navigator as CordovaNavigator).app.exitApp();
}

const appLoading = ref(true);

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
    const orderStore = useOrderStore();
    const { locale } = useI18n();
    userStore.lang = locale.value;
    chatStore.lang = locale.value;
    orderStore.lang = locale.value;
});

onMounted(() => {
    document.addEventListener('backbutton', onBackButton, false);
    appLoading.value = false;

    document.addEventListener('deviceready', function() {
    if (window.StatusBar) {
        // Настройка цвета статус-бара
        window.StatusBar.backgroundColorByHexString('#000000');
        
        // Вы можете также скрыть статус-бар, если это необходимо
        // StatusBar.hide();
    }
}, false);

});

onBeforeUnmount(() => {
    document.removeEventListener('backbutton', onBackButton, false);
});
</script>



<template>
    <router-view />
</template>