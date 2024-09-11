<script setup lang="ts">
import { ref, onBeforeMount, onMounted, watch, nextTick } from 'vue';
import { useChatStore } from 'src/stores/chatStore';


const emit = defineEmits(['goToHome', 'goToChatConfig', 'goToCatalog']);

const chatStore = useChatStore();
const isSessionStarted = ref(false);
const messageField = ref('');
const pageMessages = ref<Partial<SessionMessages>[]>([]);


const dialogTokens = ref(false);
const dialogSession = ref(false);
const backdropFilter = ref('');

const openDialogTokens = () => {
    dialogTokens.value = true;
    backdropFilter.value = 'blur(4px) saturate(150%)';
}

const openDialogSession = () => {
    dialogSession.value = true;
    backdropFilter.value = 'blur(4px) saturate(150%)';
}

const closeDialog = () => {
    dialogTokens.value = false;
    dialogSession.value = false;
    backdropFilter.value = '';
}


const scrollToBottom = () => {
    nextTick(() => {
        const allMessages = document.getElementById('messages');
        if (allMessages) {
            allMessages.scrollTop = allMessages.scrollHeight;
        }
    });
};

watch(pageMessages, () => {
    scrollToBottom();
}, {
    deep: true
});

const startSession = async (autoMessage: string) => {
    const isSuccess = await chatStore.createSession(autoMessage);
    if (isSuccess === true) {
        if (chatStore.session.messages && chatStore.session.messages.length > 0) {
            const answer = {
                id: chatStore.session.messages[0].id,
                response: chatStore.session.messages[0].response
            };
            pageMessages.value[pageMessages.value.length - 1] = { ...pageMessages.value[pageMessages.value.length - 1], ...answer };
            console.log('Answer on the page is: ', pageMessages.value[pageMessages.value.length - 1].response);
            isSessionStarted.value = true;
        }
    } else if (isSuccess === 403) {
        openDialogTokens();
    }
};

const sendNewMessage = async (newMessage: string) => {
    const isSuccess = await chatStore.sendMessage(newMessage);
    if (isSuccess === true) {
        if (chatStore.session.messages && chatStore.session.messages.length > 0) {
            const answer = {
                id: chatStore.session.messages[chatStore.session.messages.length - 1].id,
                response: chatStore.session.messages[chatStore.session.messages.length - 1].response
            };
            pageMessages.value[pageMessages.value.length - 1] = { ...pageMessages.value[pageMessages.value.length - 1], ...answer };
            console.log('Answer on the page is: ', pageMessages.value[pageMessages.value.length - 1].response);
        }
    } else if (isSuccess === 403) {
        openDialogTokens();
    }
};

const addMessage = () => {
    const newMessage = messageField.value;
    pageMessages.value.push({
        content: newMessage
    });
    messageField.value = '';
    if (isSessionStarted.value) {
        sendNewMessage(newMessage);
    } else {
        startSession(newMessage);
    }
};

const changeResponse = (responseOption: string) => {
    messageField.value = responseOption;
    addMessage();
}

const endSession = () => {
    chatStore.clearSession();
    pageMessages.value = [];
}

const buyTokensNow = () => {
    endSession();
    emit('goToCatalog');
}

const buyTokensLater = () => {
    endSession();
    emit('goToHome');
}

const startNewSession = () => {
    endSession();
    emit('goToChatConfig');
}

onBeforeMount(() => {
    if (chatStore.session.messages && chatStore.session.messages.length > 0 && !isSessionStarted.value) {
        isSessionStarted.value = true;
        pageMessages.value = [...chatStore.session.messages];
    }
});

onMounted(() => {
    console.log('ChatStore session is: ', chatStore.session);
    console.log('ChatStore messages are: ', chatStore.messages);
    if (!isSessionStarted.value) {
        isSessionStarted.value = true;
        const autoMessage = messageField.value;
        pageMessages.value.push({
            content: autoMessage
        });
        startSession(autoMessage);
    } else {
        scrollToBottom();
    }
});
</script>



<template>
    <div class="chat__body flex flex-col">
        <div class="control-btns px-[3vw] py-4 absolute left-0 right-0 z-10 shadow-md">
            <div class="control-btns-wrapper flex justify-between w-full max-w-[400px] mx-auto px-2">
                <CustomBtn class="!w-[48%]" type="button" @click="openDialogSession">{{
                    $t('New_Session.title') }}
                </CustomBtn>
                <q-btn-dropdown label="Inna odpowiedź" class="w-[48%] rounded-[10px] px-3 lexend-bold gradient-primary">
                    <q-list>
                        <q-item clickable v-close-popup @click="changeResponse('Przygotuj inną wersję')">
                            <q-item-section>
                                <CustomBtn type="button">Inna</CustomBtn>
                            </q-item-section>
                        </q-item>

                        <q-item clickable v-close-popup @click="changeResponse('Przygotuj podobną wersję')">
                            <q-item-section>
                                <CustomBtn type="button">Podobna</CustomBtn>
                            </q-item-section>
                        </q-item>

                        <q-item clickable v-close-popup @click="changeResponse('Przygotuj krótszą wersję')">
                            <q-item-section>
                                <CustomBtn type="button">Krótsza</CustomBtn>
                            </q-item-section>
                        </q-item>
                    </q-list>
                </q-btn-dropdown>
            </div>
        </div>
        <div class="grow px-2 pt-[72px] chat__messages messages" :class="{ 'auto-mes': isSessionStarted }"
            id="messages">
            <div class="messages__item" v-for="item in pageMessages" :key="item.id">
                <q-chat-message :name="$t('Me')" :text="[item.content]" sent />
                <q-chat-message name="Flirteo AI" bg-color="primary" text-color="white" v-if="!item.response">
                    <q-spinner-dots size="2rem" />
                </q-chat-message>
                <q-chat-message name="Flirteo AI" :text="[]" bg-color="primary" text-color="white" v-else>
                    <div v-html="item.response.split('\n').join('<br>')"></div>
                </q-chat-message>
            </div>
        </div>
        <form @submit.prevent="addMessage" class="chat__form form self-end w-full px-[3vw] py-2.5">
            <div class="form__wrapper flex no-wrap gap-x-3 max-w-[400px] mx-auto px-2">
                <CustomInput type="text" v-model="messageField" class="chat__input" />
                <button type="submit" class="send w-auto" :disabled="messageField === ''">
                    <svg width="42px" height="42px" viewBox="2 2 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <SvgGradient />
                        <SvgGradientHover />
                        <path
                            d="M16.19 2H7.81C4.17 2 2 4.17 2 7.81V16.18C2 19.83 4.17 22 7.81 22H16.18C19.82 22 21.99 19.83 21.99 16.19V7.81C22 4.17 19.83 2 16.19 2ZM8.47 8.98L11.47 5.98C11.54 5.91 11.62 5.86 11.71 5.82C11.89 5.74 12.1 5.74 12.28 5.82C12.37 5.86 12.45 5.91 12.52 5.98L15.52 8.98C15.81 9.27 15.81 9.75 15.52 10.04C15.37 10.19 15.18 10.26 14.99 10.26C14.8 10.26 14.61 10.19 14.46 10.04L12.74 8.32V14.51C12.74 14.92 12.4 15.26 11.99 15.26C11.58 15.26 11.24 14.92 11.24 14.51V8.32L9.52 10.04C9.23 10.33 8.75 10.33 8.46 10.04C8.17 9.75 8.18 9.28 8.47 8.98ZM18.24 17.22C16.23 17.89 14.12 18.23 12 18.23C9.88 18.23 7.77 17.89 5.76 17.22C5.37 17.09 5.16 16.66 5.29 16.27C5.42 15.88 5.85 15.66 6.24 15.8C9.96 17.04 14.05 17.04 17.77 15.8C18.16 15.67 18.59 15.88 18.72 16.27C18.84 16.67 18.63 17.09 18.24 17.22Z" />
                    </svg>
                </button>
            </div>
        </form>

        <q-dialog v-model="dialogTokens" :backdrop-filter="backdropFilter">
            <q-card class="max-w-[400px]">
                <q-card-section class="row items-center justify-center q-pb-none text-h6">
                    {{ $t('TokensOut') }}
                </q-card-section>

                <q-card-section>
                    {{ $t('TokensOut_Description') }}
                </q-card-section>

                <q-card-actions class="flex justify-between">
                    <q-btn flat :label="$t('Purchase')" color="primary" v-close-popup @click="buyTokensNow" />
                    <q-btn flat :label="$t('Later')" color="primary" v-close-popup @click="buyTokensLater" />
                </q-card-actions>
            </q-card>
        </q-dialog>

        <q-dialog v-model="dialogSession" :backdrop-filter="backdropFilter">
            <q-card class="max-w-[400px]">
                <q-card-section class="row items-center justify-center q-pb-none text-h6">
                    {{ $t('New_Session.confirm') }}
                </q-card-section>

                <q-card-section>
                    {{ $t('New_Session.desc') }}
                </q-card-section>

                <q-card-actions class="flex justify-between">
                    <q-btn flat :label="$t('Yes')" color="primary" v-close-popup @click="startNewSession" />
                    <q-btn flat :label="$t('No_I_will_continue')" color="primary" v-close-popup @click="closeDialog" />
                </q-card-actions>
            </q-card>
        </q-dialog>
    </div>
</template>



<style lang="scss">
.body--dark {
    .chat__body {

        .control-btns,
        .chat__form {
            background: var(--q-dark-page);
        }

        .chat__form {
            box-shadow: 0 0 10px 3px var(--q-dark-page);
        }

        .flrt-input {
            color: var(--q-dark-page);

            &:focus {
                color: #fff;
            }
        }
    }
}

.chat__body {
    .control-btns {
        background: #fff;

        button {
            padding: 0.5rem;
            font-size: 0.875rem;
            text-transform: none;

            &::before {
                box-shadow: none;
            }

            .q-icon {
                display: none;
            }
        }
    }

    .messages {
        max-height: calc(100vh - 98px);
        overflow-y: auto;

        &.auto-mes>.messages__item:first-child .q-message-sent {
            display: none;
        }
    }

    .chat__input {
        padding: 0.5rem;
        background: #eae9ea;

        &:focus {
            background: transparent;
            border-radius: 0;
            border-width: 0;
            border-bottom-width: 1px;
        }
    }

    .chat__form {
        background: #fff;
        box-shadow: 0 0 10px 3px rgba(0, 0, 0, .25);
        position: fixed;
        left: 50%;
        transform: translateX(-50%);
        bottom: 36px;
    }

    .send {
        padding: 0;

        path {
            fill: url(#gradient_primary);
        }

        @media (hover: hover) and (pointer: fine) {
            &:hover path {
                fill: url(#gradient_primary-hover);
            }
        }
    }
}

.q-menu {
    button {
        padding: 0.25rem 0.5rem;
        font-size: 0.875rem;
    }
}
</style>
