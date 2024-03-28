<script setup lang="ts">
import { ref } from 'vue';
import { interests as importedInterests } from './interests';
import { useUserStore } from 'src/stores/userStore';

const title = {
    title: 'Select your interests',
    subtitle: 'Select a few of your interests to match with users who have similar things in common'
}

const interests = ref<BaseInterests[]>(importedInterests)

const toggleActive = (item: BaseInterests) => {
    item.checked = !item.checked;
}

const emit = defineEmits(['goToHome']);

const userStore = useUserStore();

const saveInterests = async () => {
    const activeInterests = interests.value
        .filter(item => item.checked)
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .map(({ checked, ...newItem }) => newItem);
    const isAdded = userStore.addUserData({ interests: activeInterests });
    if (isAdded) {
        const strLocalData = localStorage.getItem('currentUser');
        if (strLocalData === null) {
            throw new Error('User\'s data doesn\'t exist in localStorage');
        } else {
            const updatedUserData: Partial<User> = JSON.parse(localStorage.currentUser).userData;
            const isSuccess = await userStore.updateUser(updatedUserData);
            if (isSuccess) {
                emit('goToHome');
            }
        }
    }
};
</script>



<template>
    <div class="profile__interests interests flex flex-col items-center gap-y-10">
        <div class="interests__title w-full">
            <TitleRow :title="title" />
        </div>
        <div class="interests__items interest w-full flex justify-start gap-6">
            <div v-for="item in interests" :key="item.name"
                class="interest__item flex flex-no-wrap gap-x-1 items-center p-2 rounded-xl border border-solid border-inactive hover:cursor-pointer"
                @click="toggleActive(item)" :class="{ 'border-transparent gradient-primary': item.checked }">
                <div v-html="item.img" class="inline-block"></div>
                <span class="capitalize">{{ item.name }}</span>
            </div>
        </div>
        <CustomBtn type="button" @click="saveInterests">Save</CustomBtn>
    </div>
</template>
