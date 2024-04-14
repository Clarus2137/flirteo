<script setup lang="ts">
import PrivacyAndTerms from './PrivacyAndTerms.vue';


const title = {
    title: 'Sign In to Continue',
    subtitle: 'Please sign in to continue'
}
</script>



<template>
    <div class="auth flex justify-center">
        <div class="auth__wrapper self-center flex justify-center items-between gap-y-[60px]">
            <div class="logo">
                <svg class="mx-auto" width="84" height="68" viewBox="0 0 84 68" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M67.2734 2.22895C56.9068 -3.57349 50.4525 9.52311 47.1864 19.4967H36.6125C33.3465 9.52311 26.8922 -3.57349 16.5256 2.22895C0.5 11.1988 0.5 65.0528 0.5 65.0528C0.5 65.0528 5.84187 65.1099 8.51281 56.8898C8.20648 61.2363 9.70321 64.7983 11.1837 67.5735C14.7546 66.1424 17.7098 61.606 20.532 56.6828C20.8462 58.3647 21.7363 60.8498 22.4184 62.1282C26.1477 60.6336 29.9471 56.814 32.8175 51.5479H50.9817C53.8519 56.814 57.6515 60.6336 61.3816 62.1282C62.0636 60.8498 62.9537 58.3647 63.268 56.6828C66.0902 61.606 69.0454 66.1424 72.6163 67.5735C74.0968 64.7983 75.5935 61.2363 75.2872 56.8898C77.9581 65.1096 83.3 65.0528 83.3 65.0528C83.3 65.0528 83.299 11.1988 67.2734 2.22895Z"
                        fill="#e03368" fill-opacity="0.1" />
                    <path
                        d="M55.184 11.4839C52.4215 11.477 49.7123 12.2447 47.3642 13.6998C45.016 15.155 43.1228 17.2394 41.8996 19.7163C40.6763 17.2394 38.7831 15.155 36.4349 13.6998C34.0868 12.2447 31.3777 11.477 28.6152 11.4839C20.4631 11.4839 13.8547 18.0236 13.8547 26.0906C13.8547 45.0793 41.8996 58.2253 41.8996 58.2253C41.8996 58.2253 69.9444 45.0793 69.9444 26.0906C69.9444 18.0236 63.336 11.4839 55.184 11.4839Z"
                        fill="url(#paint0_linear_2_3574)" />
                    <defs>
                        <linearGradient id="paint0_linear_2_3574" x1="13.8547" y1="11.4839" x2="59.8299" y2="66.654"
                            gradientUnits="userSpaceOnUse">
                            <stop stop-color="#ff84a7" />
                            <stop offset="1" stop-color="#e03368" />
                        </linearGradient>
                    </defs>
                </svg>
                <p class="brand-name mt-[6px] pacifico-regular text-4xl text-gradient-primary">Flirteo</p>
            </div>
            <div class="auth__body w-full flex gap-y-[30px]">
                <div class="form__title justify-center title-center">
                    <TitleRow :title="title" />
                </div>
                <CustomBtn @click="$router.push('/registration')">Register Account</CustomBtn>
                <CustomBtn @click="$router.push('/login')">Log in</CustomBtn>
            </div>
        </div>
    </div>
    <PrivacyAndTerms />
</template>



<style scoped lang="scss">
.auth {
    flex-grow: 1;

    .auth__body>* {
        width: 100%;
    }

    .choice>hr {
        color: rgba(216, 216, 216, .6);
    }

    .outside__item {
        background: none !important;
        border-radius: 10px;
        border: 1px solid rgba(152, 147, 148, .2);
        text-transform: none;

        &::before {
            box-shadow: none;
        }
    }
}
</style>
