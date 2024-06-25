<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import { useUserStore } from 'src/stores/userStore';
import { useOrderStore } from 'src/stores/orderStore';
import SvgGradient from './UI/SvgGradient.vue';


const userStore = useUserStore();
const orderStore = useOrderStore();


const order = orderStore.order;
const qty = ref(1);
const orderPrice = ref(0);

const minQty = ref(true);
const maxQty = ref(false);

const increaseQty = () => {
    if (qty.value < 999) {
        qty.value += 1;
    }
};

const decreaseQty = () => {
    if (qty.value > 1) {
        qty.value -= 1;
    }
};

const handleInput = (e: Event) => {
    const target = e.target as HTMLInputElement
    let value = parseInt(target.value, 10);
    if (isNaN(value) || value < 1) {
        qty.value = 1;
    } else if (value > 999) {
        qty.value = 999;
    } else {
        qty.value = value;
    }
};

watch(qty, (newValue) => {
    if (newValue < 2) {
        qty.value = 1;
        minQty.value = true;
    } else if (newValue > 1 && newValue < 999) {
        minQty.value = false;
        maxQty.value = false;
    } else if (newValue > 998) {
        qty.value = 999;
        maxQty.value = true;
    }
    orderPrice.value = orderStore.order.item.price * qty.value;
});

const confirmOrder = () => {
    const orderData = {
        itemsQty: qty.value,
        orderPrice: orderPrice.value
    }
    orderStore.addOrderData(orderData);
}

onMounted(() => {
    orderPrice.value = orderStore.order.item.price * qty.value;
});
</script>



<template>
    <div class="cart">
        <div class="cart__item">{{ $t('Cart.item') }}: {{ order.item.name }}</div>
        <div class="cart__qty qty flex justify-start items-center gap-2">{{ $t('Cart.quantity') }}:
            <div class="qty__inner ml-2 flex justify-start items-center gap-2">
                <button type="button" @click="decreaseQty" :disabled="minQty">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <SvgGradient />
                        </defs>
                        <circle cx="10" cy="10" r="10" fill="url(#gradient_primary)" />
                        <circle cx="10" cy="10" r="9" stroke="transparent" stroke-width="2" />
                        <path
                            d="M3.57144 9.99998C3.57144 9.55618 3.93121 9.19641 4.37501 9.19641H15.625C16.0688 9.19641 16.4286 9.55618 16.4286 9.99998V9.99998C16.4286 10.4438 16.0688 10.8036 15.625 10.8036H4.37501C3.93121 10.8036 3.57144 10.4438 3.57144 9.99998V9.99998Z"
                            fill="#fff" />
                    </svg>
                </button>
                <input type="number" v-model="qty" class="py-2 text-center qty__input" @input="handleInput" />
                <button type="button" @click="increaseQty" :disabled="maxQty">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <SvgGradient />
                        </defs>
                        <circle cx="10" cy="10" r="10" fill="url(#gradient_primary)" />
                        <circle cx="10" cy="10" r="9" stroke="transparent" stroke-width="2" />
                        <path fill-rule="evenodd" clip-rule="evenodd"
                            d="M10 3.57141C9.55621 3.57141 9.19644 3.93118 9.19644 4.37498V9.19641H4.37501C3.93121 9.19641 3.57144 9.55618 3.57144 9.99998C3.57144 10.4438 3.93121 10.8036 4.37501 10.8036H9.19644V15.625C9.19644 16.0688 9.55621 16.4286 10 16.4286C10.4438 16.4286 10.8036 16.0688 10.8036 15.625V10.8036H15.625C16.0688 10.8036 16.4286 10.4438 16.4286 9.99998C16.4286 9.55618 16.0688 9.19641 15.625 9.19641H10.8036V4.37498C10.8036 3.93118 10.4438 3.57141 10 3.57141Z"
                            fill="#fff" />
                    </svg>
                </button>
            </div>
        </div>
        <div class="cart__price">{{ $t('Cart.price') }}: {{ order.item.price }}</div>
        <div class="cart__sum">{{ $t('Cart.sum') }}: {{ orderPrice }}</div>
    </div>
    <q-btn @click="confirmOrder" color="primary" :label="$t('Continue')" />
</template>



<style scoped lang="scss">
.qty__input {
    width: 58px;
    background: $light;
}
</style>
