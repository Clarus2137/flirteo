<script setup lang="ts">

</script>



<template>
    <div class="cart">
        <p class="cart__title lexend-bold text-xl text-center">{{ $t('Cart.title') }}</p>
        <div class="cart__item">{{ $t('Cart.item') }}</div>
        <div class="cart__qnt">{{ $t('Cart.quantity') }}</div>
        <div class="cart__price">{{ $t('Cart.price') }}</div>
        <div class="cart__sum">{{ $t('Cart.sum') }}</div>
    </div>
</template>
