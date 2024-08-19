<script setup>
import { ref, onMounted } from 'vue';

const emit = defineEmits(['orderComplete']);

const products = ref([
    {
        id: 'test_pack_1',
        title: '',
        description: '',
        price: ''
    },
    {
        id: 'test_pack_2',
        title: '',
        description: '',
        price: ''
    }
]);

function onDeviceReady() {
    if (typeof CdvPurchase === 'undefined') {
        alert('CdvPurchase is not defined');
        return;
    }

    const { store, ProductType, Platform } = CdvPurchase;

    // Регистрация продуктов
    store.register([
        {
            type: ProductType.CONSUMABLE,
            id: 'test_pack_1',
            platform: Platform.GOOGLE_PLAY, // Android
        },
        {
            type: ProductType.CONSUMABLE,
            id: 'test_pack_2',
            platform: Platform.GOOGLE_PLAY, // Android
        }
    ]);

    // Обработка обновлений продукта
    store.when().productUpdated(onProductUpdated);

    // Обработка одобренных транзакций
    store.when().approved(onTransactionApproved);

    // Инициализация магазина
    store.ready(() => {
        console.log('CdvPurchase is ready');
    });
    store.initialize([Platform.GOOGLE_PLAY]);
}

function onProductUpdated(product) {
    const index = products.value.findIndex(p => p.id === product.id);
    if (index !== -1) {
        products.value[index].title = product.title;
        products.value[index].description = product.description;
        products.value[index].price = product.pricing.price;
    }
}

function buy(productId) {
    const product = CdvPurchase.store.get(productId, CdvPurchase.Platform.GOOGLE_PLAY);
    const offer = product.getOffer();
    if (offer) {
        offer.order();
    }
}

function onTransactionApproved(transaction) {
    transaction.finish();
    emit('orderComplete');
}

onMounted(() => {
    document.addEventListener('deviceready', onDeviceReady);
});
</script>

<template>
    <div class="catalog flex justify-center items-center gap-5">
        <div v-for="product in products" :key="product.id" class="catalog__item pack flex flex-col gap-3 lexend">
            <p class="pack__title text-lg">{{ product.title }}</p>
            <p class="pack__size text-center lexend text-lg">{{ product.description }}</p>
            <p class="pack__price text-center lexend-bold text-xl">{{ product.price }}</p>
            <CustomBtn class="order-btn" @click="buy(product.id)"><span>{{ $t('Order') }}</span></CustomBtn>
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
