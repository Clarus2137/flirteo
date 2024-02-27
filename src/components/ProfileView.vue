<script setup lang="ts">

</script>



<template>
   <h1 class="lexend-bold leading-normal text-center capitalize">My profile</h1>
   <div class="profile__user user text-center">
      <div class="user__photo">
         <div class="inline-block mx-auto rounded-[50%] w-[100px] aspect-square"></div>
      </div>
      <div class="user__name lexend-bold text-lg">
         <p><span class="user__firstname">FiratName</span> <span class="user__lastname">LastName</span></p>
      </div>
      <div class="user__email lexend-light text-secondary text-sm">
         <p>user@email.com</p>
      </div>
   </div>
   <q-list class="profile__items grow">
      <q-item clickable v-ripple exact to="/info/details">
         <q-item-section avatar>
            <q-icon>
               <DetailsIcon />
            </q-icon>
         </q-item-section>
         <q-item-section>Profile Details</q-item-section>
         <q-item-section avatar>
            <q-icon class="q-icon-arrow">
               <ArrowTriangle />
            </q-icon>
         </q-item-section>
      </q-item>
      <q-item clickable v-ripple>
         <q-item-section avatar>
            <q-icon>
               <SettingsIcon />
            </q-icon>
         </q-item-section>
         <q-item-section>Settings</q-item-section>
         <q-item-section avatar>
            <q-icon class="q-icon-arrow">
               <ArrowTriangle />
            </q-icon>
         </q-item-section>
      </q-item>
      <q-item clickable v-ripple exact to="/terms">
         <q-item-section avatar>
            <q-icon>
               <TermsIcon />
            </q-icon>
         </q-item-section>
         <q-item-section>Terms & Conditions</q-item-section>
         <q-item-section avatar>
            <q-icon class="q-icon-arrow">
               <ArrowTriangle />
            </q-icon>
         </q-item-section>
      </q-item>
      <q-item clickable v-ripple exact to="/privacy">
         <q-item-section avatar>
            <q-icon>
               <PrivacyIcon />
            </q-icon>
         </q-item-section>
         <q-item-section>Privacy Policy</q-item-section>
         <q-item-section avatar>
            <q-icon class="q-icon-arrow">
               <ArrowTriangle />
            </q-icon>
         </q-item-section>
      </q-item>
      <q-item clickable v-ripple>
         <q-item-section avatar>
            <q-icon>
               <AboutIcon />
            </q-icon>
         </q-item-section>
         <q-item-section>About Us</q-item-section>
         <q-item-section avatar>
            <q-icon class="q-icon-arrow">
               <ArrowTriangle />
            </q-icon>
         </q-item-section>
      </q-item>
   </q-list>
   <CustomBtn class="flex justify-center items-center gap-x-2">
      <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
         <defs>
            <linearGradient id="gradient_primary" x1="0%" y1="0%" x2="100%" y2="100%">
               <stop offset="0%" style="stop-color:#ff84a7;stop-opacity:1" />
               <stop offset="100%" style="stop-color:#e03368;stop-opacity:1" />
            </linearGradient>
         </defs>
         <path
            d="M7.87828 12.07C7.87828 11.66 8.21828 11.32 8.62828 11.32H14.1083V2.86C14.0983 2.38 13.7183 2 13.2383 2C7.34828 2 3.23828 6.11 3.23828 12C3.23828 17.89 7.34828 22 13.2383 22C13.7083 22 14.0983 21.62 14.0983 21.14V12.81H8.62828C8.20828 12.82 7.87828 12.48 7.87828 12.07Z"
            fill="#fff" />
         <path
            d="M20.5416 11.5402L17.7016 8.69016C17.4116 8.40016 16.9316 8.40016 16.6416 8.69016C16.3516 8.98016 16.3516 9.46016 16.6416 9.75016L18.2016 11.3102H14.1016V12.8102H18.1916L16.6316 14.3702C16.3416 14.6602 16.3416 15.1402 16.6316 15.4302C16.7816 15.5802 16.9716 15.6502 17.1616 15.6502C17.3516 15.6502 17.5416 15.5802 17.6916 15.4302L20.5316 12.5802C20.8316 12.3002 20.8316 11.8302 20.5416 11.5402Z"
            fill="#fff" />
      </svg>
      Logout
   </CustomBtn>
</template>



<style scoped lang="scss">
.user__photo>* {
   box-shadow: inset 0 0 7px 1px $primary;
}
</style>