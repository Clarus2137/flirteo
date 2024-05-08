<script setup lang="ts">
import LogoBrand from './UI/LogoBrand.vue';
import { useI18n } from 'vue-i18n';


const { t } = useI18n();

const title = {
    title: t('Auth.title'),
    subtitle: t('Auth.subtitle')
}
</script>



<template>
    <div class="auth flex justify-center">
        <div class="auth__wrapper self-center flex justify-center items-between gap-y-[60px]">
            <div class="logo">
                <LogoBrand />
            </div>
            <div class="auth__body w-full flex gap-y-[30px]">
                <div class="form__title justify-center title-center">
                    <TitleRow :title="title" />
                </div>
                <CustomBtn @click="$router.push('/registration')">{{ t('Reg') }}</CustomBtn>
                <CustomBtn @click="$router.push('/login')">{{ t('LogIn') }}</CustomBtn>
            </div>
        </div>
    </div>
</template>



<style lang="scss">
.auth {
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
