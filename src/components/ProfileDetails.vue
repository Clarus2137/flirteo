<script setup lang="ts">

</script>



<template>
   <div class="profile__details flex flex-col items-center gap-y-8">
      <div class="profile__title w-full">
         <h1 class="headline lexend-bold capitalize">Add profile details</h1>
         <p class="body-text lexend-light text-secondary">Please add your profile detrails here</p>
      </div>
      <div class="profile__photo photo">
         <div class="photo__img w-28 h-28 mx-auto rounded-3xl bg-primary-400"></div>
      </div>
      <div class="profile__personal-data flex flex-col gap-y-4 w-full">
         <CustomInput type="text" />
         <CustomInput type="email" />
         <CustomInput type="text" />
         <CustomInput type="date" />
         <CustomInput type="text" />
      </div>
      <CustomBtn type="button">Continue</CustomBtn>
   </div>
</template>



<style scoped lang="scss">

</style>