<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { useUserStore } from 'src/stores/userStore';


const { t } = useI18n();

const userStore = useUserStore();

const emit = defineEmits(['itemSelected']);

const products = [
    {
        id: 1,
        name: t('Packages.base.name'),
        size: 50,
        features: [
            50 + t('Packages.base.features.size'),
            t('Packages.base.features.support'),
            t('Packages.base.features.prompts')
        ],
        price: 10
    }
]

const selectPack = (pack: Package) => {
    const selectedProduct = {
        name: pack.name,
        size: pack.size,
        price: pack.price
    }
    userStore.createOrder(selectedProduct)
    emit('itemSelected');
}
</script>



<template>
    <div class="catalog flex flex-col justify-center items-center gap-5">
        <p class="catalog__title lexend-bold text-xl text-center">{{ $t('Catalog') }}</p>
        <div class="catalog__item pack flex flex-col gap-3 lexend" v-for="pack in products" :key="pack.id">
            <p class="pack__title text-lg">{{ pack.name }}</p>
            <ul class="pack__features">
                <li class="flex items-center gap-3" v-for="feature in pack.features" :key="feature">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_78_7)">
                            <path
                                d="M7.00598 8.00398L10.2576 10.4427C10.6752 10.7559 11.2637 10.6943 11.6075 10.3015L17.984 3.01398"
                                stroke="white" stroke-width="2" stroke-linecap="round" />
                            <path
                                d="M18.982 9.99998C18.982 11.8767 18.3942 13.7063 17.301 15.2318C16.2079 16.7574 14.6643 17.9021 12.8872 18.5054C11.1101 19.1086 9.1886 19.14 7.39264 18.5953C5.59672 18.0505 4.01654 16.9568 2.87405 15.4679C1.73157 13.979 1.08416 12.1697 1.02276 10.2939C0.961349 8.41816 1.48903 6.57028 2.53169 5.00983C3.57435 3.44938 5.07962 2.25472 6.83606 1.59364C8.59249 0.932557 10.512 0.838267 12.3247 1.324"
                                stroke="white" stroke-width="2" stroke-linecap="round" />
                        </g>
                        <defs>
                            <clipPath id="clip0_78_7">
                                <rect width="20" height="20" fill="white" />
                            </clipPath>
                        </defs>
                    </svg>
                    {{ feature }}
                </li>
            </ul>
            <p class="pack__price text-center lexend-bold text-xl">{{ pack.price }} {{ t('Packages.base.price') }}</p>
            <CustomBtn class="order-btn" @click="selectPack(pack)"><span>{{ $t('Order') }}</span></CustomBtn>
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
