// stores/users.ts
import { defineStore } from 'pinia';

export const useUsersStore = defineStore('users', {
   state: () => ({
      users: [],
   }),
   actions: {
      generateId() {
         // Generate a random ID between 1 and 1,000,000
         return Math.floor(Math.random() * 1_000_000) + 1;
      },
      addUser(user) {
         // Assign a unique ID to the new user
         const newUser = { ...user, id: this.generateId() };
         this.users.push(newUser);
      },
   },
});