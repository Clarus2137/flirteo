<script setup lang="ts">
import ProfileDetails from 'src/components/ProfileDetails.vue';


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
         <ProfileDetails />
         <CustomBtn type="button" @click="$router.push('gender')">Continue</CustomBtn>
      </div>
   </div>
</template>