<script setup>
import { ref, onMounted } from 'vue';

const productTitle = ref('');
const productDescription = ref('');
const productPrice = ref('');

function onDeviceReady() {
    if (typeof CdvPurchase === 'undefined') {
        alert('CdvPurchase is not defined');
        return;
    }

    const { store, ProductType, Platform } = CdvPurchase;

    // Регистрация продуктов
    store.register([{
        type: ProductType.CONSUMABLE,
        id: 'test_pack_1',
        platform: Platform.GOOGLE_PLAY,
    }]);

    // Обработка обновлений продукта
    store.when().productUpdated(onProductUpdated);

    // Обработка одобренных транзакций
    store.when().approved(onTransactionApproved);

    // Инициализация магазина
    store.ready(() => {
        alert('CdvPurchase is ready');
    });
    store.initialize([Platform.GOOGLE_PLAY]);
}

function onProductUpdated() {
    const product = CdvPurchase.store.get('test_pack_1', CdvPurchase.Platform.GOOGLE_PLAY);
    productTitle.value = product.title;
    productDescription.value = product.description;
    productPrice.value = product.pricing.price;
}

function buy() {
    const product = CdvPurchase.store.get('test_pack_1', CdvPurchase.Platform.GOOGLE_PLAY);
    const offer = product.getOffer();
    if (offer) {
        offer.order();
    }
}

function onTransactionApproved(transaction) {
    alert('Purchase approved, congrats!');
    transaction.finish();
}

onMounted(() => {
    document.addEventListener('deviceready', onDeviceReady);
});
</script>

<template>
    <div>
        <div>Product: {{ productTitle }}</div>
        <div>{{ productDescription }}</div>
        <div>Price: {{ productPrice }}</div>
        <button @click="buy">Buy</button>
    </div>
</template>
