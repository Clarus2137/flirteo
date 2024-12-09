<template>
    <pre>{{ storeContent }}</pre>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const storeContent = ref('');

onMounted(() => {
    if (window.cordova) {
        document.addEventListener('deviceready', () => {
            console.log('flrt: Device is ready');
            const { store } = window.CdvPurchase;

            // Регистрация продуктов
            const products = [
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

            store.register(products);

            // Инициализация магазина
            store.initialize([CdvPurchase.Platform.GOOGLE_PLAY]).then(errors => {
                if (errors.length) {
                    console.log('flrt: Ошибка инициализации:', errors);
                    return;
                }
                console.log('flrt: Инициализация прошла успешно');

                // Проверка готовности магазина
                store.ready(() => {
                    console.log('flrt: Store is ready');
                    console.log('flrt: Store products:', JSON.stringify(store.products, null, 2));
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

pre {
    background-color: #f0f0f0;
    padding: 10px;
    border-radius: 5px;
    overflow-x: auto;
    max-width: 100%;
}
</style>
