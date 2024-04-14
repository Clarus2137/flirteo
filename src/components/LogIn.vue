<script setup lang="ts">
import { ref } from 'vue';
import { useUserStore } from 'src/stores/userStore';


const emit = defineEmits(['goToComplete', 'goToHome']);

const title = {
    title: 'Log in to your account',
    subtitle: 'Please enter your e-mail & password to continue'
}

const validEmail = new RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);
const enteredEmail = ref('');
const enteredPassword = ref('');

const isVisibleEmail = ref(false);
const isVisiblePassword = ref(false);

const isError = ref(false);
const isAuth = ref(false);

const userStore = useUserStore();

const validateEmailAndPassword = (): boolean => {
    let isValid = true;

    // Reset visibility states
    isVisibleEmail.value = false;
    isVisiblePassword.value = false;

    if (!validEmail.test(enteredEmail.value)) {
        isVisibleEmail.value = true;
        isValid = false;
    }

    const hasValidLength = enteredPassword.value.length >= 8;
    const hasUpperCase = /[A-Z]/.test(enteredPassword.value);
    const hasNumber = /[0-9]/.test(enteredPassword.value);
    const hasSpecialSymbol = /[-_!?&$#@]/.test(enteredPassword.value);

    if (!hasValidLength || !hasUpperCase || !hasNumber || !hasSpecialSymbol) {
        isVisiblePassword.value = true;
        isValid = false;
    }

    return isValid;
}

const handleSubmit = async (e: Event) => {
    e.preventDefault(); // Prevent form from submitting by default

    if (!validateEmailAndPassword()) {
        console.log('Form is invalid');
    } else {
        console.log('form submited');
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
                const isProfileCompleted = JSON.parse(localStorage.currentUser).userData.firstName
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
}
</script>



<template>
    <BackBtn class="mb-3" />
    <div class="email">
        <div class="email__title">
            <TitleRow :title="title" />
        </div>
        <form class="email__form mt-5" id="reg-account" @submit="handleSubmit">
            <CustomInput type="text" placeholder="example@domain.com" v-model="enteredEmail" required />
            <p class="text-center text-xs text-alarm font-bold duration-300"
                :class="{ 'opacity-100': isVisibleEmail, 'opacity-0': !isVisibleEmail }">
                Invalid E-mail
            </p>
            <CustomInput type="password" placeholder="Some password" v-model="enteredPassword" required />
            <p class="text-center text-xs text-alarm font-bold duration-300"
                :class="{ 'opacity-100': isVisiblePassword, 'opacity-0': !isVisiblePassword }">
                Invalid Password
            </p>
            <CustomBtn type="submit" class="mt-5">Continue</CustomBtn>
        </form>
        <div class="mt-10 text-sm text-center" v-if="isError">
            <p class="text-red font-medium">The User doesn't exist or invalid password.</p>
            <router-link class="inline-block my-3 text-base text-primary font-medium underline" to="/registration">Do
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
</template>
