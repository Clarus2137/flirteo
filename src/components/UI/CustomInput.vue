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
        class="w-full border border-solid border-inactive rounded-[10px] p-3.5 focus:outline-none focus:border-primary active:outline-none active:border-primary"
        :value="modelValue" @input="onInput" :type="type">
</template>
