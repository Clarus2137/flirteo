<script setup lang="ts">
import PrivacyAndTerms from './PrivacyAndTerms.vue';


const title = {
   title: 'Sign Up to Continue',
   subtitle: 'Please login to continue'
}

const emit = defineEmits(['goToEmailEntering'])

const goToEmailEntering = () => {
   emit('goToEmailEntering');
}
</script>



<template>
   <div class="reg flex justify-center">
      <div class="reg__body self-center flex justify-center items-between gap-y-[60px]">
         <div class="reg__logo logo">
            <svg class="mx-auto" width="84" height="68" viewBox="0 0 84 68" fill="none" xmlns="http://www.w3.org/2000/svg">
               <path
                  d="M67.2734 2.22895C56.9068 -3.57349 50.4525 9.52311 47.1864 19.4967H36.6125C33.3465 9.52311 26.8922 -3.57349 16.5256 2.22895C0.5 11.1988 0.5 65.0528 0.5 65.0528C0.5 65.0528 5.84187 65.1099 8.51281 56.8898C8.20648 61.2363 9.70321 64.7983 11.1837 67.5735C14.7546 66.1424 17.7098 61.606 20.532 56.6828C20.8462 58.3647 21.7363 60.8498 22.4184 62.1282C26.1477 60.6336 29.9471 56.814 32.8175 51.5479H50.9817C53.8519 56.814 57.6515 60.6336 61.3816 62.1282C62.0636 60.8498 62.9537 58.3647 63.268 56.6828C66.0902 61.606 69.0454 66.1424 72.6163 67.5735C74.0968 64.7983 75.5935 61.2363 75.2872 56.8898C77.9581 65.1096 83.3 65.0528 83.3 65.0528C83.3 65.0528 83.299 11.1988 67.2734 2.22895Z"
                  fill="#E03368" fill-opacity="0.1" />
               <path
                  d="M55.184 11.4839C52.4215 11.477 49.7123 12.2447 47.3642 13.6998C45.016 15.155 43.1228 17.2394 41.8996 19.7163C40.6763 17.2394 38.7831 15.155 36.4349 13.6998C34.0868 12.2447 31.3777 11.477 28.6152 11.4839C20.4631 11.4839 13.8547 18.0236 13.8547 26.0906C13.8547 45.0793 41.8996 58.2253 41.8996 58.2253C41.8996 58.2253 69.9444 45.0793 69.9444 26.0906C69.9444 18.0236 63.336 11.4839 55.184 11.4839Z"
                  fill="url(#paint0_linear_2_3574)" />
               <defs>
                  <linearGradient id="paint0_linear_2_3574" x1="13.8547" y1="11.4839" x2="59.8299" y2="66.654"
                     gradientUnits="userSpaceOnUse">
                     <stop stop-color="#FF84A7" />
                     <stop offset="1" stop-color="#E03368" />
                  </linearGradient>
               </defs>
            </svg>
            <p class="brand-name mt-[6px] pacifico-regular text-4xl text-gradient-primary">Flirteo</p>
         </div>
         <div class="reg__form form w-full flex gap-y-[30px]">
            <div class="form__title justify-center title-center">
               <TitleRow :title="title" />
            </div>
            <CustomBtn @click="goToEmailEntering">Continue with Email</CustomBtn>
            <div class="choice flex justify-between items-center">
               <hr class="w-[110px] h-px">
               <p class="lexend-light text-sm">or Sign Up with</p>
               <hr class="w-[110px] h-px">
            </div>
            <div class="reg__outside outside flex justify-between">
               <q-btn class="outside__item w-[49%]" padding="13px 25px" color="white" text-color="black">
                  <q-icon>
                     <svg width="19" height="20" viewBox="0 0 19 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd"
                           d="M18.7497 10.2088C18.7497 9.55706 18.6912 8.93036 18.5825 8.32874H9.92578V11.8842H14.8725C14.6594 13.0331 14.0118 14.0066 13.0384 14.6584V16.9646H16.0089C17.7469 15.3644 18.7497 13.0081 18.7497 10.2088Z"
                           fill="#4285F4" />
                        <path fill-rule="evenodd" clip-rule="evenodd"
                           d="M9.9258 19.1916C12.4075 19.1916 14.4881 18.3685 16.0089 16.9647L13.0384 14.6585C12.2153 15.21 11.1625 15.5359 9.9258 15.5359C7.53182 15.5359 5.50551 13.919 4.78272 11.7465H1.71191V14.1279C3.22434 17.1319 6.33275 19.1916 9.9258 19.1916Z"
                           fill="#34A853" />
                        <path fill-rule="evenodd" clip-rule="evenodd"
                           d="M4.78283 11.7463C4.599 11.1948 4.49455 10.6057 4.49455 9.9999C4.49455 9.3941 4.599 8.805 4.78283 8.25351V5.87207H1.71202C1.0895 7.11293 0.734375 8.51672 0.734375 9.9999C0.734375 11.4831 1.0895 12.8869 1.71202 14.1277L4.78283 11.7463Z"
                           fill="#FBBC05" />
                        <path fill-rule="evenodd" clip-rule="evenodd"
                           d="M9.9258 4.46419C11.2753 4.46419 12.4869 4.92795 13.4395 5.83875L16.0758 3.20245C14.484 1.71927 12.4033 0.808472 9.9258 0.808472C6.33275 0.808472 3.22434 2.86821 1.71191 5.87217L4.78272 8.25361C5.50551 6.08107 7.53182 4.46419 9.9258 4.46419Z"
                           fill="#EA4335" />
                     </svg>
                  </q-icon>
                  <label class="ml-[13px] text-base">Google</label>
               </q-btn>
               <q-btn class="outside__item w-[49%]" padding="13px 25px" color="white" text-color="black">
                  <q-icon>
                     <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                           d="M0.25 12C0.25 18.6274 5.62258 24 12.25 24C18.8774 24 24.25 18.6274 24.25 12C24.25 5.37258 18.8774 0 12.25 0C5.62258 0 0.25 5.37258 0.25 12Z"
                           fill="#1877F2" />
                        <path
                           d="M18.25 12C18.25 8.7 15.55 6 12.25 6C8.95 6 6.25 8.7 6.25 12C6.25 15 8.425 17.475 11.275 17.925V13.725H9.775V12H11.275V10.65C11.275 9.15 12.175 8.325 13.525 8.325C14.2 8.325 14.875 8.475 14.875 8.475V9.975H14.125C13.375 9.975 13.15 10.425 13.15 10.875V12H14.8L14.5 13.725H13.075V18C16.075 17.55 18.25 15 18.25 12Z"
                           fill="white" />
                     </svg>
                  </q-icon>
                  <label class="ml-[10px] text-base">Facebook</label>
               </q-btn>
            </div>
         </div>
      </div>
   </div>
   <PrivacyAndTerms />
</template>



<style scoped lang="scss">
.reg {
   flex-grow: 1;

   .reg__form>* {
      width: 100%;
   }

   .choice>hr {
      color: rgba(216, 216, 216, .6);
   }

   .outside__item {
      background: none !important;
      border-radius: 10px;
      border: 1px solid rgba(152, 147, 148, .2);
      text-transform: none;

      &::before {
         box-shadow: none;
      }
   }
}
</style>