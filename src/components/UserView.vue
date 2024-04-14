<script setup lang="ts">
import { useUserStore } from 'src/stores/userStore';


const userStore = useUserStore();

const strLocalData = localStorage.getItem('currentUser');
if (strLocalData === null) {
    throw new Error('Item \'userData\' doesn\'t exist in localStorage');
} else {
    const userData: Partial<User> = JSON.parse(localStorage.currentUser).userData;
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
    <div class="home">
        <div class="home__photo photo flex justify-center items-center aspect-square gradient-primary rounded-b-3xl">
            <img src="./../assets/user-male.png" alt="User Male" class="max-h-[300px]"
                v-if="userStore.user.gender === 'male'">
            <img src="./../assets/user-female.png" alt="User Female" class="max-h-[300px]"
                v-else-if="userStore.user.gender === 'female'">
            <img src="./../assets/user-neutral.png" alt="User Neutral" class="max-h-[300px]" v-else>
        </div>
        <div class="home__user user my-8 lexend-bold text-lg">
            <p><span class="user__firstname">{{ userStore.user.firstName }}</span> <span class="user__lastname">{{
                userStore.user.lastName }}</span>, {{ userAge }} years</p>
            <p class="user__education lexend-bold mt-8">Education:</p>
            <p class="user__education lexend text-secondary text-sm">{{ userStore.user.education }}</p>
        </div>
        <div class="home__ihobbies hobbies mb-8" v-if="userStore.user.interests!.length > 0">
            <p class="lexend-bold mb-2">Interests</p>
            <div class="hobbies__wrapper w-full flex justify-start gap-2.5">
                <div class="hobbies__item hobby p-3 rounded-[10px] hobby-shadow"
                    v-for="(item, index) in userStore.user.interests" :key="index">
                    {{ item }}
                </div>
            </div>
        </div>
    </div>
</template>



<style scoped lang="scss">
.photo {
    margin: -25px -20px auto;
}
</style>
