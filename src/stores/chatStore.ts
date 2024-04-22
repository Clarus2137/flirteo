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
        messages: [] as Partial<SessionMessages>[],
        image: ''
    }),

    actions: {
        async getPrompts() {
            try {
                const userToken = sessionStorage.getItem('userToken');
                const response = await axios.get(apiPrompts, {
                    headers: {
                        'Authorization': `Bearer ${userToken}`,
                        'Accept-Language': 'en'
                    }
                });
                this.prompts = response.data;
                console.log(this.prompts);
                return true;
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    console.error('Axios failed to get prompts', error);
                } else {
                    console.error('An unexpected error occurred', error);
                }
                return false;
            }
        },

        async getResponseTypes() {
            try {
                const userToken = sessionStorage.getItem('userToken');
                const response = await axios.get(apiRespTypes, {
                    headers: {
                        'Authorization': `Bearer ${userToken}`,
                        'Accept-Language': 'pl'
                    }
                });
                this.respTypes = response.data
                return true;
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    console.error('Axios failed to get response types', error);
                } else {
                    console.error('An unexpected error occurred', error);
                }
                return false;
            }
        },

        getSessionOptions(options: Partial<Session>, image: string) {
            try {
                this.session = { ...this.session, ...options };
                this.image = image;
                return true;
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    console.error('Axios failed to get options for the new session', error);
                } else {
                    console.error('An unexpected error occurred', error);
                }
                return false;
            }
        },

        async createSession(message: string) {
            this.session = {
                ...this.session,
                messages: [{
                    content: message,
                    attachment: this.image
                }]
            }
            const userToken = sessionStorage.getItem('userToken');
            try {
                const response = await axios.post(apiSession, this.session, {
                    headers: {
                        'Authorization': `Bearer ${userToken}`,
                        'Accept-Language': 'en'
                    }
                });
                this.session = response.data;
                return true;
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    console.error('Axios failed to create the new session', error);
                } else {
                    console.error('An unexpected error occurred', error);
                }
                return false;
            }
        },

        async sendMessage(message: string) {
            const newMessage = {
                session: `${apiSession}/${this.session.id}`,
                content: message
            }
            try {
                const userToken = sessionStorage.getItem('userToken');
                const response = await axios.post(apiMessages, newMessage, {
                    headers: {
                        'Authorization': `Bearer ${userToken}`,
                        'Accept-Language': 'en'
                    }
                });
                this.session = { ...this.session, ...{ updatedAt: response.data.updatedAt } };
                if (this.session.messages && this.session.messages.length > 0) {
                    this.session.messages.push({
                        id: response.data.id,
                        content: response.data.content,
                        attachment: '',
                        response: response.data.response
                    });
                }
                return true;
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    console.error('Axios failed to add the new message to the session', error);
                } else {
                    console.error('An unexpected error occurred', error);
                }
                return false;
            }
        }
    }
});
