<script setup lang="ts">

</script>



<template>
   <BackBtn />
   <div class="email">
      <div class="email__title">
         <h1 class="headline lexend-bold">Enter your E-mail</h1>
         <p class="body-text lexend-light text-secondary">Please enter your e-mail to continue</p>
      </div>
      <q-form class="email__form mt-5">
         <CustomInput type="email" required />
         <!-- <CustomBtn type="submit" class="mt-5">Continue</CustomBtn> -->
         <CustomBtn type="submit" class="mt-5" @click="$router.push('/profile')">Continue</CustomBtn>
      </q-form>
   </div>
</template>