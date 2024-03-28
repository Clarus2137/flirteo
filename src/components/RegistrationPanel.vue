<script setup lang="ts">
import { ref } from 'vue';
import { useUserStore } from 'src/stores/userStore';


const title = {
    title: 'Create your account',
    subtitle: 'Please enter your e-mail & password to continue'
}

const validEmail = new RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);
const enteredEmail = ref('');
const enteredPassword = ref('');

const isVisibleEmail = ref(false);
const isVisiblePassword = ref(false);

const userStore = useUserStore();

const emit = defineEmits(['goToVerification']);

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
        const newUser = {
            email: enteredEmail.value,
            plainPassword: enteredPassword.value
        }
        const isSuccess = await userStore.registerUser(newUser);
        if (isSuccess) {
            localStorage.setItem('isRegistered', 'true');
            emit('goToVerification');
            enteredEmail.value = '';
            enteredPassword.value = '';
        }
    }
}
</script>



<template>
    <BackBtn />
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
    </div>
</template>
