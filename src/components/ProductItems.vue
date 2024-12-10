<template>
    <div class="catalog flex justify-center items-center gap-5">
        <div v-for="product in products" :key="product.id"
            class="catalog__item pack gradient-primary flex flex-col gap-3 lexend">
            <p class="pack__title text-lg">{{ product.title }}</p>
            <p class="pack__size text-center lexend text-lg">{{ product.description }}</p>
            <p class="pack__price text-center lexend-bold text-xl">{{ product.offers?.pricingPhases?.[0]?.price ||
                'Неизвестно' }}</p>
            <CustomBtn class="order-btn" @click="buy(product.id)"><span>{{ $t('Order') }}</span></CustomBtn>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const products = ref([]);

onMounted(() => {
    if (window.cordova) {
        document.addEventListener('deviceready', () => {
            console.log('flrt: Device is ready');
            const { store } = window.CdvPurchase;

            // Регистрация продуктов
            const productDefinitions = [
                {
                    id: 'economic',
                    type: CdvPurchase.ProductType.CONSUMABLE,
                    platform: CdvPurchase.Platform.GOOGLE_PLAY,
                },
                {
                    id: 'standard',
                    type: CdvPurchase.ProductType.CONSUMABLE,
                    platform: CdvPurchase.Platform.GOOGLE_PLAY,
                }
            ];

            store.register(productDefinitions);

            // Инициализация магазина
            store.initialize([CdvPurchase.Platform.GOOGLE_PLAY]).then(errors => {
                if (errors.length) {
                    console.log('flrt: Ошибка инициализации:', errors);
                    return;
                }
                console.log('flrt: Инициализация прошла успешно');

                // Проверка готовности магазина
                store.ready(() => {
                    products.value = store.products;
                    console.log('flrt: Products:', JSON.stringify(products.value));
                });
            });
        });
    } else {
        console.log('flrt: Этот код должен выполняться только на устройстве.');
    }
});
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
