<script setup lang="ts">
import { ref } from 'vue';
import RegPanel from 'src/components/RegPanel.vue';
import EnterEmail from 'src/components/EnterEmail.vue';

let isEnterEmailVisible = ref(false);

const switchComponents = () => {
   isEnterEmailVisible.value = !isEnterEmailVisible.value;
}
</script>



<template>
   <RegPanel v-if="!isEnterEmailVisible" @goToEmailEntering="switchComponents" />
   <EnterEmail v-else />
</template>