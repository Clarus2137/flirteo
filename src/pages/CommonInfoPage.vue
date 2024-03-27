<script setup lang="ts">
import CommonInfo from 'src/components/CommonInfo.vue';


const title = {
  title: 'Your information',
  subtitle: 'Please fill the fields below'
}
</script>



<template>
  <div class="profile">
    <div class="profile__details details grid gap-y-6">
      <div class="details__title">
        <TitleRow :title="title" />
      </div>
      <CommonInfo @goToGender="$router.push('gender')" />
    </div>
  </div>
</template>
