<script setup lang="ts">
import { ref, Ref, onMounted, onBeforeMount } from 'vue';
import { useChatStore } from 'src/stores/chatStore';


const chatStore = useChatStore();

const emit = defineEmits(['goToChat']);

const apiUrl = process.env.API_SERVER;
const promptsSource = `${apiUrl}/api/prompts/`;
const respTypesSource = `${apiUrl}/api/response_types/`;
const userID = JSON.parse(localStorage.currentUser).userData.id;
const userSource = `${apiUrl}/api/users/${userID}`;

const isOptions = ref(true);

const prompts = ref<Prompts[]>([]);
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
        console.log('File is not selected');
        return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
        const base64String = e.target?.result as string;
        screenshot.value = base64String.replace('data:image/jpeg;base64,', '');
    }
    reader.readAsDataURL(file);
}

const setStyle = (style: number) => {
    selectedStyle.value = style;
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

onBeforeMount(() => {
    console.log(chatStore.session);
});

onMounted(async () => {
    const isPrompts = await chatStore.getPrompts();
    if (isPrompts) {
        prompts.value = chatStore.prompts;
        // console.log(prompts);
    }

    const isTypes = await chatStore.getResponseTypes();
    if (isTypes) {
        respTypes.value = chatStore.respTypes;
    }
});
</script>



<template>
    <div class="chat">
        <h1 class="mb-8 lexend-bold text-2xl text-center">Please give the assistent some information</h1>
        <q-stepper v-model="step" vertical color="primary" animated v-if="isOptions">
            <q-step :name="1" title="Gender" icon="settings" :done="step > 1">
                <p class="body-text lexend-light text-secondary">Please choose the gender of the person you'd like to
                    chat with</p>
                <CustomBtn type="button" @click="selectedGender = 'male'; nextStep(1)">Male</CustomBtn>
                <CustomBtn type="button" @click="selectedGender = 'female'; nextStep(1)">Female</CustomBtn>
            </q-step>

            <q-step :name="2" title="Mode" icon="settings" :done="step > 2">
                <p class="body-text lexend-light text-secondary">Choose conversation mode</p>
                <CustomBtn type="button" v-for="prompt in prompts" :key="prompt.id"
                    @click="setPrompt(prompt.places, prompt.id); nextStep(2)">{{
                        prompt.name }}</CustomBtn>
                <q-stepper-navigation>
                    <q-btn flat @click="step = 1" color="primary" label="Back" class="q-ml-sm" />
                </q-stepper-navigation>
            </q-step>

            <q-step :name="3" title="Place" icon="settings" :done="step > 3">
                <p class="body-text lexend-light text-secondary">Where would you like to go together?</p>
                <CustomBtn type="button" v-for="place in places" :key="place.id" @click="setPlace(place.name)">{{
                    place.name }}
                </CustomBtn>
                <q-stepper-navigation>
                    <q-btn flat @click="step = 2" color="primary" label="Back" class="q-ml-sm" />
                </q-stepper-navigation>
            </q-step>

            <q-step :name="4" title="Example" icon="settings" :done="step > 4" :disable="selectedPrompt !== 1">
                <p class="body-text lexend-light text-secondary">Please give me some example of a conversation you have
                    already had. A screenshot is a perfect option.</p>
                <q-file clearable color="primary" standout bottom-slots v-model="model" label=".jpg, .png" counter
                    accept=".jpg, .png" @update:modelValue="convertToString">
                    <template v-slot:prepend>
                        <q-icon name="attach_file" />
                    </template>
                    <template v-slot:hint>
                        Required field
                    </template>
                </q-file>
                <CustomBtn type="button" v-if="model !== null" @click="nextStep(4)">Continue</CustomBtn>
                <q-stepper-navigation>
                    <q-btn flat @click="step = 3" color="primary" label="Back" class="q-ml-sm" />
                </q-stepper-navigation>
            </q-step>

            <q-step :name="5" title="Style" icon="settings" :done="step > 5">
                <p class="body-text lexend-light text-secondary">What kind of conversation do you need?</p>
                <CustomBtn type="button" v-for="style in respTypes" :key="style.id"
                    @click="setStyle(style.id); nextStep(5)">{{
                        style.name }}
                </CustomBtn>
                <q-stepper-navigation>
                    <q-btn flat @click="stepBack" color="primary" label="Back" class="q-ml-sm" />
                </q-stepper-navigation>
            </q-step>

            <q-step :name="6" title="Finish" icon="settings" class="last">
                <q-stepper-navigation class="w-full flex justify-center">
                    <q-btn color="primary" label="Finish" @click="buildOptions" />
                    <q-btn flat @click="step = 5" color="primary" label="Back" class="q-ml-sm" />
                </q-stepper-navigation>
            </q-step>
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
        row-gap: 15px;
    }

    .q-stepper__step-content {
        padding-left: 36px;
    }
}
</style>
