<script setup lang="ts">
import { ref } from 'vue';
import { useUserStore } from 'src/stores/userStore';
import { useRouter } from 'vue-router';


const userStore = useUserStore();
const router = useRouter();

const isSeted = ref(false);
const isError = ref(false);
const isLoading = ref(false);

const pass = ref('');

const sendPass = async () => {
    if (isSeted.value) { isSeted.value = false }
    if (isError.value) { isError.value = false }
    isLoading.value = true;
    const isSuccess = await userStore.setNewPassword(pass.value);
    isLoading.value = true;
    if (isSuccess) {
        isSeted.value = true;
        setTimeout(() => {
            router.push('/login');
        }, 300);
    } else {
        isError.value = true;
    }
}
</script>



<template>
    <form class="reset" @submit.prevent="sendPass">
        <CustomInput type="password" v-model="pass" />
        <CustomBtn>{{ $t('Send') }}</CustomBtn>
    </form>
    <FormLoader />
    <p class="text-center text-green">Your new passord has been successfully seted.</p>
    <p class="text-center text-red">Something goes wrong. Please, contact with us: <span
            class="text-gradient-primary lexend-bold"></span></p>
</template>
