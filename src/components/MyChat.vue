<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useUserStore } from 'src/stores/userStore';


const userStore = useUserStore();

const isVisible = ref(false);

const startChat = () => {
    isVisible.value = !isVisible.value;
}

const prompts = ref<Prompts[]>([]);

onMounted(async () => {
    const isPrompts = await userStore.getPrompts();
    if (isPrompts) {
        prompts.value = userStore.prompts;
        console.log(prompts);
    }
});
</script>



<template>
    <div class="chat">
        <div class="chat__start flex" v-if="!isVisible">
            <p>Would you like to start a new conversation with your assistent?</p>
            <CustomBtn type="button" @click="startChat">Start</CustomBtn>
        </div>
        <div class="chat__prompts" v-else>
            <div class="prompt" v-for="prompt in prompts" :key="prompt.id">
                <CustomBtn type="button">{{ prompt.name }}</CustomBtn>
            </div>
        </div>
    </div>
</template>
