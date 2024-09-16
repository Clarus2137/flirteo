<script setup lang="ts">
import { ref, onBeforeMount, onMounted, onBeforeUnmount } from 'vue';
import { useQuasar } from 'quasar'
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

const $q = useQuasar();

onBeforeMount(() => {
    if (localStorage.getItem('darkMode') !== null) {
        if (localStorage.darkMode === 'true') {
            $q.dark.set(true);
        } else {
            $q.dark.set(false);
        }
        // console.log('Dark mode is: ', $q.dark.isActive);
    } else {
        // console.log('Dark mode before setting is active: ', $q.dark.isActive);
        $q.dark.set('auto');
        // console.log('Dark mode after setting is active: ', $q.dark.isActive);
    }
    const userStore = useUserStore();
    const chatStore = useChatStore();
    const orderStore = useOrderStore();
    const { locale } = useI18n();
    userStore.lang = locale.value;
    chatStore.lang = locale.value;
    orderStore.lang = locale.value;

    document.removeEventListener('backbutton', onBackButton, false);
});

onMounted(() => {
    document.addEventListener('backbutton', onBackButton, false);
    appLoading.value = false;

    document.addEventListener('deviceready', function () {
        if (window.StatusBar) {
            window.StatusBar.hide();
        }

        // Включение полноэкранного режима с помощью плагина
        if (window.AndroidFullScreen) {
            window.AndroidFullScreen.immersiveMode(
                () => console.log('Immersive mode success'),
                (error: any) => console.error('Immersive mode error', error)
            );
        }
    }, false);
});
</script>

<template>
    <router-view />
</template>
