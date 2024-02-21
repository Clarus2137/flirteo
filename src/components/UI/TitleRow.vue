<script setup lang="ts">
import { PropType } from 'vue';


interface Title {
   title?: string,
   subtitle?: string
}

const props = defineProps({
   title: Object as PropType<Title>
});


</script>



<template>
   <h1 class="headline lexend-bold capitalize">{{ props.title?.title }}</h1>
   <p class="body-text lexend-light text-secondary">{{ props.title?.subtitle }}</p>
</template>