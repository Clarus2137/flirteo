<template>
    <div class="spinner-wrapper">
        <div class="spinner"></div>
        <p class="text-h6  text-center">{{ $t('Loading') }}</p>
    </div>
</template>

<script setup lang="ts">
// Здесь можно добавить логику, если она потребуется
</script>

<style scoped lang="scss">
.spinner-wrapper {
    display: flex;
    flex-direction: column;
    row-gap: 20px;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
    background: $bg_loading;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;

    .spinner {
        border: 4px solid rgba(0, 0, 0, 0.1);
        border-left-color: $primary;
        border-radius: 50%;
        width: 180px;
        height: 180px;
        animation: spin 1s linear infinite;
    }

    p {
        color: $primary;
    }
}

.body--dark {
    .spinner-wrapper {
        background: $bg_loading-dark;

        .spinner {
            border-left-color: $primary-dark;
        }

        p {
            color: $primary-dark;
        }
    }
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
