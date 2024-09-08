<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useOrderStore } from 'src/stores/orderStore';
import ProductItems from 'src/components/ProductItems.vue';
import OrderSuccess from 'src/components/OrderSuccess.vue';


const orderStore = useOrderStore();

const isOwned = ref(false);

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
        <LoaderScreen />
    </div>
    <div class="flex flex-col" ref="animatedPage" v-show="!isDataLoading">
        <h1 class="lexend-bold text-2xl text-center mb-5">{{ $t('Store') }}</h1>
        <ProductItems @orderComplete="isOwned = true" v-if="!isOwned" />
        <OrderSuccess @goToHome="$router.push('/home')" v-else />
    </div>
</template>
