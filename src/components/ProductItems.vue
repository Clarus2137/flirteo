<!-- <script setup lang="ts">
import { useOrderStore } from 'src/stores/orderStore';

const orderStore = useOrderStore();

const emit = defineEmits(['itemSelected']);

const props = defineProps({
    products: {
        type: Array as () => Product[],
        required: true
    }
});

const handlePlan = (item: Product) => {
    orderStore.createOrder(item);
    emit('itemSelected');
}</script> -->


<script setup lang="ts">
import { ref, onMounted } from 'vue';
import 'cordova-plugin-purchase';

interface GoogleProduct {
    id: string;
    title: string;
    price: string;
    description: string;
}

const products = ref<GoogleProduct[]>([]);
const purchasedProducts = ref<string[]>([]);

const loadProducts = () => {
    alert('LoadProducts called');
    if (window.store) {
        window.store.verbosity = window.store.DEBUG;

        // Регистрация продуктов
        window.store.register({
            id: 'your_test_product_id', // Замените на ваши реальные идентификаторы продуктов
            alias: 'Test Product',
            type: window.store.CONSUMABLE,
        });

        // Инициализация магазина
        window.store.ready(() => {
            alert('Store is ready');
            products.value = window.store.products.map((product: any) => ({
                id: product.id,
                title: product.title,
                price: product.price,
                description: product.description,
            }));
            alert('Products: ' + products.value);
        });

        window.store.refresh();
    } else {
        console.error('Store plugin is not available');
    }
};

const handlePurchase = (order: any) => {
    console.log('Purchase approved: ', order);
    purchasedProducts.value.push(order.productId);
    localStorage.setItem('purchasedProducts', JSON.stringify(purchasedProducts.value));
    order.finish();
};

const buyProduct = (productId: string) => {
    if (window.store) {
        window.store.order(productId);
    } else {
        console.error('Store is not initialized');
    }
};

onMounted(() => {
    document.addEventListener('deviceready', loadProducts);
    alert('onMounted called');
    // Загрузка данных о покупках из LocalStorage
    const storedPurchases = localStorage.getItem('purchasedProducts');
    if (storedPurchases) {
        purchasedProducts.value = JSON.parse(storedPurchases);
    }

    if (window.store) {
        // Обработчик покупки
        window.store.when('your_test_product_id').approved(handlePurchase);

        window.store.when('your_test_product_id').updated((product: any) => {
            console.log('Product updated: ', product);
        });

        window.store.when('your_test_product_id').error((error: any) => {
            console.error('Purchase error: ', error);
        });
    }
});
</script>

<template>
    <div class="catalog flex justify-center items-center gap-5">
        <div class="catalog__item pack flex flex-col gap-3 lexend" v-for="item in products" :key="item.id">
            <p class="pack__title text-lg"> {{ $t('Pack') }}<br />{{ item.title }}</p>
            <p class="pack__size text-center lexend text-lg">{{ item.description }} - 10 {{ $t('Tokens') }}</p>
            <p class="pack__price text-center lexend-bold text-xl">{{ item.price }} {{ $t('PLN') }}</p>
            <CustomBtn class="order-btn" @click="buyProduct(item.id)"><span>{{ $t('Select') }}</span></CustomBtn>
        </div>
    </div>
</template>



<style scoped lang="scss">
.pack {
    max-width: 300px;
    padding: 0.875rem;
    border-radius: 1rem;
    background: $bg_gradient;
    color: #fff;

    .pack__title {
        text-align: center;
    }

    .order-btn {
        background: $text_primary;
        transition: 0.3s;

        &:hover {
            background: #fff;
            color: $text_primary;
        }
    }

    .pack__features>li:not(:last-of-type) {
        margin-bottom: 0.5rem;
    }
}
</style>
