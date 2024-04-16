<script setup lang="ts">
// const customButton = document.querySelector('button.gradient-primary');

// customButton?.addEventListener('mouseleave', () => {
//     customButton.classList.remove('hover');
// });
</script>



<template>
    <button class="gradient-primary w-full text-white p-4 rounded-[10px]">
        <slot></slot>
    </button>
</template>
