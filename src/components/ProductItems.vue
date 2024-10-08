<script setup>
import { ref, onMounted } from 'vue';

const emit = defineEmits(['orderComplete']);

const products = ref([
    { id: 'standard', title: '', description: '', price: '' },
    { id: 'economic', title: '', description: '', price: '' }
]);

function onDeviceReady() {
    alert('onDeviceReady is launched');
    alert('Device platform is: ' + device.platform);
    if (typeof CdvPurchase === 'undefined') {
        alert('CdvPurchase is not defined');
        return;
    }

    const { store, ProductType, Platform } = CdvPurchase;

    alert('Registering products...');

    // Регистрация продуктов
    store.register([
        {
            type: ProductType.CONSUMABLE,
            id: 'standard',
            platform: Platform.GOOGLE_PLAY, // Android
        },
        {
            type: ProductType.CONSUMABLE,
            id: 'economic',
            platform: Platform.GOOGLE_PLAY, // Android
        },
        {
            type: ProductType.CONSUMABLE,
            id: 'standard',
            platform: Platform.APPLE_APPSTORE, // iOS
        },
        {
            type: ProductType.CONSUMABLE,
            id: 'economic',
            platform: Platform.APPLE_APPSTORE, // iOS
        }
    ]);

    alert('Setting up event handlers...');

    // Обработка одобренных транзакций
    store.when().approved(onTransactionApproved);

    // Обработка обновленных продуктов
    store.when().updated(onProductUpdated);

    alert('Event handlers set up. Initializing store...');

    // Инициализация магазина
    store.ready(() => {
        alert('CdvPurchase is ready');
        checkRegisteredProducts();
    });

    store.error((err) => {
        alert('Store error: ' + JSON.stringify(err));
    });

    store.initialize([Platform.GOOGLE_PLAY, Platform.APPLE_APPSTORE]);
}

function checkRegisteredProducts() {
    const registeredProducts = store.products.map(product => ({
        id: product.id,
        title: product.title,
        description: product.description,
        price: product.pricing ? product.pricing.price : 'N/A'
    }));

    alert('Registered products: ' + JSON.stringify(registeredProducts));
}

function onProductUpdated(product) {
    // Проверяем, является ли объект продуктом
    if (product.className === 'Product') {
        alert('Product updated: ' + JSON.stringify(product));
        const index = products.value.findIndex(p => p.id === product.id);
        if (index !== -1) {
            alert(`Updating product with id: ${product.id}`);
            products.value[index].title = product.title;
            products.value[index].description = product.description;
            products.value[index].price = product.pricing.price;
            alert(`Updated product: ${JSON.stringify(products.value[index])}`);
        } else {
            alert('Product not found in local list: ' + product.id);
        }
    } else {
        alert('Received an update for a non-product object: ' + JSON.stringify(product));
    }
}

function buy(productId) {
    const platform = device.platform === 'iOS' ? CdvPurchase.Platform.APPLE_APPSTORE : CdvPurchase.Platform.GOOGLE_PLAY;
    const product = CdvPurchase.store.get(productId, platform);
    const offer = product.getOffer();
    if (offer) {
        offer.order();
    } else {
        alert('Offer not found for product: ' + productId);
    }
}

function onTransactionApproved(transaction) {
    alert('Transaction approved: ' + JSON.stringify(transaction));
    transaction.finish();
    emit('orderComplete');
}

onMounted(() => {
    document.addEventListener('deviceready', onDeviceReady, false);
});
</script>

<template>
    <div class="catalog flex justify-center items-center gap-5">
        <div v-for="product in products" :key="product.id"
            class="catalog__item pack gradient-primary flex flex-col gap-3 lexend">
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
    color: #fff;

    .pack__title {
        text-align: center;
    }

    .order-btn {
        background: $dark;
        transition: 0.3s;

        &:hover {
            background: #fff;
            color: $dark;
        }
    }

    .pack__features>li:not(:last-of-type) {
        margin-bottom: 0.5rem;
    }
}

.body--dark {
    .pack {
        color: $dark;

        .order-btn {
            color: $light;

            &:hover {
                background: $light;
                color: $dark;
            }
        }
    }
}
</style>