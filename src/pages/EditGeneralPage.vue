<script setup lang="ts">
import EditGeneral from 'src/components/EditGeneral.vue';
</script>



<template>
   <BackBtn />
   <div class="profile">
      <h1 class="mb-10 lexend-bold leading-normal text-center capitalize">Edit profile</h1>
      <div class="profile__details details grid gap-y-6">
         <EditGeneral />
      </div>
   </div>
</template>