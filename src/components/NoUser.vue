<script setup lang="ts">
import { RouterLink } from 'vue-router';


</script>



<template>
    <div class="no-user text-center flex justify-center items-center">
        <p>It seems your account doesn't exist anymore. Please connect with our support or <router-link
                class="text-base text-primary font-medium underline" to="/login">try
                to Log In again</router-link></p>
    </div>
</template>



<style lang="scss" scoped>
.no-user {
    padding: 20px 25px;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #fff;
    z-index: 1;
}
</style>
