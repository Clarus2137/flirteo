<script setup lang="ts">

</script>



<template>
    <div class="grid content-center">
        <p class="text-center mb-5">{{ $t('Confirm') }}</p>
        <CustomBtn type="button" @click="$router.push('/login')">{{ $t('LogIn') }}</CustomBtn>
    </div>
</template>
