<script setup>
import { ref, onMounted } from 'vue';

const emit = defineEmits(['orderComplete']);

const products = ref([
    { id: 'standard', title: '', description: '', price: '' },
    { id: 'economic', title: '', description: '', price: '' }
]);

function onDeviceReady() {
    console.log('flrt: onDeviceReady is launched');
    console.log('flrt: Device platform is: ' + device.platform);
    if (typeof CdvPurchase === 'undefined') {
        console.log('flrt: CdvPurchase is not defined');
        return;
    }

    const { store, ProductType, Platform } = CdvPurchase;

    if (!store) {
        console.log('flrt: Store is not initialized');
        return;
    }

    console.log('flrt: Registering products...');

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
        }
        // {
        //     type: ProductType.CONSUMABLE,
        //     id: 'standard',
        //     platform: Platform.APPLE_APPSTORE, // iOS
        // },
        // {
        //     type: ProductType.CONSUMABLE,
        //     id: 'economic',
        //     platform: Platform.APPLE_APPSTORE, // iOS
        // }
    ]);

    console.log('flrt: Setting up event handlers...');

    // Обработка одобренных транзакций
    store.when().approved(onTransactionApproved);

    // Обработка обновленных продуктов
    store.when().updated(onProductUpdated);

    console.log('flrt: Event handlers set up. Initializing store...');

    // Инициализация магазина
    // store.initialize([Platform.GOOGLE_PLAY, Platform.APPLE_APPSTORE]);
    store.initialize([Platform.GOOGLE_PLAY]).then(() => {
        console.log('flrt: Store initialized');
        store.update().then(() => {
            console.log('flrt: Store updated');
            // checkRegisteredProducts();
        }).catch((error) => {
            console.log('flrt: Store update error: ' + JSON.stringify(error));
        });
    }).catch((error) => {
        console.log('flrt: Store initialization error: ' + JSON.stringify(error));
    });

    store.error((err) => {
        console.log('flrt: Store error: ' + JSON.stringify(err));
    });

    store.ready(() => {
        // console.log('flrt: CdvPurchase is ready');
        console.log('flrt: CdvPurchase is ready', JSON.stringify(store.products, null, 2));
        // console.log('flrt: CdvPurchase is ready', JSON.stringify(store, null, 2));
        // checkRegisteredProducts();
    });
}

// function checkRegisteredProducts() {
//     console.log('flrt: checkRegisteredProducts called');
// alert(JSON.stringify(store));

// const productsList = store.products(); // Вызов как метода

// if (!productsList || productsList.length === 0) {
//     console.log('flrt: No products found');
//     return;
// } else {
//     console.log('flrt: productsList is: ', productsList);
// }

// const registeredProducts = productsList.map(product => ({
//     id: product.id,
//     title: product.title,
//     description: product.description,
//     price: product.pricing ? product.pricing.price : 'N/A'
// }));

// console.log('flrt: Registered products: ' + JSON.stringify(registeredProducts));
// }

function onProductUpdated(product) {
    // Проверяем, является ли объект продуктом
    if (product.className === 'Product') {
        console.log('flrt: Product updated: ' + JSON.stringify(product));
        const index = products.value.findIndex(p => p.id === product.id);
        if (index !== -1) {
            // alert(`Updating product with id: ${product.id}`);
            products.value[index].title = product.title;
            products.value[index].description = product.description;
            products.value[index].price = product.pricing.price;
            // alert(`Updated product: ${JSON.stringify(products.value[index])}`);
        } else {
            console.log('flrt: Product not found in local list: ' + product.id);
        }
    } else {
        console.log('flrt: Received an update for a non-product object: ' + JSON.stringify(product));
    }
}

function buy(productId) {
    const platform = device.platform === 'iOS' ? CdvPurchase.Platform.APPLE_APPSTORE : CdvPurchase.Platform.GOOGLE_PLAY;
    const product = CdvPurchase.store.get(productId, platform);
    const offer = product.getOffer();
    if (offer) {
        offer.order();
    } else {
        console.log('flrt: Offer not found for product: ' + productId);
    }
}

function onTransactionApproved(transaction) {
    console.log('flrt: Transaction approved: ' + JSON.stringify(transaction));
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
