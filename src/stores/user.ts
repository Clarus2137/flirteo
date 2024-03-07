// stores/users.ts
import { defineStore } from 'pinia';


interface Interests {
   name: string,
   img: string | HTMLElement
}

interface User {
   id: number,
   firstName: string,
   lastName: string,
   email: string,
   city: string,
   phone: string,
   dateOfBirth: string,
   gender: string,
   interests: Interests[],
   occupation: string,
   about: string
}

export const useUserStore = defineStore('user', {
   state: () => ({
      user: {} as Partial<User>
   }),
   actions: {
      generateId() {
         // Generate a random ID between 1 and 1,000,000
         return Math.floor(Math.random() * 1_000_000) + 1;
      },
      createUser(user: Partial<User>) {
         // Assign a unique ID to the new user
         const newUser = { ...user, id: this.generateId() };
         console.log(newUser);
         this.user = newUser;
         console.log(this.user);
      },
      updateUser(updatedUserData: Partial<User>) {
         // Update the user data with the new values
         this.user = { ...this.user, ...updatedUserData };
      },
   },
});