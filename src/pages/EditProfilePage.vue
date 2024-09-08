<script setup lang="ts">
import { ref, Ref } from 'vue';
import CommonInfo from 'src/components/CommonInfo.vue';
import UserGender from 'src/components/UserGender.vue';



const pageTitle = ref<PageTitle>({ title: '', subtitle: '' });

const getTitle = (recievedTitle: PageTitle) => {
    pageTitle.value = recievedTitle;
}

const step = ref<number>(1);
const stepsDone: Ref<{ [key: number]: boolean }> = ref({});

const nextStep = (currentStep: number) => {
    stepsDone.value[currentStep] = true;
    step.value = currentStep + 1;
}

const isDataLoading = ref(true);
const animatedScreen = ref<HTMLElement | null>(null);
const animatedPage = ref<HTMLElement | null>(null);

const toggleScreen = () => {
    if (animatedScreen.value) {
        animatedScreen.value.animate([
            { opacity: '1' },
            { opacity: '0' }
        ], {
            duration: 400,
            easing: 'linear'
        }).onfinish = () => {
            isDataLoading.value = false; // Переключаем состояние загрузки
            if (animatedPage.value) {
                animatedPage.value.animate([
                    { opacity: '0' },
                    { opacity: '1' }
                ], {
                    duration: 400,
                    easing: 'linear'
                });
            }
        };
    }
}
</script>



<template>
    <div v-if="isDataLoading" ref="animatedScreen">
        <LoaderScreen />
    </div>
    <div class="profile grow flex flex-col" v-show="!isDataLoading" ref="animatedPage">
        <div class="profile__details details grow flex flex-col gap-y-3">
            <div class="details__title">
                <TitleRow :title="pageTitle" />
            </div>
            <q-stepper v-model="step" header-nav ref="stepper" color="primary" animated
                class="grow flex flex-col gap-y-3">
                <q-step :name="1" :title="$t('Details')" icon="settings" :done="step > 1" :header-nav="step > 1"
                    class="step-common">

                    <CommonInfo @showPage="toggleScreen" @goToGender="nextStep(1)" @sendTitle="getTitle" />

                </q-step>

                <q-step :name="2" :title="$t('Gender.title')" icon="check_box" :done="step > 2" :header-nav="step > 2"
                    class="step-gender">

                    <UserGender @goToHome="$router.push('/home')" @sendTitle="getTitle" />

                    <q-stepper-navigation>
                        <CustomBtn type="button" @click="() => step = 1">{{ $t('Back') }}</CustomBtn>
                    </q-stepper-navigation>
                </q-step>

                <!-- <q-step :name="3" :title="$t('Hobbies')" icon="view_list" :header-nav="step > 3" class="step-hobbies">

                    <UserHobbies @goToHome="$router.push('/home')" @sendTitle="getTitle" />

                    <q-stepper-navigation>
                        <CustomBtn type="button" @click="() => step = 2">{{ $t('Back') }}</CustomBtn>
                    </q-stepper-navigation>
                </q-step> -->
            </q-stepper>
        </div>
    </div>
</template>
