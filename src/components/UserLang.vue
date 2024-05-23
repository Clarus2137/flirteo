<script setup lang="ts">
import { ref, onBeforeMount } from 'vue';
import { useI18n } from 'vue-i18n';
import { useUserStore } from 'src/stores/userStore';
import { useChatStore } from 'src/stores/chatStore';


const userStore = useUserStore();
const chatStore = useChatStore();

const { locale } = useI18n();

const isLang = ref<boolean | null>(null);
const isActive = ref(false);

const toggleLang = () => {
    isLang.value = !isLang.value;
    if (isLang.value) {
        locale.value = 'pl';
    } else {
        locale.value = 'en';
    }
    userStore.lang = locale.value;
    chatStore.lang = locale.value;

    if (localStorage.getItem('flirteoLang') !== null) {
        localStorage.flirteoLang = locale.value;
    } else {
        localStorage.setItem('flirteoLang', locale.value);
    }
}

onBeforeMount(() => {
    if (locale.value === 'pl') {
        isLang.value = true;
    } else {
        isLang.value = false;
    }

    if (localStorage.getItem('darkMode') !== null) {
        if (localStorage.darkMode === 'true') {
            isActive.value = true;
        }
    }
});
</script>



<template>
    <div class="flex flex-col justify-center items-center gap-[10vw]">
        <p class="text-h5 text-center">{{ $t('ChooseLang') }}</p>

        <div class="lang-switcher flex justify-center items-start gap-[5vw]">
            <div class="w-[2.5rem] p-2 rounded-[10px] text-center hover:cursor-pointer"
                :class="{ 'gradient-primary border-transparent text-white': !isLang, 'item-shadow': isLang }"
                @click="toggleLang">
                En
            </div>
            <div class="w-[2.5rem] p-2 rounded-[10px] text-center hover:cursor-pointer"
                :class="{ 'gradient-primary border-transparent text-white': isLang, 'item-shadow': !isLang }"
                @click="toggleLang">
                Pl
            </div>
        </div>

        <CustomBtn type="button" @click="$router.push('/introducing')">{{ $t('Continue') }}</CustomBtn>
    </div>
</template>
