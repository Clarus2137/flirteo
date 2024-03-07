<script setup lang="ts">
import { ref } from 'vue';
import { useUserStore } from 'src/stores/user';


const title = {
   title: 'Create your account',
   subtitle: 'Please enter your e-mail & password to continue'
}

const validEmail = new RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);

const enteredEmail = ref('');

const isVisible = ref(false);

const checkEmail = (e: Event) => {
   if (!validEmail.test(enteredEmail.value)) {
      // Showing alarm if E-mail is invalid
      !isVisible.value ? isVisible.value = !isVisible.value : '';
      e.preventDefault();
   } else {
      // Hiding alarm if E-mail is valid
      isVisible.value ? isVisible.value = !isVisible.value : '';
   }
}

const userStore = useUserStore();

const createUser = () => {
   const newUser = {
      email: enteredEmail.value
   }

   userStore.createUser(newUser);

   enteredEmail.value = '';
}
</script>



<template>
   <BackBtn />
   <div class="email">
      <div class="email__title">
         <TitleRow :title="title" />
      </div>
      <form class="email__form mt-5" id="reg-account" @submit="checkEmail($event)">
         <CustomInput type="text" placeholder="example@domain.com" v-model="enteredEmail" required />
         <p class="text-center text-xs text-alarm font-bold duration-300"
            :class="{ 'opacity-100': isVisible, 'opacity-0': !isVisible }">
            Invalid E-mail
         </p>
         <CustomInput type="password" placeholder="Some password" />
         <CustomBtn type="submit" class="mt-5" @click="createUser(); $router.push('/info/general')">Continue</CustomBtn>
      </form>
   </div>
</template>