<script setup lang="ts">
import ProfileDetails from 'src/components/ProfileDetails.vue';
</script>



<template>
   <BackBtn />
   <div class="profile">
      <h1 class="mb-10 lexend-bold leading-normal text-center capitalize">Edit profile</h1>
      <div class="profile__details details grid gap-y-6">
         <ProfileDetails />
         <CustomBtn type="button" @click="$router.back()">Save</CustomBtn>
      </div>
   </div>
</template>