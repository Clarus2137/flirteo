<script setup lang="ts">
const title = {
   title: 'Enter your E-mail',
   subtitle: 'Please enter your e-mail to continue'
}
</script>



<template>
   <BackBtn />
   <div class="email">
      <div class="email__title">
         <TitleRow :title="title" />
      </div>
      <q-form class="email__form mt-5">
         <CustomInput type="email" required />
         <!-- <CustomBtn type="submit" class="mt-5">Continue</CustomBtn> -->
         <CustomBtn type="submit" class="mt-5" @click="$router.push('/info/details')">Continue</CustomBtn>
      </q-form>
   </div>
</template>