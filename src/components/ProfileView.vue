<script setup lang="ts">
import { onMounted } from 'vue';
import { useUserStore } from 'src/stores/userStore';


const emit = defineEmits(['goToAuthorization']);

const userStore = useUserStore();

const logOut = () => {
    localStorage.removeItem('userToken');
    sessionStorage.clear();
    emit('goToAuthorization');
}

const loadUserData = () => {
    const strUserData = sessionStorage.getItem('userData');
    if (strUserData === null) {
        // throw new Error('User\'s data doesn\'t exist');
        userStore.getUserData();
    } else {
        userStore.user = JSON.parse(strUserData);
    }
}

onMounted(() => {
    loadUserData();
});
</script>



<template>
    <h1 class="lexend-bold leading-normal text-center capitalize">{{ $t('Profile') }}</h1>
    <div class="profile__user user text-center">
        <div class="user__photo photo">
            <div class="photo__img inline-block p-1 mx-auto rounded-[50%] w-[100px] h-[100px]">
                <img src="./../assets/user-male.png" class="max-h-full mx-auto" alt="User Male"
                    v-if="userStore.user.gender === 'male'">
                <img src="./../assets/user-female.png" class="max-h-full mx-auto" alt="User Female"
                    v-else-if="userStore.user.gender === 'female'">
                <img src="./../assets/user-neutral.png" class="max-h-full mx-auto" alt="User Neutral" v-else>
            </div>
        </div>
        <div class="user__name lexend-bold text-lg">
            <p><span class="user__firstname">{{ userStore.user.firstName }}</span> <span class="user__lastname">{{
                userStore.user.lastName }}</span>
            </p>
        </div>
        <div class="user__email lexend-light text-secondary text-sm">
            <p>{{ userStore.user.email }}</p>
        </div>
    </div>
    <q-list class="profile__items grid justify-self-center content-between max-w-[320px] w-full">
        <q-item class="min-h-min p-1" clickable v-ripple exact to="/profile/edit">
            <q-item-section avatar>
                <q-icon>
                    <DetailsIcon />
                </q-icon>
            </q-item-section>
            <q-item-section>{{ $t('Profile_Details') }}</q-item-section>
            <q-item-section avatar>
                <q-icon class="q-icon-arrow">
                    <ArrowTriangle />
                </q-icon>
            </q-item-section>
        </q-item>
        <q-item class="min-h-min p-1" clickable v-ripple exact to="/settings">
            <q-item-section avatar>
                <q-icon>
                    <SettingsIcon />
                </q-icon>
            </q-item-section>
            <q-item-section>{{ $t('Settings') }}</q-item-section>
            <q-item-section avatar>
                <q-icon class="q-icon-arrow">
                    <ArrowTriangle />
                </q-icon>
            </q-item-section>
        </q-item>
        <q-item class="min-h-min p-1" clickable v-ripple exact to="/terms">
            <q-item-section avatar>
                <q-icon>
                    <TermsIcon />
                </q-icon>
            </q-item-section>
            <q-item-section>{{ $t('Terms_and_Privacy.Terms') }}</q-item-section>
            <q-item-section avatar>
                <q-icon class="q-icon-arrow">
                    <ArrowTriangle />
                </q-icon>
            </q-item-section>
        </q-item>
        <q-item class="min-h-min p-1" clickable v-ripple exact to="/privacy">
            <q-item-section avatar>
                <q-icon>
                    <PrivacyIcon />
                </q-icon>
            </q-item-section>
            <q-item-section>{{ $t('Terms_and_Privacy.Privacy') }}</q-item-section>
            <q-item-section avatar>
                <q-icon class="q-icon-arrow">
                    <ArrowTriangle />
                </q-icon>
            </q-item-section>
        </q-item>
        <q-item class="min-h-min p-1" clickable v-ripple exact to="/about">
            <q-item-section avatar>
                <q-icon>
                    <AboutIcon />
                </q-icon>
            </q-item-section>
            <q-item-section>{{ $t('About') }}</q-item-section>
            <q-item-section avatar>
                <q-icon class="q-icon-arrow">
                    <ArrowTriangle />
                </q-icon>
            </q-item-section>
        </q-item>
    </q-list>
    <div class="self-end">
        <CustomBtn class="flex justify-center items-center gap-x-2 mb-3" @click="logOut">
            <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <SvgGradient />
                <path
                    d="M7.87828 12.07C7.87828 11.66 8.21828 11.32 8.62828 11.32H14.1083V2.86C14.0983 2.38 13.7183 2 13.2383 2C7.34828 2 3.23828 6.11 3.23828 12C3.23828 17.89 7.34828 22 13.2383 22C13.7083 22 14.0983 21.62 14.0983 21.14V12.81H8.62828C8.20828 12.82 7.87828 12.48 7.87828 12.07Z"
                    fill="#fff" />
                <path
                    d="M20.5416 11.5402L17.7016 8.69016C17.4116 8.40016 16.9316 8.40016 16.6416 8.69016C16.3516 8.98016 16.3516 9.46016 16.6416 9.75016L18.2016 11.3102H14.1016V12.8102H18.1916L16.6316 14.3702C16.3416 14.6602 16.3416 15.1402 16.6316 15.4302C16.7816 15.5802 16.9716 15.6502 17.1616 15.6502C17.3516 15.6502 17.5416 15.5802 17.6916 15.4302L20.5316 12.5802C20.8316 12.3002 20.8316 11.8302 20.5416 11.5402Z"
                    fill="#fff" />
            </svg>
            {{ $t('LogOut') }}
        </CustomBtn>
    </div>
</template>



<style lang="scss">
.q-item--dark {
    svg {
        path {
            fill: #fff;
        }
    }
}
</style>
