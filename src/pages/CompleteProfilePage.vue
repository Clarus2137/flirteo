<script setup lang="ts">
import { ref, Ref, onMounted } from 'vue';
import { useUserStore } from 'src/stores/userStore';
import CommonInfo from 'src/components/CommonInfo.vue';
import UserGender from 'src/components/UserGender.vue';
import UserHobbies from 'src/components/UserHobbies.vue';


const userStore = useUserStore();

const pageTitle = ref<PageTitle>({ title: '', subtitle: '' });

const getTitle = (recievedTitle: PageTitle) => {
    pageTitle.value = recievedTitle;
}

const step = ref(1);
const stepsDone: Ref<{ [key: number]: boolean }> = ref({});

const nextStep = (currentStep: number) => {
    stepsDone.value[currentStep] = true;
    step.value = currentStep + 1;

}

onMounted(() => {
    if (!userStore.hobbies.length) {
        userStore.getHobbies();
    }
});
</script>



<template>
    <div class="profile grow flex flex-col">
        <div class="profile__details details grow flex flex-col gap-y-3">
            <div class="details__title">
                <TitleRow :title="pageTitle" />
            </div>
            <q-stepper v-model="step" header-nav ref="stepper" color="primary" animated
                class="grow flex flex-col gap-y-3">
                <q-step :name="1" :title="$t('Details')" icon="settings" :done="step > 1" :header-nav="step > 1"
                    class="step-common">

                    <CommonInfo @goToGender="nextStep(1)" @sendTitle="getTitle" />

                </q-step>

                <q-step :name="2" :title="$t('Gender.title')" icon="check_box" :done="step > 2" :header-nav="step > 2"
                    class="step-gender">

                    <UserGender @goToInterests="nextStep(2)" @sendTitle="getTitle" />

                    <q-stepper-navigation>
                        <CustomBtn type="button" @click="() => step = 1">{{ $t('Back') }}</CustomBtn>
                    </q-stepper-navigation>
                </q-step>

                <q-step :name="3" :title="$t('Hobbies')" icon="view_list" :header-nav="step > 3" class="step-hobbies">

                    <UserHobbies @goToHome="$router.push('/home')" @sendTitle="getTitle" />

                    <q-stepper-navigation>
                        <CustomBtn type="button" @click="() => step = 2">{{ $t('Back') }}</CustomBtn>
                    </q-stepper-navigation>
                </q-step>
            </q-stepper>
        </div>
    </div>
</template>
