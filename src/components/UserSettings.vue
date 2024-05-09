<script setup lang="ts">
import { ref, onBeforeMount } from 'vue';
import { useUserStore } from 'src/stores/userStore';
import { useI18n } from 'vue-i18n';


const { locale } = useI18n();

const userStore = useUserStore();

const emit = defineEmits(['goToPass']);

const isLoading = ref(false);

const isActive = ref(false);

const isLang = ref(false);

const toggleLang = () => {
    isLang.value = !isLang.value;
    if (isLang.value) {
        locale.value = 'pl'
    } else {
        locale.value = 'en';
    }
}

const toggleTheme = () => {
    isActive.value = !isActive.value;
    if (localStorage.getItem('darkMode') !== null) {
        localStorage.darkMode = `${isActive.value}`;
        if (localStorage.darkMode === 'true') {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
    } else {
        localStorage.setItem('darkMode', `${isActive.value}`);
        if (localStorage.darkMode === 'true') {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
    }
}

const changePass = async () => {
    isLoading.value = true;
    const userEmail = JSON.parse(sessionStorage.userData).email;
    const isSuccess = await userStore.resetPassword(userEmail);
    if (isSuccess) {
        isLoading.value = false;
        emit('goToPass');
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
    <div class="settings flex flex-col gap-[3vw]">
        <h1 class="lexend-bold leading-normal text-center capitalize">{{ $t('Settings') }}</h1>
        <div class="grow flex flex-col justify-center gap-[30px]">
            <div class="flex items-center gap-[10px] settings__item">
                <p class="settings__item-title">{{ $t('Lang') }}:</p>
                <div class="p-3 rounded-[10px] hover:cursor-pointer"
                    :class="{ 'gradient-primary border-transparent text-white': !isLang, 'item-shadow': isLang }"
                    @click="toggleLang">
                    En
                </div>
                <div class="p-3 rounded-[10px] hover:cursor-pointer"
                    :class="{ 'gradient-primary border-transparent text-white': isLang, 'item-shadow': !isLang }"
                    @click="toggleLang">
                    Pl
                </div>
            </div>
            <div class="flex items-center gap-[10px] settings__item">
                <p class="settings__item-title">{{ $t('Theme') }}:</p>
                <div class="p-3 rounded-[10px] hover:cursor-pointer"
                    :class="{ 'gradient-primary border-transparent text-white': !isActive, 'item-shadow': isActive }"
                    @click="toggleTheme">
                    {{ $t('Light') }}
                </div>
                <div class="p-3 rounded-[10px] hover:cursor-pointer"
                    :class="{ 'gradient-primary border-transparent text-white': isActive, 'item-shadow': !isActive }"
                    @click="toggleTheme">
                    {{ $t('Dark') }}
                </div>
            </div>
            <div class="flex items-center gap-[10px] settings__item">
                <p class="settings__item-title">{{ $t('Pass') }}:</p>
                <CustomBtn type="button" @click="changePass">{{ $t('Change') }}</CustomBtn>
                <FormLoader v-if="isLoading" />
            </div>
        </div>
    </div>
</template>
