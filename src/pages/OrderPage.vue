<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useOrderStore } from 'src/stores/orderStore';
import ProductItems from 'src/components/ProductItems.vue';
import UserOrder from 'src/components/UserOrder.vue';
import PaymentMethods from 'src/components/PaymentMethods.vue';
import OrderSuccess from 'src/components/OrderSuccess.vue';


const orderStore = useOrderStore();

const step = ref(1);

const isOrdered = ref(false);

const products = ref<Product[]>([]);

const isDataLoading = ref(true);
const animatedScreen = ref<HTMLElement | null>(null);
const animatedPage = ref<HTMLElement | null>(null);

const toggleScreen = () => {
    if (animatedScreen.value) {
        animatedScreen.value.animate([
            { opacity: '1' },
            { opacity: '0' }
        ], {
            duration: 400,
            easing: 'linear'
        }).onfinish = () => {
            isDataLoading.value = false; // Переключаем состояние загрузки
            if (animatedPage.value) {
                animatedPage.value.animate([
                    { opacity: '0' },
                    { opacity: '1' }
                ], {
                    duration: 400,
                    easing: 'linear'
                });
            }
        };
    }
}

const loadProducts = async () => {
    const isSuccess = await orderStore.getPlans();
    if (isSuccess) {
        products.value = [...orderStore.products];
        toggleScreen();
    }
}

onMounted(() => {
    if (!orderStore.products.length) {
        loadProducts();
    }
});
</script>



<template>
    <div v-if="isDataLoading" ref="animatedScreen">
        <LoadingScreen />
    </div>
    <div ref="animatedPage" v-show="!isDataLoading">
        <h1 class="lexend-bold text-2xl text-center mb-5">{{ $t('Store') }}</h1>
        <q-stepper v-model="step" vertical color="primary" animated class="store" v-if="!isOrdered">
            <q-step :name="1" :title="$t('Order_item_hint')" icon="settings" :done="step > 1">
                <ProductItems :products="products" @itemSelected="step = 2" />
            </q-step>

            <q-step :name="2" :title="$t('Cart.title')" icon="create_new_folder" :done="step > 2">
                <UserOrder @goToPaymentMethods="step = 3" @backToItems="step = 1" />

                <!-- <q-stepper-navigation>
                <q-btn @click="step = 3" color="primary" :label="$t('Continue')" />
                <q-btn flat @click="step = 1" color="primary" :label="$t('Back')" class="q-ml-sm" />
            </q-stepper-navigation> -->
            </q-step>

            <q-step :name="3" :title="$t('PaymentMethod')" icon="assignment">
                <PaymentMethods @stepBack="step = 2" />
            </q-step>
        </q-stepper>

        <OrderSuccess v-else />
    </div>
</template>
