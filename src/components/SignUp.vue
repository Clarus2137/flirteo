<script setup lang="ts">
import { ref } from 'vue';
import { useUserStore } from 'src/stores/userStore';
import PrivacyAndTerms from './PrivacyAndTerms.vue';
import { useI18n } from 'vue-i18n';


const { t } = useI18n();

const userStore = useUserStore();

const emit = defineEmits(['goToVerification']);

const title = {
    title: t('SignUp'),
    subtitle: t('Email_Pass')
}

const validEmail = new RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);
const enteredEmail = ref('');
const enteredPassword = ref('');

const isVisibleEmailAlarm = ref(false);
const existingEmail = ref(false);
const isVisiblePasswordAlarm = ref(false);
const isLoading = ref(false);

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

    if (!hasValidLength) {
        isVisiblePasswordAlarm.value = true;
        isValid = false;
    }

    return isValid;
}

const handleSubmit = async (e: Event) => {
    e.preventDefault(); // Prevent form from submitting by default

    if (validateEmailAndPassword()) {
        isLoading.value = true;
        const newUser = {
            email: enteredEmail.value,
            plainPassword: enteredPassword.value
        }
        const isSuccess = await userStore.registerUser(newUser);
        isLoading.value = false;
        if (isSuccess) {
            existingEmail.value = false;
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

emit('goToVerification');
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
                    <CustomInput type="text" :placeholder="t('Email')" v-model="enteredEmail" required />
                    <p class="text-center text-xs text-alarm font-bold" v-if="isVisibleEmailAlarm">
                        {{ t('Invalid.email') }}
                    </p>
                    <p class="text-center text-xs text-alarm font-bold" v-if="existingEmail">{{ t('Used_email') }}</p>
                </div>
                <div>
                    <CustomInput type="password" :placeholder="t('Pass')" v-model="enteredPassword" required />
                    <p class="text-secondary text-[0.6rem] leading-[1.5] text-center">{{ t('Pass_hint') }}</p>
                    <p class="text-center text-xs text-alarm font-bold duration-300"
                        :class="{ 'opacity-100': isVisiblePasswordAlarm, 'opacity-0': !isVisiblePasswordAlarm }">
                        {{ t('Invalid.pass') }}
                    </p>
                </div>
                <CustomBtn type="submit"
                    :disabled="isAccepted === false || enteredEmail === '' || enteredPassword === ''" class="mb-5">{{
                        t('Continue')
                    }}
                </CustomBtn>
                <FormLoader v-if="isLoading" />
                <p class="agreement-alarm lexend-bold text-secondary text-center text-sm" v-if="agreementAlarm">{{
                    $t('Consent') }}</p>
            </form>
        </div>
        <PrivacyAndTerms @agreement="toggleState" />
    </div>
</template>
