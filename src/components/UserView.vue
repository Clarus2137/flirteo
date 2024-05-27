<script setup lang="ts">
import { ref, onBeforeMount, onMounted } from 'vue';
import { useUserStore } from 'src/stores/userStore';


const userStore = useUserStore();
const endings = ref(false);
const isDataLoading = ref(true);
const userAge = ref(0);

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

const loadUserData = async () => {
    await userStore.getUserData();
    setUserData();
    toggleScreen();
}

const emit = defineEmits(['goToComplete']);

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
    <div class="home grid grid-rows-[min-content_auto] gap-y-8" ref="animatedPage" v-show="!isDataLoading">
        <div
            class="home__photo photo flex justify-center items-center h-[75vw] max-h-[320px] mt-[-1vw] mx-[-3vw] gradient-primary rounded-b-3xl">
            <img src="./../assets/user-male.png" alt="User Male" class="h-[80%] max-h-[200px]"
                v-if="userStore.user.gender === 'male'">
            <img src="./../assets/user-female.png" alt="User Female" class="h-[80%] max-h-[200px]"
                v-if="userStore.user.gender === 'female'">
        </div>
        <div class="home__user user grid grid-rows-[min-content_min-content_min-content] gap-y-5 lexend-bold text-lg">
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
