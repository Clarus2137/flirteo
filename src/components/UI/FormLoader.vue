<script setup lang="ts">

</script>



<template>
    <div id="loader"></div>
</template>



<style scoped lang="scss">
#loader {
    width: 20px;
    height: 20px;
    margin: 0 auto;
    border: 3px solid #FFDAE5;
    border-top: 3px solid #E03368;
    border-radius: 50%;
    animation: spin 2s linear infinite;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>
