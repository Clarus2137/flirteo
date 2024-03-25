// stores/users.ts
import { defineStore } from 'pinia';
import axios from 'axios';


const apiUrl = process.env.API_SERVER;
const regUser = `${apiUrl}/api/users`;
const authUser = `${apiUrl}/auth`;
const updateUser = `${apiUrl}/api/users/me`;
const deleteUser = `${apiUrl}/api/users/me`;

export const useUserStore = defineStore('user', {
    state: () => ({
        user: {} as Partial<User>
    }),

    actions: {
        async registerUser(newUser: Partial<User>) {
            try {
                const response = await axios.post(regUser, newUser);

                // With Axios, checking response.ok is not needed, axios will throw an error if the status is not 2xx
                console.log('Registration successful', response.data); // Logging the response data
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    // Handling Axios errors specifically
                    console.error('Registration failed', error.response?.data);
                } else {
                    // Handling unexpected errors
                    console.error('An unexpected error occurred', error);
                }
            }
        },

        async authoriseUser(userAccount: Partial<User>): Promise<boolean> {
            try {
                const response = await axios.post(authUser, userAccount);

                console.log('Authorization successful', response.data);

                localStorage.setItem('userToken', JSON.stringify(response.data.token));
                localStorage.setItem('userData', JSON.stringify(response.data.user));
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

        addUserData(newUserData: Partial<User>) {
            let localData;

            try {
                const stringLocalData = localStorage.getItem('userData');
                if (stringLocalData === null) {
                    throw new Error('User\'s data doesn\'t exist');
                }
                localData = JSON.parse(stringLocalData);
                console.log('Добавляемые данные:', newUserData);
                localData = { ...localData, ...newUserData };
                console.log('Обновлённые данные:', localData);
                localStorage.setItem('userData', JSON.stringify(localData));
                console.log('Данные в localStorage:', JSON.parse(localStorage.userData));
                return true;
            } catch (error) {
                console.error('Error reading or parsing user data:', error);
                return false;
            }
        },

        async updateUser(updatedUser: Partial<User>) {
            try {
                const userToken = JSON.parse(localStorage.userToken);
                const response = await axios.patch(updateUser, updatedUser, {
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
                const userToken = JSON.parse(localStorage.userToken);
                const response = await axios.delete(deleteUser, {
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

        setStoreUserData(userData: Partial<User>) {
            this.user = userData;
        }
    },
});
