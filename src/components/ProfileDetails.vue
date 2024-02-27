<script setup lang="ts">
import { ref } from 'vue';


const title = {
   title: 'Add profile details',
   subtitle: 'Please add your profile detrails here'
}

const date = ref('');

const isVisible = ref(false);



</script>



<template>
   <div class="profile__details details flex flex-col items-center gap-y-6">
      <div class="details__title w-full" :class="{ 'blur': isVisible }">
         <TitleRow :title="title" />
      </div>
      <div class="details__photo photo" :class="{ 'blur': isVisible }">
         <div class="photo__img w-20 h-20 mx-auto rounded-2xl bg-primary-400"></div>
      </div>
      <div class="details__personal-data flex flex-col gap-y-3 w-full" :class="{ 'blur': isVisible }">
         <div class="name">
            <CustomInput id="name" type="text" />
            <label for="name">Name</label>
         </div>
         <div class="email">
            <CustomInput id="email" type="email" />
            <label for="email">Email</label>
         </div>
         <div class="phone">
            <CustomInput id="phone" type="text" />
            <label for="phone">Mobile</label>
         </div>
         <div class="date">
            <CustomInput id="date" type="text" @click="isVisible = !isVisible" class="hover:cursor-pointer"
               :value="date" />
            <label for="date">Date of birth</label>
         </div>
         <div class="address">
            <CustomInput id="address" type="text" />
            <label for="address">Address</label>
         </div>
      </div>
      <CustomBtn type="button" :class="{ 'blur': isVisible }" @click="$router.push('gender')">Continue</CustomBtn>
      <div class="w-full h-full absolute hover:cursor-pointer" :class="{ 'hidden': !isVisible, 'block': isVisible }"
         @click="isVisible = !isVisible"></div>
      <div class="date-picker w-full text-center absolute bottom-[-100%] opacity-0 duration-300"
         :class="{ 'bottom-[20%] opacity-100': isVisible }">
         <q-date v-model="date" color="pink-4" text-color="black" class="w-full mb-3" />
         <CustomBtn type="submit" class="max-w-[200px]" @click="isVisible = !isVisible">Select</CustomBtn>
      </div>
   </div>
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

   .blur {
      filter: blur(5px);
   }
}
</style>