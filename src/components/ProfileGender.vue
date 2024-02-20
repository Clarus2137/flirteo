<script setup lang="ts">



const chooseGender = () => {
   const genders = document.getElementsByClassName('gender__item');
}
</script>



<template>
   <div class="profile__gender gender flex flex-col items-center gap-y-6">
      <div class="gender__title w-full">
         <h1 class="headline lexend-bold capitalize">Select gender</h1>
         <p class="body-text lexend-light text-secondary">Please select your gender</p>
      </div>
      <div class="gender__items">
         <div
            class="gender__item gender__male p-8 rounded-2xl border border-solid border-inactive text-center hover:cursor-pointer">
            <svg width="62" height="61" viewBox="0 0 62 61" fill="#000" xmlns="http://www.w3.org/2000/svg">
               <circle cx="25" cy="36" r="25" />
               <path
                  d="M62 2C62 0.89543 61.1046 -4.79704e-07 60 -4.79704e-07H42C40.8954 -4.79704e-07 40 0.89543 40 2C40 3.10457 40.8954 4 42 4H58V20C58 21.1046 58.8954 22 60 22C61.1046 22 62 21.1046 62 20V2ZM44.4142 20.4142L61.4142 3.41421L58.5858 0.585786L41.5858 17.5858L44.4142 20.4142Z" />
            </svg>
            <p class="mt-4 text-xl">Male</p>
         </div>
         <div
            class="gender__item gender__female mt-8 p-8 rounded-2xl border border-solid border-inactive text-center hover:cursor-pointer">
            <svg width="50" height="66" viewBox="0 0 50 66" fill="#000" xmlns="http://www.w3.org/2000/svg" class="mx-auto">
               <circle cx="25" cy="25" r="25" />
               <path d="M25 50V66" stroke="#000" stroke-width="4" />
               <line x1="18" y1="60" x2="32" y2="60" stroke="#000" stroke-width="4" />
            </svg>
            <p class="mt-4 text-xl">Female</p>
         </div>
      </div>
   </div>
</template>