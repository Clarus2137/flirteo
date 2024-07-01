<script setup lang="ts">
import { ref, onBeforeMount, onMounted } from 'vue';
import { useUserStore } from 'src/stores/userStore';


const userStore = useUserStore();
const endings = ref(false);
const isDataLoading = ref(true);
const userAge = ref(0);
const isFullData = ref(true);

const setUserData = () => {
    const strUserData = sessionStorage.getItem('userData');
    if (strUserData !== null) {
        const userData: Partial<User> = JSON.parse(sessionStorage.userData);
        userStore.getStoreUserData(userData);
        userStore.userEducation = userStore.user.educationLevel;
    } else {
        throw new Error('Item \'userData\' doesn\'t exist in sessionStorage');
    }

    const calculateAge = (birthDateString: string): number => {
        // const convertedBirthDate = birthDateString.split(' ')[0];
        const today = new Date();
        const birthDate = new Date(birthDateString);
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();

        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }

        return age;
    }

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    userAge.value = calculateAge(userStore.user.dateOfBirth!);

    userStore.userEducation = userStore.user.educationLevel;
}

const defineEnding = () => {
    const lastChar = userAge.value.toString()[userAge.value.toString().length - 1];
    if (lastChar === '2' || lastChar === '3' || lastChar === '4') {
        endings.value = true;
    }
}

const animatedScreen = ref<HTMLElement | null>(null);
const animatedPage = ref<HTMLElement | null>(null);

const toggleScreen = () => {
    if (animatedScreen.value) {
        animatedScreen.value.animate([
            { opacity: '1' },
            { opacity: '0' }
        ], {
            duration: 400,
            easing: 'linear'
        }).onfinish = () => {
            isDataLoading.value = false; // Переключаем состояние загрузки
            if (animatedPage.value) {
                animatedPage.value.animate([
                    { opacity: '0' },
                    { opacity: '1' }
                ], {
                    duration: 400,
                    easing: 'linear'
                });
            }
        };
    }
}

const emit = defineEmits(['goToComplete']);

const loadUserData = async () => {
    const isCompleted = await userStore.getUserData();
    // console.log('Loaded user data from the server: ', userStore.user);
    if (isCompleted === true) {
        setUserData();
        toggleScreen();
    } else if (isCompleted === 'Not completed') {
        isFullData.value = false;
        toggleScreen();
    }
}

onBeforeMount(() => {
    if (sessionStorage.getItem('userData') !== null) {
        if (JSON.parse(sessionStorage.userData).firstName === null) {
            emit('goToComplete');
        } else {
            setUserData();
            if (localStorage.getItem('flirteoLang') === 'pl') {
                defineEnding();
            }
        }
    }
});

onMounted(() => {
    loadUserData();
});
</script>



<template>
    <div v-if="isDataLoading" ref="animatedScreen">
        <LoadingScreen />
    </div>
    <div class="flex flex-col" ref="animatedPage" v-show="!isDataLoading">
        <div class="grow home flex flex-col gap-y-8" v-if="isFullData">
            <div
                class="home__photo photo flex justify-center items-center h-[75vw] max-h-[320px] mt-[-1vw] mx-[-3vw] gradient-primary rounded-b-3xl">
                <img src="./../assets/user-male.png" alt="User Male" class="h-[80%] max-h-[200px]"
                    v-if="userStore.user.gender === 'male'">
                <img src="./../assets/user-female.png" alt="User Female" class="h-[80%] max-h-[200px]"
                    v-if="userStore.user.gender === 'female'">
            </div>
            <div class=" grow home__user user flex flex-col gap-y-5 lexend-bold text-lg">
                <p><span class="user__firstname">{{ userStore.user.firstName }}</span> <span class="user__lastname">{{
                    userStore.user.lastName }}</span>, {{ userAge }} {{ $t('Years') }}<span
                        v-if="endings === true">a</span></p>
                <div class="user__location">
                    <p class="lexend-bold">{{ $t('Location') }}</p>
                    <p class="lexend text-secondary text-sm">{{ userStore.user.location }}</p>
                </div>
                <div class="user__education">
                    <p class="lexend-bold">{{ $t('Education') }}</p>
                    <p class="lexend text-secondary text-sm">{{ userStore.userEducation.name }}</p>
                </div>
                <div class="user__tokens">
                    <p class="lexend-bold">{{ $t('UserTokens') }}: <span class="lexend">{{
                        userStore.user.tokens }}</span></p>
                </div>
                <!-- <div class="user__ihobbies hobbies" v-if="userStore.user.interests!.length > 0">
                <p class="lexend-bold mb-2">{{ $t('Hobbies') }}</p>
                <div class="hobbies__wrapper w-full flex justify-start gap-2.5">
                    <div class="hobbies__item hobby p-3 rounded-[10px] item-shadow"
                        v-for="(item, index) in userStore.user.interests" :key="index">
                        {{ $t(item) }}
                    </div>
                </div>
            </div> -->
            </div>
        </div>
        <div class="grow flex flex-col justify-center items-center gap-y-5 complete-message" v-else>
            <p class="lexend-bold text-center">{{ $t('Empty') }}</p>
            <CustomBtn type="button" @click="$router.push('/complete')">OK</CustomBtn>
        </div>
    </div>
</template>



<style lang="scss">
.photo {
    padding-top: env(safe-area-inset-top);
    padding-bottom: env(safe-area-inset-top);

    @media(min-width: calc(400px + 6vw)) {
        margin: -1vw calc((100vw - 400px) / 2 * -1) 0;
    }
}
</style>
