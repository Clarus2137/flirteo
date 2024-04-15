import { defineStore } from 'pinia';
import axios from 'axios';


const apiUrl = process.env.API_SERVER;
const regUser = `${apiUrl}/api/users`;
const authUser = `${apiUrl}/auth`;
const apiUser = `${apiUrl}/api/users/me`;
const apiHobbies = `${apiUrl}/api/interests`;


export const useUserStore = defineStore('user', {
    state: () => ({
        user: {} as Partial<User>,
        hobbies: [] as BaseInterests[]
    }),

    actions: {
        async registerUser(newUser: Partial<User>) {
            try {
                const response = await axios.post(regUser, newUser);

                // With Axios, checking response.ok is not needed, axios will throw an error if the status is not 2xx
                console.log('Registration successful', response.data); // Logging the response data
                return true;
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    // Handling Axios errors specifically
                    console.error('Registration failed', error.response?.data);
                } else {
                    // Handling unexpected errors
                    console.error('An unexpected error occurred', error);
                }
                return false;
            }
        },

        async authoriseUser(userAccount: Partial<User>): Promise<boolean> {
            try {
                const response = await axios.post(authUser, userAccount);
                console.log('Authorization successful', response.data);
                sessionStorage.setItem('userToken', response.data.token);
                sessionStorage.setItem('userData', JSON.stringify(response.data.user));
                this.user = response.data.user;
                return true;
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    // Handling Axios errors specifically
                    console.error('Authorization failed', error.response?.data);
                } else {
                    // Handling unexpected errors
                    console.error('An unexpected error occurred', error);
                }
                return false;
            }
        },

        async getHobbies() {
            const userToken = sessionStorage.getItem('userToken');
            if (userToken !== null) {
                try {
                    const response = await axios.get(apiHobbies, {
                        headers: {
                            'Authorization': `Bearer ${userToken}`,
                            'Accept-Language': 'en'
                        }
                    });
                    const defaultHobbies = response.data;
                    if (this.user.interests?.length) {
                        const activatedHobbies = defaultHobbies.map((item: { name: string }) => ({
                            name: item.name,
                            checked: this.user.interests?.includes(item.name) ? true : false
                        }));
                        this.hobbies = activatedHobbies;
                    } else {
                        defaultHobbies.forEach((item: { name: string; }) => {
                            const hobby = {
                                name: item.name,
                                checked: false
                            }
                            this.hobbies.push(hobby);
                        });
                    }
                } catch (error) {
                    if (axios.isAxiosError(error)) {
                        // Handling Axios errors specifically
                        console.error('Authorization failed', error.response?.data);
                    } else {
                        // Handling unexpected errors
                        console.error('An unexpected error occurred', error);
                    }
                }
            } else {
                console.log('User\'s data doesn\'t exist');
            }
        },

        addUserData(newUserData: Partial<User>) {
            try {
                const strUserData = sessionStorage.getItem('userData');
                if (strUserData === null) {
                    throw new Error('User\'s data doesn\'t exist');
                } else {
                    this.user = { ...this.user, ...newUserData };
                    sessionStorage.setItem('userData', JSON.stringify(this.user));
                }
                return true;
            } catch (error) {
                return false;
            }
        },

        async updateUser(updatedUser: Partial<User>) {
            console.log('Sending Data is: ', updatedUser);
            try {
                const userToken = sessionStorage.getItem('userToken');
                const response = await axios.patch(apiUser, updatedUser, {
                    headers: {
                        'Authorization': `Bearer ${userToken}`
                    }
                });
                console.log('User updating successful', response.data);
                return true;
            } catch (error) {
                // if (axios.isAxiosError(error)) {
                //     console.error('User updating failed', error);
                // } else {
                //     console.error('An unexpected error occurred', error);
                // }
                return false;
            }
        },

        async removeUser() {
            try {
                const userToken = sessionStorage.getItem('userToken');
                const response = await axios.delete(apiUser, {
                    headers: {
                        'Authorization': `Bearer ${userToken}`
                    }
                });
                console.log('User removing successful', response.data);
                this.user = {};
                this.hobbies = [];
                sessionStorage.clear();
                localStorage.clear();
                return true;
            } catch (error) {
                // if (axios.isAxiosError(error)) {
                //     console.error('User removing failed', error);
                // } else {
                //     console.error('An unexpected error occurred', error);
                // }
                return false;
            }
        },

        getStoreUserData(userData: Partial<User>) {
            this.user = userData;
        },

        // async isUserExists() {
        //     try {
        //         const userToken = sessionStorage.getItem('userToken');
        //         const response = await axios.get(apiUser, {
        //             headers: {
        //                 'Authorization': `Bearer ${userToken}`
        //             }
        //         });
        //         console.log('User exists', response.data);
        //         return true;
        //     } catch (error) {
        //         if (axios.isAxiosError(error)) {
        //             // console.error('Axios failed to get Users\'s data', error.response?.status);
        //             if (error.response?.status === 401) {
        //                 return 401;
        //             }
        //         } else {
        //             console.error('An unexpected error occurred', error);
        //         }
        //         return false;
        //     }
        // }
    },
});
