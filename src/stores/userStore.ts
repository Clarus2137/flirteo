import { defineStore } from 'pinia';
import axios from 'axios';
import { Router } from 'vue-router';


const apiUrl = process.env.API_SERVER;
const regUser = `${apiUrl}/api/users`;
const authUser = `${apiUrl}/auth`;
const apiUser = `${apiUrl}/api/users/me`;
const apiEducation = `${apiUrl}/api/education_levels`;
const apiResetPass = `${apiUrl}/api/reset-password/request`;
const apiSetNewPass = `${apiUrl}/api/reset-password/change`;


export const useUserStore = defineStore('user', {
    state: () => ({
        user: {} as Partial<User>,
        educationLevels: [] as Education[],
        userEducation: '' as any,
        lang: '',
        passToken: '',
        importedRouter: '' as any
    }),

    actions: {
        async registerUser(newUser: Partial<User>) {
            try {
                const response = await axios.post(regUser, newUser);
                console.log('Registration successful', response.data);
                return true;
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    console.error('Registration failed: ', error.response?.data);
                } else {
                    console.error('An unexpected error occurred', error);
                }
                return false;
            }
        },

        async authoriseUser(userAccount: Partial<User>): Promise<boolean> {
            try {
                const response = await axios.post(authUser, userAccount, {
                    headers: {
                        'Accept-Language': this.lang
                    }
                });
                localStorage.setItem('userToken', response.data.token);
                sessionStorage.setItem('userData', JSON.stringify(response.data.user));
                this.user = response.data.user;
                return true;
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    if (error.response?.data.code === 401) {
                        console.log(error.response.data.code);
                        return error.response.data.code;
                    }
                    // Handling Axios errors specifically
                    console.error('Authorization failed', error.response?.data);
                } else {
                    // Handling unexpected errors
                    console.error('An unexpected error occurred', error);
                }
                return false;
            }
        },

        async getEducation() {
            const userToken = localStorage.getItem('userToken');
            if (userToken !== null) {
                try {
                    const response = await axios.get(apiEducation, {
                        headers: {
                            'Authorization': `Bearer ${userToken}`,
                            'Accept-Language': this.lang
                        }
                    });
                    this.educationLevels = response.data;
                    return true;
                } catch (error) {
                    console.log(error);
                    return false;
                }
            }
        },

        addUserData(newUserData: Partial<User>) {
            try {
                this.user = { ...this.user, ...newUserData };
                return true;
            } catch (error) {
                return false;
            }
        },

        async updateUser(updatedUser: Partial<User>) {
            try {
                const userToken = localStorage.getItem('userToken');
                const response = await axios.patch(apiUser, updatedUser, {
                    headers: {
                        'Authorization': `Bearer ${userToken}`,
                        'Accept-Language': this.lang
                    }
                });
                this.user = { ...this.user, ...response.data };
                sessionStorage.setItem('userData', JSON.stringify(this.user));
                this.userEducation = this.user.educationLevel;
                return true;
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    console.error('User updating failed', error);
                } else {
                    console.error('An unexpected error occurred', error);
                }
                return false;
            }
        },

        async getUserData() {
            const userToken = localStorage.getItem('userToken');
            try {
                const response = await axios.get(apiUser, {
                    headers: {
                        'Authorization': `Bearer ${userToken}`,
                        'Accept-Language': this.lang
                    }
                });
                if (response.data.firstName !== null) {
                    this.user = { ...this.user, ...response.data };
                    sessionStorage.setItem('userData', JSON.stringify(this.user));
                    this.userEducation = this.user.educationLevel;
                    return true;
                } else {
                    return 'Not completed';
                }
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    if (error.response?.data.code === 401) {
                        console.log(error.response.data.code);
                        return error.response.data.code;
                    }
                    // Handling Axios errors specifically
                    console.error('Authorization failed', error.response?.data);
                } else {
                    // Handling unexpected errors
                    console.error('An unexpected error occurred', error);
                }
                return false;
            }
        },

        async removeUser() {
            const userToken = localStorage.getItem('userToken');
            try {
                const response = await axios.delete(apiUser, {
                    headers: {
                        'Authorization': `Bearer ${userToken}`
                    }
                });
                console.log(response.data);
                this.user = {};
                // this.hobbies = [];
                sessionStorage.clear();
                localStorage.removeItem('userToken');
                return true;
            } catch (error) {
                return false;
            }
        },

        getStoreUserData(userData: Partial<User>) {
            this.user = userData;
        },

        async resetPassword(email: string) {
            try {
                const userEmail = {
                    email: email
                }
                const response = await axios.post(apiResetPass, userEmail, {
                    headers: {
                        'Accept-Language': this.lang
                    }
                });
                console.log(response.data);
                return true;
            } catch (error) {
                return false;
            }
        },

        async setNewPassword(newPassword: string) {
            const userToken = localStorage.getItem('userToken');
            try {
                const response = await axios.post(apiSetNewPass, {
                    token: userToken,
                    plainPassword: newPassword,
                });
                console.log('Pasword Reseted', response.data);
                return true;
            } catch (error) {
                console.log('Password reset failed', error);
                return false;
            }
        },

        handleOpenURL(url: string) {
            setTimeout(() => {
                if (url.startsWith('flirteo://reset-password')) {
                    const token = url.split('/').pop() as string;
                    this.importedRouter.push({ name: 'reset', params: { token } });
                }
            }, 0);
        },

        setRouter(router: Router) {
            this.importedRouter = router;
        },

        setPassToken(token: string) {
            this.passToken = token;
        }
    },
});
