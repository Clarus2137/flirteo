<script setup lang="ts">
import { ref, Ref } from 'vue';
import CommonInfo from 'src/components/CommonInfo.vue';
import UserGender from 'src/components/UserGender.vue';
import UserHobbies from 'src/components/UserHobbies.vue';


const title = {
    title: 'Your information',
    subtitle: 'Please fill the fields below'
}

const step = ref<number>(1);
const stepsDone: Ref<{ [key: number]: boolean }> = ref({});

const nextStep = (currentStep: number) => {
    stepsDone.value[currentStep] = true;
    step.value = currentStep + 1;
}
</script>



<template>
    <div class="profile">
        <div class="profile__details details grid gap-y-10">
            <div class="details__title">
                <TitleRow :title="title" />
            </div>
            <q-stepper v-model="step" header-nav ref="stepper" color="primary" animated class="grid gap-y-10">
                <q-step :name="1" title="Details" icon="settings" :done="step > 1" :header-nav="step > 1">

                    <CommonInfo @goToGender="nextStep(1)" />

                </q-step>

                <q-step :name="2" title="Gender" icon="check_box" :done="step > 2" :header-nav="step > 2">

                    <UserGender @goToInterests="nextStep(2)" />

                    <q-stepper-navigation>
                        <CustomBtn type="button" @click="() => step = 1" class="mt-4">Back</CustomBtn>
                    </q-stepper-navigation>
                </q-step>

                <q-step :name="3" title="Hobbies" icon="view_list" :header-nav="step > 3">

                    <UserHobbies @goToHome="$router.push('/home')" />

                    <q-stepper-navigation>
                        <CustomBtn type="button" @click="() => step = 2" class="mt-2">Back</CustomBtn>
                    </q-stepper-navigation>
                </q-step>
            </q-stepper>
        </div>
    </div>
</template>
