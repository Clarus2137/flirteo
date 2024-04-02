<script setup lang="ts">
import { PropType } from 'vue';

const props = defineProps({
    title: Object as PropType<PageTitle>
});


</script>



<template>
    <h1 class="headline lexend-bold capitalize">{{ props.title?.title }}</h1>
    <p class="body-text lexend-light text-secondary">{{ props.title?.subtitle }}</p>
</template>
