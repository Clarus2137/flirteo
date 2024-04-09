import { defineStore } from 'pinia';
import axios from 'axios';


const apiUrl = process.env.API_SERVER;
const apiSession = `${apiUrl}/api/sessions`;
const apiMessages = `${apiUrl}/api/messages`;
const apiPrompts = `${apiUrl}/api/prompts`;
const apiRespTypes = `${apiUrl}/api/response_types`;


export const useChatStore = defineStore('chat', {
    state: () => ({
        prompts: [] as Prompts[],
        respTypes: [] as ResponseAI[],
        session: {} as Partial<Session>,
        messages: [] as Partial<SessionMessages>[]
    }),

    actions: {
        async getPrompts() {
            try {
                const userToken = JSON.parse(localStorage.currentUser).userToken;
                const response = await axios.get(apiPrompts, {
                    headers: {
                        'Authorization': `Bearer ${userToken}`,
                        'Accept-Language': 'en'
                    }
                });
                // console.log('The prompts are: ', response.data);
                this.prompts = response.data;
                return true;
            } catch (error) {
                // if (axios.isAxiosError(error)) {
                //     console.error('Axios failed to get prompts', error);
                // } else {
                //     console.error('An unexpected error occurred', error);
                // }
                return false;
            }
        },

        async getResponseTypes() {
            try {
                const userToken = JSON.parse(localStorage.currentUser).userToken;
                const response = await axios.get(apiRespTypes, {
                    headers: {
                        'Authorization': `Bearer ${userToken}`,
                        'Accept-Language': 'pl'
                    }
                });
                // console.log('The response types are: ', response.data);
                this.respTypes = response.data
                return true;
            } catch (error) {
                // if (axios.isAxiosError(error)) {
                //     console.error('Axios failed to get response types', error);
                // } else {
                //     console.error('An unexpected error occurred', error);
                // }
                return false;
            }
        },

        getSessionOptions(options: Partial<Session>) {
            try {
                this.session = { ...this.session, ...options };
                return true;
            } catch (error) {
                return false;
            }
        },

        async createSession(message: Messages) {
            this.session = {
                ...this.session,
                messages: [message]
            }
            const userToken = JSON.parse(localStorage.currentUser).userToken;
            try {
                const response = await axios.post(apiSession, this.session, {
                    headers: {
                        'Authorization': `Bearer ${userToken}`,
                        'Accept-Language': 'en'
                    }
                });
                this.session.id = response.data.id;
                const answer = {
                    id: response.data.messages[0].id,
                    response: response.data.messages[0].response
                }
                this.messages[this.messages.length - 1] = { ...this.messages[this.messages.length - 1], ...answer };
                return true;
            } catch (error) {
                console.log(error);
                return false;
            }
        },

        async sendMessage(message: Messages) {
            const newMessage = {
                session: `${apiSession}/${this.session.id}`,
                content: message.content
            }
            try {
                const userToken = JSON.parse(localStorage.currentUser).userToken;
                const response = await axios.post(apiMessages, newMessage, {
                    headers: {
                        'Authorization': `Bearer ${userToken}`,
                        'Accept-Language': 'en'
                    }
                });
                const answer = {
                    id: response.data.id,
                    response: response.data.response
                }
                this.messages[this.messages.length - 1] = { ...this.messages[this.messages.length - 1], ...answer };
                return true;
            } catch (error) {
                console.log(error);
                return false;
            }
        }
    }
});
