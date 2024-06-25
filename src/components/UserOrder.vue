<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useUserStore } from 'src/stores/userStore';
import { useOrderStore } from 'src/stores/orderStore';


const userStore = useUserStore();
const orderStore = useOrderStore();

const model = ref(1);

const orderPrice = ref(0);

orderStore.order.items?.forEach((item) => {
    item.itemsQty = model.value
    item.itemsPrice = item.product.price * item.itemsQty;
    orderPrice.value += item.itemsPrice;
});

</script>



<template>
    <div class="cart">
        <div v-for="item in orderStore.order.items" :key="item.product.id">
            <div class="cart__item">{{ $t('Cart.item') }}: {{ item.product.name }}</div>
            <div class="cart__qty flex justify-start items-center gap-2">{{ $t('Cart.quantity') }}: <input type="number"
                    :value="model">
            </div>
            <div class="cart__price">{{ $t('Cart.price') }}: {{ item.itemsPrice }}</div>
            <div class="cart__sum">{{ $t('Cart.sum') }}: {{ orderPrice }}</div>
        </div>
    </div>
</template>



<style lang="scss">
.cart__qty {
    input {
        background: $text_light;
    }
}
</style>
