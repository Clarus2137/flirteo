<script setup lang="ts">
const title = {
   title: 'Ideal match',
   subtitle: 'What are you hoping to find here on sprout'
}
</script>



<template>
   <div class="profile__match match flex flex-col items-center gap-y-10">
      <div class="match__title w-full">
         <TitleRow :title="title" />
      </div>
      <div class="match__items w-full flex gap-y-4">
         <div class="match__item w-full">
            <div class="w-16 h-16 rounded-md bg-inactive"></div>
            <div class="match__title">
               <p class="match__headline">Love</p>
               <div class="match__tagline">You're not on here to play around</div>
            </div>
         </div>
         <div class="match__item w-full"></div>
         <div class="match__item w-full"></div>
      </div>
   </div>
</template>