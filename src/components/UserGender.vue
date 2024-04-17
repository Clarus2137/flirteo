<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useUserStore } from 'src/stores/userStore';


const emit = defineEmits(['goToInterests', 'sendTitle']);

const title: PageTitle = {
    title: 'Gender',
    subtitle: 'Please select your gender'
}

const userStore = useUserStore();

const activeGender = ref<string | null>(null);

const chooseGender = (gender: string) => {
    if (activeGender.value !== gender) {
        activeGender.value = gender;
    }
}

const setGender = () => {
    const gender = activeGender.value ? activeGender.value : 'Not specified';
    const isSuccess = userStore.addUserData({ gender });
    if (isSuccess) {
        emit('goToInterests');
    }
}

const loadUserData = (strSessionStorage: string) => {
    const userData: Partial<User> = JSON.parse(strSessionStorage); // Assuming currentUser is the property holding user data. Adjust according to your store structure.
    userStore.user = userData;
    activeGender.value = userData.gender || '';
}

onMounted(() => {
    const strSessionStorage = sessionStorage.getItem('userData');
    if (strSessionStorage !== null) {
        loadUserData(strSessionStorage);
    }
    emit('sendTitle', title);
})
</script>



<template>
    <div class="details__gender gender grid grid-rows-[auto_min-content] gap-y-8">
        <div class="gender__items w-full flex justify-around gap-8">
            <div class="gender__item gender__male p-8 rounded-2xl border border-solid border-inactive text-center hover:cursor-pointer"
                :class="{ 'border-primary active': activeGender === 'male' }" @click="chooseGender('male')">
                <svg width="62" height="61" viewBox="0 0 62 61" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <linearGradient id="maleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" style="stop-color:#FF84A7;" />
                            <stop offset="100%" style="stop-color:#E03368;" />
                        </linearGradient>
                    </defs>
                    <path fill-rule="evenodd" clip-rule="evenodd"
                        :fill="activeGender === 'male' ? 'url(#maleGradient)' : '#000'"
                        d="M42 0H60C61.1046 0 62 0.89543 62 2V20C62 21.1046 61.1046 22 60 22C58.8954 22 58 21.1046 58 20V6.82841L44.4886 20.3398C47.9365 24.6252 50 30.0716 50 36C50 49.8071 38.8071 61 25 61C11.1929 61 0 49.8071 0 36C0 22.1929 11.1929 11 25 11C31.4384 11 37.3083 13.4338 41.74 17.4316L55.1716 4H42C40.8954 4 40 3.10457 40 2C40 0.89543 40.8954 0 42 0Z" />
                </svg>
                <p class="mt-4 text-xl" :class="{ 'text-primary': activeGender === 'male' }">Male</p>
            </div>
            <div class="gender__item gender__female p-8 rounded-2xl border border-solid border-inactive text-center hover:cursor-pointer"
                :class="{ 'border-primary active': activeGender === 'female' }" @click="chooseGender('female')">
                <svg width="50" height="66" viewBox="0 0 50 66" xmlns="http://www.w3.org/2000/svg" class="mx-auto">
                    <defs>
                        <linearGradient id="femaleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" style="stop-color:#FF84A7;" />
                            <stop offset="100%" style="stop-color:#E03368;" />
                        </linearGradient>
                    </defs>
                    <path fill-rule="evenodd" clip-rule="evenodd"
                        :fill="activeGender === 'female' ? 'url(#femaleGradient)' : '#000'"
                        d="M50 25C50 38.8071 38.8071 50 25 50C11.1929 50 0 38.8071 0 25C0 11.1929 11.1929 0 25 0C38.8071 0 50 11.1929 50 25ZM25 50H23V58H18V62H23V66H27V62H32V58H27V50H25Z" />
                </svg>
                <p class="mt-4 text-xl" :class="{ 'text-primary': activeGender === 'female' }">Female</p>
            </div>
            <div class="gender__item gender__other w-full p-8 rounded-2xl border border-solid border-inactive text-center hover:cursor-pointer"
                :class="{ 'border-primary active': activeGender === 'other' }" @click="chooseGender('other')">
                <p class="text-xl" :class="{ 'text-primary': activeGender === 'other' }">Other</p>
            </div>
        </div>
        <CustomBtn type="button" @click="setGender">Continue</CustomBtn>
    </div>
</template>



<style scoped lang="scss">
.active>svg {
    fill: #f24e80;
}
</style>
