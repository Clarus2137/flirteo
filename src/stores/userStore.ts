// stores/users.ts
import { defineStore } from 'pinia';

// interface Interests {
//     name: string,
//     img: string | HTMLElement;
// }

interface User {
    email: string,
    plainPassword: string,
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
        createStoreUser(newUser: Partial<User>) {
            this.user = newUser;
        },

        addUserData(newUserData: Partial<User>) {
            this.user = { ...this.user, ...newUserData }
        },

        async registerUser(
            email: string,
            password: string,
            firstName: string,
            lastName: string,
            dateOfBirth: string,
            location: string,
            gender: string,
            interests: []
        ) {
            const apiUrl = process.env.API_SERVER;
            const endPoint = `${apiUrl}/api/users`;
            try {
                const response = await fetch(endPoint, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        "email": email,
                        "plainPassword": password,
                        "firstName": firstName,
                        "lastName": lastName,
                        "dateOfBirth": dateOfBirth,
                        "location": location,
                        "gender": gender,
                        "interests": interests,
                    }),
                });

                if (!response.ok) {
                    throw new Error('Failed to register user');
                }

                console.log('Registration successful');
            } catch (error) {
                console.error('Registration failed', error);
            }
        },
    },
});