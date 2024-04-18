<script setup lang="ts">
import SignUp from 'src/components/SignUp.vue';
</script>



<template>
    <SignUp @goToVerification="$router.push('/registration/verification')" />
</template>
