<script setup lang="ts">
import RegistrationPanel from 'src/components/RegistrationPanel.vue';
</script>



<template>
   <RegistrationPanel @goToVerification="$router.push('/registration/verification')" />
</template>