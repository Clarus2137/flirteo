// stores/users.ts
import { defineStore } from 'pinia';
import axios from 'axios';


const apiUrl = process.env.API_SERVER;
const regUser = `${apiUrl}/api/users`;
const authUser = `${apiUrl}/auth`;
const apiUser = `${apiUrl}/api/users/me`;
const prompts = `${apiUrl}/api/prompts`;
const respTypes = `${apiUrl}/api/response_types`;

export const useUserStore = defineStore('user', {
    state: () => ({
        user: {} as Partial<User>,
        prompts: [] as Prompts[],
        respTypes: [] as ResponseAI[],
        session: {} as Session
    }),

    actions: {
        async registerUser(newUser: Partial<User>) {
            try {
                const response = await axios.post(regUser, newUser);

                // With Axios, checking response.ok is not needed, axios will throw an error if the status is not 2xx
                console.log('Registration successful', response.data); // Logging the response data
                return true;
            } catch (error) {
                // if (axios.isAxiosError(error)) {
                //   // Handling Axios errors specifically
                //   console.error('Registration failed', error.response?.data);
                // } else {
                //   // Handling unexpected errors
                //   console.error('An unexpected error occurred', error);
                // }
                return false;
            }
        },

        async authoriseUser(userAccount: Partial<User>): Promise<boolean> {
            try {
                const response = await axios.post(authUser, userAccount);
                console.log('Authorization successful', response.data);
                // localStorage.setItem('userToken', JSON.stringify(response.data.token));
                // localStorage.setItem('userData', JSON.stringify(response.data.user));
                const localUser = {
                    userToken: response.data.token,
                    userData: response.data.user
                }
                localStorage.setItem('currentUser', JSON.stringify(localUser));
                this.user = response.data.user;
                return true;
            } catch (error) {
                // if (axios.isAxiosError(error)) {
                //   // Handling Axios errors specifically
                //   console.error('Authorization failed', error.response?.data);
                // } else {
                //   // Handling unexpected errors
                //   console.error('An unexpected error occurred', error);
                // }
                return false;
            }
        },

        addUserData(newUserData: Partial<User>) {
            let editedData;
            try {
                const strLocalData = localStorage.getItem('currentUser');
                if (strLocalData === null) {
                    throw new Error('User\'s data doesn\'t exist');
                } else {
                    const localData = JSON.parse(strLocalData).userData;
                    editedData = { ...localData, ...newUserData }; // Goes to the localStorage
                    this.user = { ...this.user, ...newUserData }; // Saving into the userStore
                    // Building the object containing the edited user's data
                    const editedUser = {
                        userToken: JSON.parse(strLocalData).userToken,
                        userData: editedData
                    }
                    localStorage.setItem('currentUser', JSON.stringify(editedUser)); // Saving into the localStorage
                }
                return true;
            } catch (error) {
                console.error('Error reading or parsing user data:', error);
                return false;
            }
        },

        async updateUser(updatedUser: Partial<User>) {
            console.log('Sending Data is: ', updatedUser);
            try {
                const userToken = JSON.parse(localStorage.currentUser).userToken;
                const response = await axios.patch(apiUser, updatedUser, {
                    headers: {
                        'Authorization': `Bearer ${userToken}`
                    }
                });
                console.log('User updating successful', response.data);
                return true;
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    // Handling Axios errors specifically
                    console.error('User updating failed', error);
                } else {
                    // Handling unexpected errors
                    console.error('An unexpected error occurred', error);
                }

                return false;
            }
        },

        async removeUser() {
            try {
                const userToken = JSON.parse(localStorage.currentUser).userToken;
                const response = await axios.delete(apiUser, {
                    headers: {
                        'Authorization': `Bearer ${userToken}`
                    }
                });
                console.log('User removing successful', response.data);
                localStorage.clear();
                return true;
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    // Handling Axios errors specifically
                    console.error('User removing failed', error);
                } else {
                    // Handling unexpected errors
                    console.error('An unexpected error occurred', error);
                }

                return false;
            }
        },

        getStoreUserData(userData: Partial<User>) {
            this.user = userData;
        },

        async isUserExists() {
            try {
                const userToken = JSON.parse(localStorage.currentUser).userToken;
                const response = await axios.get(apiUser, {
                    headers: {
                        'Authorization': `Bearer ${userToken}`
                    }
                });
                console.log('User exists', response.data);
                return true;
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    // Handling Axios errors specifically
                    console.error('Axios failed to get Users\'s data', error);
                } else {
                    // Handling unexpected errors
                    console.error('An unexpected error occurred', error);
                }

                console.log('The User doesn\'t exist');
                return false;
            }
        },

        async getPrompts() {
            try {
                const userToken = JSON.parse(localStorage.currentUser).userToken;
                const response = await axios.get(prompts, {
                    headers: {
                        'Authorization': `Bearer ${userToken}`,
                        'Accept-Language': 'pl'
                    }
                });
                // console.log('The prompts are: ', response.data);
                this.prompts = response.data;
                return true;
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    // Handling Axios errors specifically
                    console.error('Axios failed to get prompts', error);
                } else {
                    // Handling unexpected errors
                    console.error('An unexpected error occurred', error);
                }
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
                if (axios.isAxiosError(error)) {
                    // Handling Axios errors specifically
                    console.error('Axios failed to get response types', error);
                } else {
                    // Handling unexpected errors
                    console.error('An unexpected error occurred', error);
                }
                return false;
            }
        },

        // async getPlaces() {
        //     try {
        //         const userToken = JSON.parse(localStorage.currentUser).userToken;
        //         const response = await axios.get(places, {
        //             headers: {
        //                 'Authorization': `Bearer ${userToken}`,
        //                 'Accept-Language': 'pl'
        //             }
        //         });
        //         console.log('The places are: ', response.data);

        //         return true;
        //     } catch (error) {
        //         if (axios.isAxiosError(error)) {
        //             // Handling Axios errors specifically
        //             console.error('Axios failed to get places', error);
        //         } else {
        //             // Handling unexpected errors
        //             console.error('An unexpected error occurred', error);
        //         }
        //         return false;
        //     }
        // }
    },
});
