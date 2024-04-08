<script setup lang="ts">
import { ref } from 'vue';
import { useChatStore } from 'src/stores/chatStore'

const chatStore = useChatStore();

const messages = ref<SessionMessages[]>([]);

const isFirst = ref(true);

const userMessage = ref('');

const handleSubmit = async (e: Event) => {
    e.preventDefault();
    const message: Messages = {
        content: userMessage.value,
        attachment: ''
    }
    if (!isFirst.value) {
        const isSent = await chatStore.sendMessage(message);
        if (isSent) {
            messages.value = chatStore.messages;
        }
    } else {
        const isCreated = await chatStore.createSession(message);
        if (isCreated) {
            isFirst.value = !isFirst.value;
            messages.value = chatStore.messages;
        }
    }
}

console.log(chatStore.messages);
</script>



<template>
    <div class="chat__body grid">
        <div class="chat__messages">
            <div class="message" v-for="item in messages" :key="item.id">
                <q-chat-message name="me" :text="[item.content]" sent />
                <q-chat-message name="Jane" :text="[item.response]" />
            </div>
        </div>
        <form @submit="handleSubmit" class="self-end flex no-wrap gap-x-3">
            <CustomInput type="text" v-model="userMessage" class="chat__input" />
            <button type="submit" class="send w-auto" v-if="isFirst">
                <svg width="54px" height="54px" viewBox="2 2 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <linearGradient id="gradient_primary" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" style="stop-color:#ff84a7;stop-opacity:1" />
                            <stop offset="100%" style="stop-color:#e03368;stop-opacity:1" />
                        </linearGradient>
                        <linearGradient id="gradient_primary-hover" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" style="stop-color:#e03368;stop-opacity:1" />
                            <stop offset="100%" style="stop-color:#ff84a7;stop-opacity:1" />
                        </linearGradient>
                    </defs>
                    <path
                        d="M16.19 2H7.81C4.17 2 2 4.17 2 7.81V16.18C2 19.83 4.17 22 7.81 22H16.18C19.82 22 21.99 19.83 21.99 16.19V7.81C22 4.17 19.83 2 16.19 2ZM8.47 8.98L11.47 5.98C11.54 5.91 11.62 5.86 11.71 5.82C11.89 5.74 12.1 5.74 12.28 5.82C12.37 5.86 12.45 5.91 12.52 5.98L15.52 8.98C15.81 9.27 15.81 9.75 15.52 10.04C15.37 10.19 15.18 10.26 14.99 10.26C14.8 10.26 14.61 10.19 14.46 10.04L12.74 8.32V14.51C12.74 14.92 12.4 15.26 11.99 15.26C11.58 15.26 11.24 14.92 11.24 14.51V8.32L9.52 10.04C9.23 10.33 8.75 10.33 8.46 10.04C8.17 9.75 8.18 9.28 8.47 8.98ZM18.24 17.22C16.23 17.89 14.12 18.23 12 18.23C9.88 18.23 7.77 17.89 5.76 17.22C5.37 17.09 5.16 16.66 5.29 16.27C5.42 15.88 5.85 15.66 6.24 15.8C9.96 17.04 14.05 17.04 17.77 15.8C18.16 15.67 18.59 15.88 18.72 16.27C18.84 16.67 18.63 17.09 18.24 17.22Z" />
                </svg>

            </button>
            <CustomBtn type="submit" v-else>Send</CustomBtn>
        </form>
    </div>
</template>



<style scoped lang="scss">
.chat__body {
    .chat__input {
        background: #eae9ea;

        &:focus {
            background: transparent;
            border-radius: 0;
            border-width: 0;
            border-bottom-width: 1px;
        }
    }

    .send {
        padding: 0;

        path {
            fill: url(#gradient_primary);
        }

        &:hover path {
            fill: url(#gradient_primary-hover);
        }
    }
}
</style>
