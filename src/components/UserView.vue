<script setup lang="ts">
import { useUserStore } from 'src/stores/userStore';


const userStore = useUserStore();

const strUserData = sessionStorage.getItem('userData');
if (strUserData === null) {
    throw new Error('Item \'userData\' doesn\'t exist in sessionStorage');
} else {
    const userData: Partial<User> = JSON.parse(sessionStorage.userData);
    userStore.getStoreUserData(userData);
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
const userAge = calculateAge(userStore.user.dateOfBirth!);
</script>



<template>
    <div class="home grid grid-rows-[min-content_auto] gap-y-8">
        <div
            class="home__photo photo flex justify-center items-center h-[75vw] max-h-[320px] mt-[-1vw] mx-[-3vw] gradient-primary rounded-b-3xl">
            <img src="./../assets/user-male.png" alt="User Male" class="max-h-[200px]"
                v-if="userStore.user.gender === 'male'">
            <img src="./../assets/user-female.png" alt="User Female" class="max-h-[300px]"
                v-else-if="userStore.user.gender === 'female'">
            <img src="./../assets/user-neutral.png" alt="User Neutral" class="max-h-[300px]" v-else>
        </div>
        <div class="home__user user grid grid-rows-[min-content_min-content_min-content] gap-y-5 lexend-bold text-lg">
            <p><span class="user__firstname">{{ userStore.user.firstName }}</span> <span class="user__lastname">{{
                    userStore.user.lastName }}</span>, {{ userAge }} {{ $t('Years') }}</p>
            <div class="user__education">
                <p class="lexend-bold">{{ $t('Education') }}</p>
                <p class="lexend text-secondary text-sm">{{ userStore.user.education }}</p>
            </div>
            <div class="user__ihobbies hobbies" v-if="userStore.user.interests!.length > 0">
                <p class="lexend-bold mb-2">{{ $t('Hobbies') }}</p>
                <div class="hobbies__wrapper w-full flex justify-start gap-2.5">
                    <div class="hobbies__item hobby p-3 rounded-[10px] item-shadow"
                        v-for="(item, index) in userStore.user.interests" :key="index">
                        {{ item }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>



<style lang="scss" scoped>
.photo {
    padding-top: env(safe-area-inset-top);
    padding-bottom: env(safe-area-inset-top);

    @media(min-width: calc(400px + 6vw)) {
        margin: -1vw calc((100vw - 400px) / 2 * -1) 0;
    }
}
</style>
