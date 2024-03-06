<script setup lang="ts">

</script>



<template>
   <div class="favorite flex justify-between content-start gap-3">
      <div class="favorite__item user">
         <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
            <path fill="none" stroke="#989394" stroke-width="5"
               d="M512 512a192 192 0 1 0 0-384 192 192 0 0 0 0 384zm0 64a256 256 0 1 1 0-512 256 256 0 0 1 0 512zm320 320v-96a96 96 0 0 0-96-96H288a96 96 0 0 0-96 96v96a32 32 0 1 1-64 0v-96a160 160 0 0 1 160-160h448a160 160 0 0 1 160 160v96a32 32 0 1 1-64 0z" />
         </svg>
         <div class="user__info">
            <p class="lexend-bold">UserName, <span>age</span></p>
            <p class="lexend-light text-secondary text-sm">Occupation</p>
         </div>
      </div>
      <div class="favorite__item user">
         <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
            <path fill="none" stroke="#989394" stroke-width="5"
               d="M512 512a192 192 0 1 0 0-384 192 192 0 0 0 0 384zm0 64a256 256 0 1 1 0-512 256 256 0 0 1 0 512zm320 320v-96a96 96 0 0 0-96-96H288a96 96 0 0 0-96 96v96a32 32 0 1 1-64 0v-96a160 160 0 0 1 160-160h448a160 160 0 0 1 160 160v96a32 32 0 1 1-64 0z" />
         </svg>
         <div class="user__info">
            <p class="lexend-bold">UserName, <span>age</span></p>
            <p class="lexend-light text-secondary text-sm">Occupation</p>
         </div>
      </div>
      <div class="favorite__item user">
         <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
            <path fill="none" stroke="#989394" stroke-width="5"
               d="M512 512a192 192 0 1 0 0-384 192 192 0 0 0 0 384zm0 64a256 256 0 1 1 0-512 256 256 0 0 1 0 512zm320 320v-96a96 96 0 0 0-96-96H288a96 96 0 0 0-96 96v96a32 32 0 1 1-64 0v-96a160 160 0 0 1 160-160h448a160 160 0 0 1 160 160v96a32 32 0 1 1-64 0z" />
         </svg>
         <div class="user__info">
            <p class="lexend-bold">UserName, <span>age</span></p>
            <p class="lexend-light text-secondary text-sm">Occupation</p>
         </div>
      </div>
      <div class="favorite__item user">
         <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
            <path fill="none" stroke="#989394" stroke-width="5"
               d="M512 512a192 192 0 1 0 0-384 192 192 0 0 0 0 384zm0 64a256 256 0 1 1 0-512 256 256 0 0 1 0 512zm320 320v-96a96 96 0 0 0-96-96H288a96 96 0 0 0-96 96v96a32 32 0 1 1-64 0v-96a160 160 0 0 1 160-160h448a160 160 0 0 1 160 160v96a32 32 0 1 1-64 0z" />
         </svg>
         <div class="user__info">
            <p class="lexend-bold">UserName, <span>age</span></p>
            <p class="lexend-light text-secondary text-sm">Occupation</p>
         </div>
      </div>
   </div>
</template>



<style scoped lang="scss">
.user {
   width: 48%;
   border-radius: 30px;
   box-shadow: inset 0 0 7px 1px $primary;
   position: relative;

   .user__info {
      width: 100%;
      padding: 12px;
      position: absolute;
      left: 0;
      bottom: 5px;
   }
}
</style>