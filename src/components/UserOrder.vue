<script setup lang="ts">
import { useUserStore } from 'src/stores/userStore';
import { useOrderStore } from 'src/stores/orderStore';


const userStore = useUserStore();
const orderStore = useOrderStore();

console.log(orderStore.order);
</script>



<template>
    <div class="cart">
        <div class="cart__item">{{ $t('Cart.item') }}: </div>
        <div class="cart__qnt">{{ $t('Cart.quantity') }}</div>
        <div class="cart__price">{{ $t('Cart.price') }}</div>
        <div class="cart__sum">{{ $t('Cart.sum') }}</div>
    </div>
</template>
