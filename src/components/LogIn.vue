<script setup lang="ts">
import { ref } from 'vue';
import { useUserStore } from 'src/stores/userStore';


const emit = defineEmits(['goToComplete', 'goToHome']);

const title = {
    title: 'Log in to your account',
    subtitle: 'Please enter your e-mail & password to continue'
}

const enteredEmail = ref('');
const enteredPassword = ref('');

const isVisibleEmail = ref(false);
const isVisiblePassword = ref(false);

const isError = ref(false);
const isAuth = ref(false);

const userStore = useUserStore();

const handleSubmit = async (e: Event) => {
    e.preventDefault(); // Prevent form from submitting by default

    const userAccount = {
        email: enteredEmail.value,
        password: enteredPassword.value
    }
    const isSuccess = await userStore.authoriseUser(userAccount);
    if (isSuccess) {
        if (localStorage.getItem('isAuthorised') === null) {
            localStorage.setItem('isAuthorised', 'true');
        }
        if (isError.value) {
            isError.value = !isError.value;
        }
        isAuth.value = !isError.value;
        setTimeout(() => {
            const isProfileCompleted = JSON.parse(sessionStorage.userData).firstName
            if (isProfileCompleted !== null) {
                emit('goToHome');
            } else {
                emit('goToComplete');
            }
        }, 300);
        enteredEmail.value = '';
        enteredPassword.value = '';
    } else {
        isError.value = true;
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
                    <CustomInput type="text" placeholder="example@domain.com" v-model="enteredEmail" required />
                    <p class="text-center text-xs text-alarm font-bold duration-300"
                        :class="{ 'opacity-100': isVisibleEmail, 'opacity-0': !isVisibleEmail }">
                        Invalid E-mail
                    </p>
                </div>
                <div>
                    <CustomInput type="password" placeholder="Some password" v-model="enteredPassword" required />
                    <p class="text-center text-xs text-alarm font-bold duration-300"
                        :class="{ 'opacity-100': isVisiblePassword, 'opacity-0': !isVisiblePassword }">
                        Invalid Password
                    </p>
                </div>
                <CustomBtn type="submit" :disabled="enteredEmail === '' || enteredPassword === ''">Continue</CustomBtn>
            </form>
            <div class="mt-10 text-sm text-center" v-if="isError">
                <p class="text-red font-medium">The User doesn't exist or invalid password.</p>
                <router-link class="inline-block my-3 text-base text-primary font-medium underline"
                    to="/registration">Do
                    you really
                    have an
                    account?</router-link>
                <p>If you are, check the password and try again or <span
                        class="reset-link text-primary font-medium underline">just
                        reset your
                        password</span>
                </p>
            </div>
            <div class="mt-10 text-green font-medium text-center" v-if="isAuth">
                <p>Authorization successful</p>
            </div>
        </div>
    </div>
</template>
