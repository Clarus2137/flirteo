<script setup lang="ts">
import { ref } from 'vue';
import { useUserStore } from 'src/stores/userStore';


const originalText = 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusantium rem assumenda maxime incidunt optio delectus recusandae quisquam sunt nulla esse, suscipit id dicta! Quibusdam voluptatem natus sequi veniam iure provident velit quis, modi eaque voluptatum earum optio, ab asperiores sit. Enim in modi quae a voluptate dolorum voluptas cupiditate ut alias quaerat error maxime quas corrupti possimus aperiam provident harum, perferendis at veritatis, incidunt necessitatibus praesentium vero inventore earum? Id aspernatur dolore eligendi, magni minima, accusantium a rerum laborum labore dolorem voluptas? Atque ut dicta corporis dignissimos repellat ex perspiciatis dolorum quae necessitatibus quasi! Veritatis, voluptatem expedita. Deserunt, voluptates fugiat!';
const limit = 250;
const isFullTextShown = ref(false);

const truncatedText = ref('');
const remainingText = ref('');

function initializeText() {
    if (originalText.length > limit && !isFullTextShown.value) {
        truncatedText.value = originalText.substring(0, limit);
        remainingText.value = originalText.substring(limit);
    } else {
        truncatedText.value = originalText;
        remainingText.value = '';
    }
}

initializeText();

function showFullText() {
    isFullTextShown.value = true;
    truncatedText.value = originalText;
    remainingText.value = '';
}

const userStore = useUserStore();
const localStorageData = localStorage.getItem('userData');

if (localStorageData === null) {
    throw new Error('Item \'userData\' doesn\'t exist in localStorage');
} else {
    const userData: Partial<User> = JSON.parse(localStorage.userData);
    userStore.setStoreUserData(userData);
}

const calculateAge = (birthDateString: string): number => {
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

console.log('Store data is:', userStore.user);
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
        <div class="home__about mb-8">
            <p class="lexend-bold mb-2">About</p>
            <p class="lexend-lign text-secondary text-sm">
                {{ truncatedText }}
                <span v-if="remainingText" class="text-primary hover:cursor-pointer" @click="showFullText">...Read
                    more...</span>
                <span v-if="isFullTextShown">{{ remainingText }}</span>
            </p>
        </div>
        <div class="home__interests interests mb-8">
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
        <div class="home__gallery gallery">
            <p class="lexend-bold mb-2">Gallery</p>
            <div class="gallery__wrapper">
                <div class="gallery__item"></div>
            </div>
        </div>
    </div>
</template>



<style scoped lang="scss">
.photo {
    margin: -25px -20px auto;
}
</style>
