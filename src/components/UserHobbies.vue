<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useUserStore } from 'src/stores/userStore';
import { useI18n } from 'vue-i18n';


const { t } = useI18n();


const userStore = useUserStore();

const emit = defineEmits(['goToHome', 'sendTitle']);

const isLoading = ref(false);

const hobbies = userStore.hobbies;

const title: PageTitle = {
    title: t('Interests.title'),
    subtitle: t('Interests.subtitle')
}

const toggleItem = (item: BaseInterests) => {
    item.checked = !item.checked;
}

const updateUserData = async () => {
    isLoading.value = true;
    const userHobbies = hobbies.filter(item => item.checked).map(item => item.name);
    const userData = {
        interests: userHobbies
    }
    const isFinished = userStore.addUserData(userData);
    if (isFinished) {
        const isSuccess = await userStore.updateUser(userStore.user);
        isLoading.value = false;
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
    <div class="details__hobbies hobbies grow flex flex-col gap-[3vw]">
        <div class="grow flex items-center gap-[3vw]">
            <div class="hobbies__item hobby p-3 rounded-[10px] hover:cursor-pointer"
                :class="{ 'gradient-primary border-transparent text-white': item.checked, 'item-shadow': !item.checked }"
                v-for="(item, index) in hobbies" :key="index" @click="toggleItem(item)">
                {{ item.name }}
            </div>
        </div>
        <FormLoader :class="{ 'opacity-0': !isLoading }" />
        <CustomBtn type="button" @click="updateUserData">{{ t('Save') }}</CustomBtn>
    </div>
</template>
