<script setup lang="ts">
import TabMenu from 'src/components/TabMenu.vue';


</script>



<template>
   <q-layout class="pb-[40px] grid">
      <q-page-container class="grid">
         <router-view />
      </q-page-container>
      <TabMenu />
   </q-layout>
</template>