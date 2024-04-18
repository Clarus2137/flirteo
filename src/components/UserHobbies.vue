<script setup lang="ts">
import { onMounted } from 'vue';
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
});
</script>



<template>
    <div class="details__hobbies hobbies grid grid-rows-[auto_min-content]">
        <div class="flex items-start content-center gap-[3vw]">
            <div class="hobbies__item hobby p-3 rounded-[10px] hover:cursor-pointer"
                :class="{ 'gradient-primary border-transparent text-white': item.checked, 'hobby-shadow': !item.checked }"
                v-for="(item, index) in hobbies" :key="index" @click="toggleItem(item)">
                {{ item.name }}
            </div>
        </div>
        <CustomBtn type="button" @click="updateUserData">Save</CustomBtn>
    </div>
</template>
