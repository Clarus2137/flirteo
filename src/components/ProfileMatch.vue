<script setup lang="ts">
import { useUserStore } from 'src/stores/userStore';
import { onMounted } from 'vue';


const title = {
   title: 'Ideal match',
   subtitle: 'What are you hoping to find here on sprout'
}

const userStore = useUserStore();

const activateMatch = () => {
   const matches = document.querySelectorAll('.match__item');
   matches.forEach(match => {
      match.addEventListener('click', () => {
         if (!match.classList.contains('active')) {
            match.classList.add('active');
         } else {
            match.classList.remove('active');
         }
      });
   })
}

// const sendUserData = async () => {
//    const userStore = useUserStore();
//    await userStore.registerUser(
//       userStore.user.email!,
//       userStore.user.password!
//    ); // Register the user
// }

onMounted(() => {
   console.log(userStore.user);
   activateMatch();
});
</script>



<template>
   <div class="profile__match match flex flex-col items-center gap-y-10">
      <div class="match__title w-full">
         <TitleRow :title="title" />
      </div>
      <div class="match__items w-full flex gap-y-8">
         <div class="match__item w-full p-2 rounded-lg">
            <div class="flex justify-center items-center w-12 h-12 rounded-xl gradient-primary">
               <svg width="60%" height="60%" viewBox="0 0 24 24" fill="#fff" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd"
                     d="M12 6.00019C10.2006 3.90317 7.19377 3.2551 4.93923 5.17534C2.68468 7.09558 2.36727 10.3061 4.13778 12.5772C5.60984 14.4654 10.0648 18.4479 11.5249 19.7369C11.6882 19.8811 11.7699 19.9532 11.8652 19.9815C11.9483 20.0062 12.0393 20.0062 12.1225 19.9815C12.2178 19.9532 12.2994 19.8811 12.4628 19.7369C13.9229 18.4479 18.3778 14.4654 19.8499 12.5772C21.6204 10.3061 21.3417 7.07538 19.0484 5.17534C16.7551 3.2753 13.7994 3.90317 12 6.00019Z" />
               </svg>
            </div>
            <div class="match__title inline-block">
               <p class="match__headline text-lg lexend-bold mb-1">Love</p>
               <p class="match__tagline text-base text-secondary lexend-light">You're not on here to play around</p>
            </div>
         </div>
         <div class="match__item w-full p-2 rounded-lg">
            <div class="flex justify-center items-center w-12 h-12 rounded-xl gradient-primary">
               <svg fill="#fff" width="60%" height="60%" viewBox="0 -64 640 640" xmlns="http://www.w3.org/2000/svg">
                  <path
                     d="M192 256c61.9 0 112-50.1 112-112S253.9 32 192 32 80 82.1 80 144s50.1 112 112 112zm76.8 32h-8.3c-20.8 10-43.9 16-68.5 16s-47.6-6-68.5-16h-8.3C51.6 288 0 339.6 0 403.2V432c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48v-28.8c0-63.6-51.6-115.2-115.2-115.2zM480 256c53 0 96-43 96-96s-43-96-96-96-96 43-96 96 43 96 96 96zm48 32h-3.8c-13.9 4.8-28.6 8-44.2 8s-30.3-3.2-44.2-8H432c-20.4 0-39.2 5.9-55.7 15.4 24.4 26.3 39.7 61.2 39.7 99.8v38.4c0 2.2-.5 4.3-.6 6.4H592c26.5 0 48-21.5 48-48 0-61.9-50.1-112-112-112z" />
               </svg>
            </div>
            <div class="match__title inline-block">
               <p class="match__headline text-lg lexend-bold mb-1">Friends</p>
               <p class="match__tagline text-base text-secondary lexend-light">I want to meet new people</p>
            </div>
         </div>
         <div class="match__item w-full p-2 rounded-lg">
            <div class="flex justify-center items-center w-12 h-12 rounded-xl gradient-primary">
               <svg width="60%" height="60%" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none">
                  <path fill="#fff" fill-rule="evenodd"
                     d="M11 3a3 3 0 0 0-3 3v1H5a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3v-8a3 3 0 0 0-3-3h-3V6a3 3 0 0 0-3-3h-2zm3 4h-4V6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v1z"
                     clip-rule="evenodd" />
               </svg>
            </div>
            <div class="match__title inline-block">
               <p class="match__headline text-lg lexend-bold mb-1">Business</p>
               <p class="match__tagline text-base text-secondary lexend-light">Meet business oriented people</p>
            </div>
         </div>
      </div>
      <!-- <CustomBtn type="button" @click="sendUserData; $router.push('/home')">Continue</CustomBtn> -->
      <CustomBtn type="button">Continue</CustomBtn>
   </div>
</template>



<style scoped lang="scss">
.match__item {
   display: grid;
   grid-template-columns: auto 1fr;
   align-items: center;
   column-gap: 15px;
   box-shadow: 0 0 50px 20px rgba(225, 231, 231, .6);

   &.active {
      box-shadow: 0 0 50px 20px rgba(225, 231, 231, .6),
         inset 0 0 1px 1px $primary;
   }

   &:hover {
      cursor: pointer;
   }
}
</style>