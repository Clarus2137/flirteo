<script setup lang="ts">
defineProps({
    modelValue: String,
    type: String
});

const emit = defineEmits(['update:modelValue']);

const onInput = (event: Event) => {
    const target = event.target as HTMLInputElement;
    emit('update:modelValue', target.value);
}
</script>



<template>
    <input
        class="flrt-input w-full border border-solid border-inactive rounded-[10px] p-3.5 focus:border-primary active:border-primary"
        :value="modelValue" @input="onInput" :type="type">
</template>



<style scoped lang="scss">
.flrt-input,
.flrt-input:focus,
.flrt-input:active {
    outline: none !important;
}
</style>
