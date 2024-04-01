<script setup lang="ts">
import { useUserStore } from 'src/stores/userStore';


const userStore = useUserStore();

const strLocalData = localStorage.getItem('currentUser');
if (strLocalData === null) {
    throw new Error('Item \'userData\' doesn\'t exist in localStorage');
} else {
    const userData: Partial<User> = JSON.parse(localStorage.currentUser).userData;
    userStore.setStoreUserData(userData);
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
        <div class="home__photo photo">
            <div src="" alt="" class="aspect-[1/1] gradient-primary rounded-b-3xl"></div>
        </div>
        <div class="home__user user my-8 lexend-bold text-lg">
            <p><span class="user__firstname">{{ userStore.user.firstName }}</span> <span class="user__lastname">{{
                userStore.user.lastName }}</span>, {{ userAge }} years</p>
            <p class="user__occupation lexend-light text-secondary text-sm">Occupation</p>
        </div>
        <div class="home__interests interests mb-8" v-if="userStore.user.interests!.length > 0">
            <p class="lexend-bold mb-2">Interests</p>
            <div class="interests__wrapper w-full flex justify-start gap-6">
                <div class="interests__item flex flex-no-wrap gap-x-1 items-center p-2 rounded-xl border border-solid border-inactive hover:cursor-pointer"
                    v-for="item in userStore.user.interests" :key="item.name">
                    <div v-html="item.img"></div>
                    <span class="capitalize">
                        {{ item.name }}
                    </span>
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
