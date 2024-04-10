<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useUserStore } from 'src/stores/userStore';


const userStore = useUserStore();

const emit = defineEmits(['goToHome', 'sendTitle']);

// const storeHobbies = ref<BaseInterests>;

const hobbies = userStore.hobbies;

const title: PageTitle = {
    title: 'Select your interests',
    subtitle: 'Select a few of your interests to match with users who have similar things in common'
}

const toggleItem = (item: BaseInterests) => {
    item.checked = !item.checked;
}

const updateUserData = async () => {
    const userHobbies = hobbies.filter(item => item.checked).map(item => item.name);
    const userData = {
        interests: userHobbies
    }
    const isFinished = userStore.addUserData(userData);
    if (isFinished) {
        const isSuccess = await userStore.updateUser(userStore.user);
        if (isSuccess) {
            emit('goToHome');
        }
    }
}

onMounted(() => {
    emit('sendTitle', title);
    console.log(userStore.hobbies)
});
</script>



<template>
    <div class="details__hobbies hobbies flex gap-x-2.5">
        <div class="hobbies__item hobby p-3 rounded-[10px] hover:cursor-pointer"
            :class="{ 'gradient-primary border-transparent text-white': item.checked, 'hobby-shadow': !item.checked }"
            v-for="(item, index) in hobbies" :key="index" @click="toggleItem(item)">
            {{ item.name }}
        </div>
    </div>

    <CustomBtn type="button" class="mt-5" @click="updateUserData">Save</CustomBtn>
</template>
