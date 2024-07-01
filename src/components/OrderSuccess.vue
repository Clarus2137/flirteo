<script setup lang="ts">

</script>



<template>
    <div class="grow flex flex-col justify-center items-center gap-3">
        <p class="lexend-bold text-lg text-center">{{ $t('OrderSuccess') }}</p>
        <CustomBtn class="max-w-[100px]" type="button" @click="$router.push('/home')">OK</CustomBtn>
    </div>
</template>
