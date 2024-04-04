<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useUserStore } from 'src/stores/userStore';
import CustomBtn from './UI/CustomBtn.vue';


const userStore = useUserStore();

const isVisible = ref(false);

const prompts = ref<Prompts[]>([]);
const respTypes = ref<ResponseAI[]>([]);
const places = ref<Places[]>([]);

const selectedPrompt = ref('');
const selectedPlace = ref('');
const selectedStyle = ref('');

const startChat = () => {
    isVisible.value = !isVisible.value;
}

const setPrompt = (promptPlaces: Places[], prompt: string) => {
    places.value = promptPlaces;
    selectedPrompt.value = prompt;
}

const setPlace = (place: string) => {
    selectedPlace.value = place;
}

const setStyle = (style: string) => {
    selectedStyle.value = style;
}

const buildSession = () => {
    const options = {
        prompt: selectedPrompt.value,
        place: selectedPlace.value,
        responseType: selectedStyle.value
    }
    userStore.setToSession(options);
}

onMounted(async () => {
    const isPrompts = await userStore.getPrompts();
    if (isPrompts) {
        prompts.value = userStore.prompts;
        // console.log(prompts);
    }

    const isTypes = await userStore.getResponseTypes();
    if (isTypes) {
        respTypes.value = userStore.respTypes;
        console.log(respTypes);
    }
});
</script>



<template>
    <div class="chat">
        <div class="chat__start flex" v-if="!isVisible">
            <p>Would you like to start a new conversation with your assistent?</p>
            <CustomBtn type="button" @click="startChat">Start</CustomBtn>
        </div>
        <div class="chat__options options" v-else>
            <div class="options__prompts prompts" v-if="selectedPrompt === ''">
                <div class="prompts__item prompt" v-for="prompt in prompts" :key="prompt.id">
                    <CustomBtn type="button" @click="setPrompt(prompt.places, prompt.name)">{{ prompt.id }} {{
            prompt.name }}
                    </CustomBtn>
                </div>
            </div>
            <div class="options__places places" v-if="selectedPlace === ''">
                <div class="places__item place" v-for="place in places" :key="place.id">
                    <CustomBtn @click="setPlace(place.name)">{{ place.name }}</CustomBtn>
                </div>
            </div>
            <div class="options__styles styles" v-if="selectedPlace !== ''">
                <div class="styles__item style" v-for="style in respTypes" :key="style.id">
                    <CustomBtn @click="setStyle(style.name)">{{ style.name }}</CustomBtn>
                </div>
            </div>
            <CustomBtn @click="buildSession" v-if="selectedStyle !== ''">Finish</CustomBtn>
        </div>
    </div>
</template>
