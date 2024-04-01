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
                    console.log('localStorage: ', localData);
                    editedData = { ...localData, ...newUserData }; // Goes to the localStorage
                    this.user = { ...this.user, ...newUserData }; // Saving into the userStore
                    console.log('userStore: ', this.user);
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
                const userToken = JSON.parse(localStorage.currentUser).userToken;
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
