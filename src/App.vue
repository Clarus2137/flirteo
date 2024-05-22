<script setup lang="ts">
import { ref, onBeforeMount, onMounted, onBeforeUnmount } from 'vue';
import { useI18n } from 'vue-i18n';
import { useUserStore } from 'src/stores/userStore';
import { useChatStore } from 'src/stores/chatStore';
// import SplashScreen from 'src/components/SplashScreen.vue';


interface CordovaNavigator extends Navigator {
    app: {
        exitApp: () => void;
    };
}


const appLoading = ref(true);

const onBackButton = (e: Event) => {
    e.preventDefault();
    (navigator as CordovaNavigator).app.exitApp();
}

const isDark = ref(false);

// const loadingScreen = ref<HTMLElement | null>(null);
// const appScreen = ref<HTMLElement | null>(null);

// const disappearSplash = () => {
//     if (loadingScreen.value) {
//         loadingScreen.value.animate([
//             { opacity: '1' },
//             { opacity: '0', offset: 1 }
//         ], {
//             duration: 1000, // Продолжительность одного цикла анимации в миллисекундах
//             iterations: 1, // Количество повторений анимации
//             easing: 'linear' // Тип сглаживания анимации
//         });
//     }
// }

// const appearApp = () => {
//     if (appScreen.value) {
//         appScreen.value.animate([
//             { opacity: '0' },
//             { opacity: '1', offset: 1 }
//         ], {
//             duration: 1000, // Продолжительность одного цикла анимации в миллисекундах
//             iterations: 1, // Количество повторений анимации
//             easing: 'linear' // Тип сглаживания анимации
//         });
//     }
// }

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
    setTimeout(() => {
        appLoading.value = false;
    }, 3000);

    // setTimeout(() => {
    //     disappearSplash();
    // }, 2000);

    // setTimeout(() => {
    //     appearApp();
    // }, 3000);
});

onBeforeUnmount(() => {
    document.removeEventListener('backbutton', onBackButton, false);
});
</script>



<template>
    <!-- <div ref="loadingScreen" v-if="appLoading">
        <SplashScreen class="loading-screen" />
    </div>
    <div ref="appScreen" v-else>
        <router-view class="app-screen" />
    </div> -->
    <router-view />
</template>


<style scoped lang="scss"></style>
