import { defineStore } from 'pinia';
import axios from 'axios';


const apiUrl = process.env.API_SERVER;
const session = `${apiUrl}/api/sessions`;
const messages = `${apiUrl}/api/messages`;
const prompts = `${apiUrl}/api/prompts`;
const respTypes = `${apiUrl}/api/response_types`;


export const useChatStore = defineStore('chat', {
    state: () => ({
        prompts: [] as Prompts[],
        respTypes: [] as ResponseAI[],
        session: {} as Partial<Session>
    }),

    actions: {
        async getPrompts() {
            try {
                const userToken = JSON.parse(localStorage.currentUser).userToken;
                const response = await axios.get(prompts, {
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
                const response = await axios.get(respTypes, {
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
            console.log(this.session);
            const userToken = JSON.parse(localStorage.currentUser).userToken;
            try {
                const response = await axios.post(session, this.session, {
                    headers: {
                        'Authorization': `Bearer ${userToken}`,
                        'Accept-Language': 'en'
                    }
                });
                this.session.id = response.data.id;
                console.log(response.data);
            } catch (error) {
                console.log(error);
            }
        },

        async sendMessage(message: Messages) {
            const newMessage = {
                session: `${session}/${this.session.id}`,
                content: message.content
            }
            try {
                const userToken = JSON.parse(localStorage.currentUser).userToken;
                const response = await axios.post(messages, newMessage, {
                    headers: {
                        'Authorization': `Bearer ${userToken}`,
                        'Accept-Language': 'en'
                    }
                });
                console.log(response.data);
                return true;
            } catch (error) {
                console.log(error);
                return false;
            }
        }
    }
});
