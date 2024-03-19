// stores/users.ts
import { defineStore } from 'pinia';
import axios from 'axios';

// interface Interests {
//     name: string,
//     img: string | HTMLElement;
// }

interface User {
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    dateOfBirth: string,
    location: string,
    gender: string,
    interests: string[]
}

export const useUserStore = defineStore('user', {
    state: () => ({
        user: {} as Partial<User>
    }),

    actions: {
        async registerUser(email: string, password: string) {
            // Assuming 'api' is previously defined and holds your API base URL
            const apiUrl = process.env.API_SERVER;
            const endPoint = `${apiUrl}/api/users`;
            try {
                // Using axios for the HTTP POST request
                const response = await axios.post(endPoint, {
                    email: email,
                    plainPassword: password,
                });

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

        async authoriseUser(email: string, password: string) {
            const apiUrl = process.env.API_SERVER;
            const endPoint = `${apiUrl}/auth`;
            try {
                const response = await axios.post(endPoint, {
                    email: email,
                    password: password,
                });

                console.log('Registration successful', response.data);
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

        createUser(newUser: Partial<User>) {
            this.user = newUser;
        },

        addUserData(newUserData: Partial<User>) {
            this.user = { ...this.user, ...newUserData }
        },
    },
});