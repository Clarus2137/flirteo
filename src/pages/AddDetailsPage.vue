<script setup lang="ts">
import AddDetails from 'src/components/AddDetails.vue';


const title = {
   title: 'Add profile details',
   subtitle: 'Please add your profile detrails here'
}
</script>



<template>
   <div class="profile">
      <div class="profile__details details grid gap-y-6">
         <div class="details__title">
            <TitleRow :title="title" />
         </div>
         <AddDetails />
      </div>
   </div>
</template>