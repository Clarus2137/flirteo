<script setup lang="ts">
import { ref, Ref, onMounted, onBeforeMount } from 'vue';
import { useUserStore } from 'src/stores/userStore';
import { useChatStore } from 'src/stores/chatStore';


const isDataLoading = ref(true);

const userStore = useUserStore();
const chatStore = useChatStore();

const emit = defineEmits(['goToChat', 'goToComplete']);

const apiUrl = process.env.API_SERVER;
const promptsSource = `${apiUrl}/api/prompts/`;
const respTypesSource = `${apiUrl}/api/response_types/`;
const userID = ref(0);
let userSource = '';

const isOptions = ref(true);
const isFinished = ref(false);

const prompts = ref<Prompts[]>([]);
const reversedPrompts = ref<Prompts[]>([]);
const respTypes = ref<ResponseAI[]>([]);
const places = ref<Places[]>([]);

const selectedPrompt = ref(0);
const selectedStyle = ref(0);
const selectedPlace = ref('');
const selectedGender = ref('');
const screenshot = ref('');

const step = ref(1);
const stepsDone: Ref<{ [key: number]: boolean }> = ref({});
const model = ref(null);


const nextStep = (currentStep: number) => {
    stepsDone.value[currentStep] = true;
    step.value = currentStep + 1;

}

const stepBack = () => {
    if (selectedPrompt.value === 1) {
        step.value = 4;
    } else {
        step.value = 3;
    }
    if (isFinished.value === true) { isFinished.value = false; }
}

const setPrompt = (promptPlaces: Places[], prompt: number) => {
    places.value = promptPlaces;
    selectedPrompt.value = prompt;
}

const setPlace = (place: string) => {
    selectedPlace.value = place;
    if (selectedPrompt.value === 1) {
        nextStep(3);
    } else {
        nextStep(4);
    }
}

const convertToString = (file: File) => {
    if (!file) {
        return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
        const base64String = e.target?.result as string;
        screenshot.value = base64String.replace('data:image/jpeg;base64,', '');
    }
    reader.readAsDataURL(file);
}

const buildOptions = () => {
    const options = {
        user: userSource,
        prompt: `${promptsSource}${selectedPrompt.value}`,
        responseType: `${respTypesSource}${selectedStyle.value}`,
        place: selectedPlace.value,
        gender: selectedGender.value
    }
    const image = screenshot.value;
    chatStore.getSessionOptions(options, image);
    emit('goToChat');
}

const setStyle = (style: number) => {
    selectedStyle.value = style;
    isFinished.value = true;
    buildOptions();
}

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

onBeforeMount(async () => {
    if (sessionStorage.getItem('userData') !== null) {
        if (JSON.parse(sessionStorage.userData).firstName === null) {
            emit('goToComplete');
        } else {
            await userStore.getUserData();
        }
    } else {
        await userStore.getUserData();
    }
    userID.value = JSON.parse(sessionStorage.userData).id;
    userSource = `${apiUrl}/api/users/${userID.value}`;
});

onMounted(async () => {
    const promises = [
        chatStore.getPrompts(),
        chatStore.getResponseTypes()
    ];

    const [isPrompts, isTypes] = await Promise.all(promises);

    if (isPrompts) {
        prompts.value = chatStore.prompts;
        reversedPrompts.value = prompts.value.slice().reverse();
    }

    if (isTypes) {
        respTypes.value = chatStore.respTypes;
    }

    toggleScreen();
});
</script>



<template>
    <div v-if="isDataLoading" ref="animatedScreen">
        <LoaderScreen />
    </div>
    <div class="chat flex flex-col justify-center" v-show="!isDataLoading" ref="animatedPage">
        <!-- <h1 class="mb-8 lexend-bold text-2xl text-center">{{ $t('Chat_Config_Title') }}</h1> -->
        <q-stepper v-model="step" vertical done-color="primary" active-color="primary" inactive-color="secondary"
            animated v-if="isOptions">
            <q-step :name="1" :title="$t('Gender.title')" icon="settings" :done="step > 1">
                <p class="body-text lexend-light text-secondary">{{ $t('Gender.hint') }}</p>
                <CustomBtn type="button" @click="selectedGender = 'male'; nextStep(1)" class="relative">
                    <img src="./../assets/user-male.png" alt="User Male" class="gender-avatar">
                    {{ $t('Male') }}
                </CustomBtn>
                <CustomBtn type="button" @click="selectedGender = 'female'; nextStep(1)" class="relative">
                    <img src="./../assets/user-female.png" alt="User Male" class="gender-avatar">
                    {{ $t('Female') }}
                </CustomBtn>
            </q-step>

            <q-step :name="2" :title="$t('Mode')" icon="settings" :done="step > 2">
                <p class="body-text lexend-light text-secondary">{{ $t('Mode_hint') }}</p>
                <CustomBtn type="button" v-for="prompt in reversedPrompts" :key="prompt.id"
                    @click="setPrompt(prompt.places, prompt.id); nextStep(2)">{{
                        prompt.name }}</CustomBtn>
                <q-stepper-navigation>
                    <q-btn flat @click="step = 1" color="primary" :label="$t('Back')" class="q-ml-sm" />
                </q-stepper-navigation>
            </q-step>

            <q-step :name="3" :title="$t('Place')" icon="settings" :done="step > 3">
                <p class="body-text lexend-light text-secondary">{{ $t('Place_hint') }}</p>
                <CustomBtn class="relative place__btn" type="button" v-for="place in places" :key="place.id"
                    @click="setPlace(place.name)">
                    <img class="place-avatar" :src="`${apiUrl}/uploads/icons/${place.icon}`" :alt="place.name">
                    {{ place.name }}
                </CustomBtn>
                <q-stepper-navigation>
                    <q-btn flat @click="step = 2" color="primary" :label="$t('Back')" class="q-ml-sm" />
                </q-stepper-navigation>
            </q-step>

            <q-step :name="4" :title="$t('Example')" icon="settings" :done="step > 4" :disable="selectedPrompt !== 1">
                <p class="body-text lexend-light text-secondary">{{ $t('Example_hint') }}</p>
                <q-file clearable color="primary" standout bottom-slots v-model="model" label=".jpg, .png" counter
                    accept="image/*" @update:modelValue="convertToString">
                    <template v-slot:prepend>
                        <q-icon name="attach_file" />
                    </template>
                    <template v-slot:hint>
                        {{ $t('Required_field') }}
                    </template>
                </q-file>
                <CustomBtn type="button" v-if="model !== null" @click="nextStep(4)">{{ $t('Continue') }}</CustomBtn>
                <q-stepper-navigation>
                    <q-btn flat @click="step = 3" color="primary" :label="$t('Back')" class="q-ml-sm" />
                </q-stepper-navigation>
            </q-step>

            <q-step :name="5" :title="$t('Style')" icon="settings" :done="step > 5">
                <p class="body-text lexend-light text-secondary">{{ $t('Style_hint') }}</p>
                <div class="w-full flex flex-col gap-4">
                    <CustomBtn type="button" v-for="style in respTypes" :key="style.id" @click="setStyle(style.id)">
                        {{
                            style.name }}
                    </CustomBtn>
                </div>
                <q-stepper-navigation>
                    <!-- <q-btn color="primary" :label="$t('Finish')" @click="buildOptions" v-if="isFinished" /> -->
                    <q-btn flat @click="stepBack" color="primary" :label="$t('Back')" class="q-ml-sm" />
                </q-stepper-navigation>
            </q-step>

            <!-- <q-step :name="6" :title="$t('Finish')" icon="settings" class="last">
                <q-stepper-navigation class="w-full flex justify-center">
                    <q-btn color="primary" :label="$t('Finish')" @click="buildOptions" />
                    <q-btn flat @click="step = 5" color="primary" :label="$t('Back')" class="q-ml-sm" />
                </q-stepper-navigation>
            </q-step> -->
        </q-stepper>
    </div>
</template>



<style lang="scss">
.chat {
    .q-stepper--vertical .q-stepper__tab {
        padding-left: 0;
        padding-right: 0;
    }

    .q-stepper__step.last {
        .q-stepper__step-content {
            padding: 0;
        }
    }

    .q-stepper__step-inner {
        display: flex;
        flex-wrap: wrap;
        row-gap: 1rem;
    }

    .q-stepper__step-content {
        padding-left: 36px;
    }
}
</style>

<style scoped lang="scss">
[class$="-avatar"] {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
}

.gender-avatar {
    max-height: 90%;
    left: 15%;
}

.place-avatar {
    max-width: 60px;
    max-height: 80%;
    left: 5%;
}

.q-dark {
    background: var(--q-dark-page);
}
</style>
