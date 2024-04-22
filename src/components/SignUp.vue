<script setup lang="ts">
import { ref } from 'vue';
import { useUserStore } from 'src/stores/userStore';
import PrivacyAndTerms from './PrivacyAndTerms.vue';



const userStore = useUserStore();

const emit = defineEmits(['goToVerification']);

const title = {
    title: 'Create your account',
    subtitle: 'Please enter your e-mail & password to continue'
}

const validEmail = new RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);
const enteredEmail = ref('');
const enteredPassword = ref('');

const isVisibleEmailAlarm = ref(false);
const existingEmail = ref(false);
const isVisiblePasswordAlarm = ref(false);

const isAccepted = ref(false);
const agreementAlarm = ref(true);

const validateEmailAndPassword = (): boolean => {
    let isValid = true;

    // Reset visibility states
    isVisibleEmailAlarm.value = false;
    isVisiblePasswordAlarm.value = false;

    if (!validEmail.test(enteredEmail.value)) {
        isVisibleEmailAlarm.value = true;
        isValid = false;
    }

    const hasValidLength = enteredPassword.value.length >= 8;
    const hasUpperCase = /[A-Z]/.test(enteredPassword.value);
    const hasNumber = /[0-9]/.test(enteredPassword.value);
    const hasSpecialSymbol = /[-_!?&$#@]/.test(enteredPassword.value);

    if (!hasValidLength || !hasUpperCase || !hasNumber || !hasSpecialSymbol) {
        isVisiblePasswordAlarm.value = true;
        isValid = false;
    }

    return isValid;
}

const handleSubmit = async (e: Event) => {
    e.preventDefault(); // Prevent form from submitting by default

    if (!validateEmailAndPassword()) {
    } else {
        const newUser = {
            email: enteredEmail.value,
            plainPassword: enteredPassword.value
        }
        const isSuccess = await userStore.registerUser(newUser);
        if (isSuccess) {
            existingEmail.value = true;
            if (localStorage.getItem('isAuthorised') === null) {
                localStorage.setItem('isAuthorised', 'true');
            }
            emit('goToVerification');
            enteredEmail.value = '';
            enteredPassword.value = '';
        } else {
            existingEmail.value = true;
        }
    }
}

const toggleState = () => {
    isAccepted.value = !isAccepted.value;
    if (isAccepted.value === false) {
        agreementAlarm.value = true;
    } else {
        agreementAlarm.value = false;
    }
}
</script>



<template>
    <div class="flex flex-col justify-between">
        <BackBtn class="self-start" />
        <div class="email flex flex-col gap-y-8">
            <div class="email__title text-center">
                <TitleRow :title="title" />
            </div>
            <form class="email__form" id="reg-account" @submit="handleSubmit">
                <div class="mb-3">
                    <CustomInput type="text" placeholder="example@domain.com" v-model="enteredEmail" required />
                    <p class="text-center text-xs text-alarm font-bold" v-if="isVisibleEmailAlarm">
                        Invalid E-mail
                    </p>
                    <p class="text-center text-xs text-alarm font-bold" v-if="existingEmail">It seems this E-mail has
                        been
                        already used.</p>
                </div>
                <div>
                    <CustomInput type="password" placeholder="Some password" v-model="enteredPassword" required />
                    <p class="text-secondary text-[0.6rem] leading-[1.5]">Your password must be at least 8 letters a-z,
                        containing at least 1
                        capital letter, 1 number 0-9 and
                        1 special character from "-, _, !, ?, &, $, #, @"</p>
                    <p class="text-center text-xs text-alarm font-bold duration-300"
                        :class="{ 'opacity-100': isVisiblePasswordAlarm, 'opacity-0': !isVisiblePasswordAlarm }">
                        Invalid Password
                    </p>
                </div>
                <CustomBtn type="submit"
                    :disabled="isAccepted === false || enteredEmail === '' || enteredPassword === ''">Continue
                </CustomBtn>
                <p class="agreement-alarm mt-5 lexend-bold text-secondary text-center text-sm"
                    :class="{ 'opacity-0': !agreementAlarm }">For
                    start please
                    express your consent
                    to the processing of your personal data down below</p>
            </form>
        </div>
        <PrivacyAndTerms @agreement="toggleState" />
    </div>
</template>
