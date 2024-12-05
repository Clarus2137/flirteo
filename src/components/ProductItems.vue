<template>
    <div class="catalog flex justify-center items-center gap-5">
        <div v-for="product in products" :key="product.id"
            class="catalog__item pack gradient-primary flex flex-col gap-3 lexend">
            <p class="pack__title text-lg">{{ product.title }}</p>
            <p class="pack__size text-center lexend text-lg">{{ product.description }}</p>
            <p class="pack__price text-center lexend-bold text-xl">{{ product.price || 'Неизвестно' }}</p>
            <CustomBtn class="order-btn" @click="buy(product)"><span>{{ $t('Order') }}</span></CustomBtn>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const products = ref([
    { id: 'standard', title: '', description: '', price: '' },
    { id: 'economic', title: '', description: '', price: '' }
]);

onMounted(() => {
    if (window.cordova) {
        document.addEventListener('deviceready', () => {
            try {
                const CdvPurchase = window.CdvPurchase;

                const errors = CdvPurchase.store.initialize([CdvPurchase.Platform.GOOGLE_PLAY]);

                if (errors.length) {
                    alert('Ошибка инициализации: ' + errors.join(', '));
                    return;
                }

                // Регистрация продуктов
                CdvPurchase.store.register([
                    {
                        id: 'economic',
                        type: CdvPurchase.ProductType.CONSUMABLE,
                        platform: CdvPurchase.Platform.GOOGLE_PLAY,
                    },
                    {
                        id: 'standard',
                        type: CdvPurchase.ProductType.CONSUMABLE,
                        platform: CdvPurchase.Platform.GOOGLE_PLAY,
                    },
                ]);

                // Обработка событий готовности
                CdvPurchase.store.ready(() => {
                    alert('Store is ready');

                    // Подписка на обновления продуктов
                    CdvPurchase.store.when().productUpdated(onProductUpdated);

                    // Обновление информации о продуктах
                    CdvPurchase.store.update().then(() => {
                        alert('Products updated.');
                    });
                });

                // Обработка ошибок
                CdvPurchase.store.error((error) => {
                    alert('CdvPurchase ERROR: ' + error.message);
                });

            } catch (e) {
                alert('Ошибка при инициализации магазина: ' + e.message);
            }
        });
    } else {
        alert('Этот код должен выполняться только на устройстве.');
    }
});

function onProductUpdated(product) {
    if (product.className === 'Product') {
        const index = products.value.findIndex(p => p.id === product.id);
        if (index !== -1) {
            products.value[index].title = product.title;
            products.value[index].description = product.description;
            products.value[index].price = product.pricing?.price || 'Неизвестно';
        }
    }
}

function buy(product) {
    alert(`Покупка продукта: ${product.title}`);
    // Здесь вы можете добавить логику для обработки покупки
    // Например, CdvPurchase.store.order(product.id);
}
</script>

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
