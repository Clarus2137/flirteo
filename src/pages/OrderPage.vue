<script setup lang="ts">
import { ref } from 'vue';
import ProductItems from 'src/components/ProductItems.vue';
import UserOrder from 'src/components/UserOrder.vue'


const step = ref(1);
</script>



<template>
    <h1 class="lexend-bold text-2xl text-center mb-5">{{ $t('Store') }}</h1>
    <q-stepper v-model="step" vertical color="primary" animated class="store">
        <q-step :name="1" :title="$t('Order_item_hint')" icon="settings" :done="step > 1">
            <ProductItems @itemSelected="step = 2" />
        </q-step>

        <q-step :name="2" :title="$t('Cart.title')" icon="create_new_folder" :done="step > 2">
            <UserOrder />

            <q-stepper-navigation>
                <q-btn @click="step = 3" color="primary" :label="$t('Continue')" />
                <q-btn flat @click="step = 1" color="primary" label="Back" class="q-ml-sm" />
            </q-stepper-navigation>
        </q-step>

        <q-step :name="3" title="Ad template" icon="assignment" :done="step > 3">
            This step won't show up because it is disabled.
        </q-step>

        <q-step :name="4" title="Create an ad" icon="add_comment">
            Try out different ad text to see what brings in the most customers, and learn how to
            enhance your ads using features like ad extensions. If you run into any problems with
            your ads, find out how to tell if they're running and how to resolve approval issues.

            <q-stepper-navigation>
                <q-btn color="primary" label="Finish" />
                <q-btn flat @click="step = 2" color="primary" label="Back" class="q-ml-sm" />
            </q-stepper-navigation>
        </q-step>
    </q-stepper>
</template>
