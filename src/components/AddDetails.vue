<script setup lang="ts">
import { ref } from 'vue';
import { useUsersStore } from 'src/stores/users';


const isVisible = ref(false);

const name = ref('');
const email = ref('');
const phone = ref('');
const dateOfBirth = ref('');
const address = ref('');

const usersStore = useUsersStore();

const createUser = () => {
   const newUser = {
      name: name.value,
      email: email.value,
      phone: phone.value,
      dateOfBirth: dateOfBirth.value,
      address: address.value
   }

   usersStore.addUser(newUser);

   name.value = '';
   email.value = '';
   phone.value = '';
   dateOfBirth.value = '';
   address.value = '';
}
</script>



<template>
   <div class="details__photo photo text-center">
      <div class="photo__img inline-block rounded-[50%] w-[100px] aspect-square"></div>
   </div>
   <div class="details__personal-data flex flex-col gap-y-3">
      <div class="name">
         <CustomInput id="name" type="text" v-model="name" />
         <label for="name">Name</label>
      </div>
      <div class="email">
         <CustomInput id="email" type="text" v-model="email" />
         <label for="email">Email</label>
      </div>
      <div class="phone">
         <CustomInput id="phone" type="text" v-model="phone" />
         <label for="phone">Mobile</label>
      </div>
      <div class="date">
         <CustomInput id="date" type="text" @click="isVisible = !isVisible" class="hover:cursor-pointer"
            v-model="dateOfBirth" />
         <label for="date">Date of birth</label>
      </div>
      <div class="address">
         <CustomInput id="address" type="text" v-model="address" />
         <label for="address">Address</label>
      </div>
   </div>
   <div class="w-full h-full absolute top-0 left-0 hover:cursor-pointer bg-black opacity-75"
      :class="{ 'hidden': !isVisible, 'block': isVisible }" @click="isVisible = !isVisible"></div>
   <div class="date-picker w-full text-center absolute duration-300" :class="{ 'visible': isVisible }">
      <q-date v-model="dateOfBirth" color="pink-4" text-color="black" class="w-full mb-3" />
      <CustomBtn type="submit" class="max-w-[200px]" @click="isVisible = !isVisible">Select</CustomBtn>
   </div>
   <router-link to="gender" @click="createUser"
      class="gradient-primary w-full text-white p-4.5 rounded-[10px] text-center">Continue</router-link>
</template>



<style scoped lang="scss">
.details__personal-data>* {
   position: relative;

   label {
      font-size: 0.75rem;
      line-height: 1;
      position: absolute;
      top: 5px;
      left: 20px;
   }

   input:active,
   input:focus {
      &+label {
         color: #f24e80;
      }
   }
}

[type="date"] {
   background: transparent;
   position: relative;

   &::-webkit-calendar-picker-indicator {
      opacity: 0;
   }

   &::after {
      content: "";
      display: block;
      width: 20px;
      height: 20px;
      background: url("../assets/calendar.svg") no-repeat;
      background-size: contain;
      position: absolute;
      top: 50%;
      right: 18px;
      transform: translateY(-50%);
      z-index: -1;
   }

   &:focus,
   &:active {
      &::after {
         background: url("../assets/calendar-active.svg") no-repeat;
      }
   }
}

.date-picker {
   top: 110%;
   left: 0;
   opacity: 0;

   &.visible {
      top: 50%;
      transform: translateY(-50%);
      opacity: 1;
   }
}
</style>src/stores/users