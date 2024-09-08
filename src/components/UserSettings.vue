<script setup lang="ts">
import { ref, onBeforeMount } from 'vue';
import { useUserStore } from 'src/stores/userStore';
import { useChatStore } from 'src/stores/chatStore';
import { useQuasar } from 'quasar';
import { useI18n } from 'vue-i18n';


const { locale } = useI18n();

const $q = useQuasar();


const userStore = useUserStore();
const chatStore = useChatStore();

const emit = defineEmits(['goToPass', 'goToAuthorization']);

const isLoading = ref(false);
const isLoadingLang = ref(false);

const isLang = ref(false);

const isRequested = ref(false);
const isRequestOk = ref(false);

const removeUser = ref(false);
const backdropFilter = ref('');

const toggleLang = async () => {
    isLoading.value = true;
    isLang.value = !isLang.value;
    if (isLang.value) {
        locale.value = 'pl'
    } else {
        locale.value = 'en';
    }
    userStore.lang = locale.value;
    chatStore.lang = locale.value;
    const isSuccess = await userStore.getUserData();
    isLoading.value = false;
    if (isSuccess === true) {
        if (localStorage.getItem('flirteoLang') !== null) {
            localStorage.flirteoLang = locale.value;
        } else {
            localStorage.setItem('flirteoLang', locale.value);
        }
    } else if (isSuccess === 401) {
        emit('goToAuthorization');
        sessionStorage.clear();
    }
}

// const toggleTheme = () => {
//     isDarkMode.value = !isDarkMode.value;
//     if (localStorage.getItem('darkMode') !== null) {
//         localStorage.darkMode = `${isDarkMode.value}`;
//         if (localStorage.darkMode === 'true') {
//             document.body.classList.add('dark-mode');
//         } else {
//             document.body.classList.remove('dark-mode');
//         }
//     } else {
//         localStorage.setItem('darkMode', `${isDarkMode.value}`);
//         if (localStorage.darkMode === 'true') {
//             document.body.classList.add('dark-mode');
//         } else {
//             document.body.classList.remove('dark-mode');
//         }
//     }
// }

const toggleTheme = () => {
    $q.dark.toggle();
    if (localStorage.getItem('darkMode') !== null) {
        localStorage.darkMode = `${$q.dark.isActive}`;
    } else {
        localStorage.setItem('darkMode', `${$q.dark.isActive}`);
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

const openDialogDelete = () => {
    removeUser.value = true;
    backdropFilter.value = 'blur(4px) saturate(150%)';
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

    // if (localStorage.getItem('darkMode') !== null) {
    //     if (localStorage.darkMode === 'true') {
    //         isDarkMode.value = true;
    //     }
    // }
});
</script>



<template>
    <BackBtn />
    <div class="settings grow flex flex-col gap-[3vw]">
        <h1 class="lexend-bold leading-normal text-center capitalize">{{ $t('Settings') }}</h1>
        <div class="grow flex flex-col justify-center gap-[30px]">
            <div class="flex items-center gap-[10px] settings__item">
                <p class="settings__item-title">{{ $t('Lang') }}:</p>
                <div class="w-[2.5rem] p-2 rounded-[10px] text-center hover:cursor-pointer"
                    :class="{ 'gradient-primary border-transparent text-white': !isLang, 'bg-white text-[#121212]': $q.dark.isActive && isLang, 'item-shadow': isLang && !$q.dark.isActive }"
                    @click="toggleLang">
                    En
                </div>
                <div class="w-[2.5rem] p-2 rounded-[10px] text-center hover:cursor-pointer"
                    :class="{ 'gradient-primary border-transparent text-white': isLang, 'bg-white text-[#121212]': $q.dark.isActive && !isLang, 'item-shadow': !isLang && !$q.dark.isActive }"
                    @click="toggleLang">
                    Pl
                </div>
                <FormLoader v-if="isLoadingLang" />
            </div>
            <div class="flex items-center gap-[10px] settings__item">
                <p class="settings__item-title">{{ $t('Theme') }}:</p>
                <div class="p-3 rounded-[10px] hover:cursor-pointer"
                    :class="{ 'gradient-primary border-transparent text-white': !$q.dark.isActive, 'bg-white text-[#121212]': $q.dark.isActive }"
                    @click="toggleTheme">
                    {{ $t('Light') }}
                </div>
                <div class="p-3 rounded-[10px] hover:cursor-pointer"
                    :class="{ 'gradient-primary border-transparent text-white': $q.dark.isActive, 'bg-white text-[#121212] item-shadow': !$q.dark.isActive }"
                    @click="toggleTheme">
                    {{ $t('Dark') }}
                </div>
            </div>
            <div class="flex items-center gap-[10px] settings__item">
                <!-- <p class="settings__item-title">{{ $t('Pass') }}:</p> -->
                <CustomBtn type="button" @click="changePass">{{ $t('Change_Pass') }}</CustomBtn>
                <CustomBtn @click="openDialogDelete">{{ $t('Delete_Acc') }}</CustomBtn>
                <FormLoader v-if="isLoading" />
                <p v-if="isRequested" class="text-center text-green">{{ $t('Request.success') }}</p>
                <p v-if="isRequestOk" class="text-center text-red">{{ $t('Request.failed') }}
                    <span class="text-gradient-primary lexend-bold">hello@flirteo.eu</span>
                </p>
            </div>
        </div>
    </div>

    <q-dialog v-model="removeUser" :backdrop-filter="backdropFilter" full-width>
        <q-card>
            <q-card-section class="row items-center justify-center q-pb-none text-h6">
                {{ $t('Request.confirm') }}
            </q-card-section>

            <q-card-actions class="flex justify-between">
                <q-btn flat :label="$t('Yes')" color="primary" v-close-popup @click="deleteAcc" />
                <q-btn flat :label="$t('No')" color="primary" v-close-popup />
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>
