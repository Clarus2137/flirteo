<script setup lang="ts">
import { ref, onBeforeMount } from 'vue';
import { useUserStore } from 'src/stores/userStore';
import { useI18n } from 'vue-i18n';


const { locale } = useI18n();

const userStore = useUserStore();

const emit = defineEmits(['goToPass', 'goToAuthorization']);

const isLoading = ref(false);
const isLoadingLang = ref(false);

const isActive = ref(false);

const isLang = ref(false);

const isRequested = ref(false);
const isRequestOk = ref(false);

const toggleLang = () => {
    isLang.value = !isLang.value;
    if (isLang.value) {
        locale.value = 'pl'
    } else {
        locale.value = 'en';
    }
    userStore.lang = locale.value;
    userStore.getUserData();
    if (localStorage.getItem('flirteoLang') !== null) {
        localStorage.flirteoLang = locale.value;
    } else {
        localStorage.setItem('flirteoLang', locale.value);
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
    if (isRequested.value) { isRequested.value = false }
    if (isRequestOk.value) { isRequestOk.value = false }
    isLoading.value = true;
    const userEmail = JSON.parse(sessionStorage.userData).email;
    const isSuccess = await userStore.resetPassword(userEmail);
    isLoading.value = false;
    if (isSuccess) {
        isRequested.value = true;
    } else {
        isRequestOk.value = true;
    }
}

const deleteAcc = async () => {
    isLoading.value = true;
    const isSuccess = await userStore.removeUser();
    isLoading.value = false;
    if (isSuccess) {
        emit('goToAuthorization');
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
    <BackBtn />
    <div class="settings grow flex flex-col gap-[3vw]">
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
                <FormLoader v-if="isLoadingLang" />
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
                <!-- <p class="settings__item-title">{{ $t('Pass') }}:</p> -->
                <CustomBtn type="button" @click="changePass">{{ $t('Change_Pass') }}</CustomBtn>
                <CustomBtn @click="deleteAcc">{{ $t('Delete_Acc') }}</CustomBtn>
                <FormLoader v-if="isLoading" />
                <p v-if="isRequested" class="text-center text-green">Your request has been sent successfully. Please,
                    check
                    your E-mail.</p>
                <p v-if="isRequestOk" class="text-center text-red">Something goes wrong. Please, contact with us:
                    <span class="text-gradient-primary lexend-bold">support@flirteo.eu</span>
                </p>
            </div>
        </div>
    </div>
</template>
