<script setup lang="ts">
import { ref } from 'vue';
import { useUserStore } from 'src/stores/userStore';
import { useI18n } from 'vue-i18n';


const { t } = useI18n();

const emit = defineEmits(['goToComplete', 'goToHome', 'goToPass']);

const title = {
    title: t('Log.title'),
    subtitle: t('Log.subtitle')
}

const enteredEmail = ref('');
const enteredPassword = ref('');

const isVisibleEmail = ref(false);
const isVisiblePassword = ref(false);

const isError = ref(false);
const isAuth = ref(false);

const isLoading = ref(false);

const userStore = useUserStore();

const handleSubmit = async (e: Event) => {
    e.preventDefault(); // Prevent form from submitting by default
    isLoading.value = true;
    const userAccount = {
        email: enteredEmail.value,
        password: enteredPassword.value
    }
    const isSuccess = await userStore.authoriseUser(userAccount);
    isLoading.value = false;
    if (isSuccess) {
        if (localStorage.getItem('isAuthorised') === null) {
            localStorage.setItem('isAuthorised', 'true');
        }
        if (isError.value) {
            isError.value = !isError.value;
        }
        isAuth.value = !isError.value;
        setTimeout(() => {
            nextRoute();
        }, 300);
        enteredEmail.value = '';
        enteredPassword.value = '';
    } else {
        isError.value = true;
    }
}

const nextRoute = async () => {
    const isProfileCompleted = JSON.parse(sessionStorage.userData).firstName
    if (isProfileCompleted !== null) {
        setTimeout(() => {
            emit('goToHome');
        }, 300);
    } else {
        const isEducation = await userStore.getEducation();
        if (isEducation) {
            emit('goToComplete');
        }
    }
}

const resetPass = async () => {
    isLoading.value = true;
    const isSuccess = await userStore.resetPassword(enteredEmail.value);
    isLoading.value = false;
    if (isSuccess) {
        emit('goToPass');
    }
}
</script>



<template>
    <div class="flex flex-col">
        <BackBtn class="self-start" />
        <div class="email grow flex flex-col justify-center gap-y-8">
            <div class="email__title text-center">
                <TitleRow :title="title" />
            </div>
            <form class="email__form flex flex-col justify-start gap-y-3" id="reg-account" @submit="handleSubmit">
                <div>
                    <CustomInput type="text" :placeholder="t('Email')" v-model="enteredEmail" required />
                    <p class="text-center text-xs text-alarm font-bold duration-300"
                        :class="{ 'opacity-100': isVisibleEmail, 'opacity-0': !isVisibleEmail }">
                        {{ t('Invalid.email') }}
                    </p>
                </div>
                <div>
                    <CustomInput type="password" :placeholder="t('Pass')" v-model="enteredPassword" required />
                    <p class="text-center text-xs text-alarm font-bold duration-300"
                        :class="{ 'opacity-100': isVisiblePassword, 'opacity-0': !isVisiblePassword }">
                        {{ t('Invalid.pass') }}
                    </p>
                </div>
                <CustomBtn type="submit" :disabled="enteredEmail === '' || enteredPassword === ''">{{ t('Continue') }}
                </CustomBtn>
                <FormLoader class="mt-5" v-if="isLoading" />
            </form>
            <div class="mt-10 text-sm text-center" v-if="isError">
                <p class="text-red font-medium">{{ t('Invalid.user') }} {{ t('Invalid.pass') }}</p>
                <router-link class="inline-block my-3 text-base text-primary font-medium underline"
                    to="/registration">{{ t('Invalid.account') }}</router-link>
                <p>{{ t('Check_Pass') }} <span
                        class="reset-link text-primary font-medium underline hover:cursor-pointer" @click="resetPass">{{
                    t('Reset_Pass')
                }}</span>
                </p>
            </div>
            <div class="mt-10 text-green font-medium text-center" v-if="isAuth">
                <p>{{ t('Auth.success') }}</p>
            </div>
        </div>
    </div>
</template>
