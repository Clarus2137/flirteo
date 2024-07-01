<script setup lang="ts">
import { ref } from 'vue';

const emit = defineEmits(['stepBack']);

const method = ref('gpay');

const paymentStatus = ref<string | null>(null);
const paymentUrl = 'https://flirteo.eu/payments'; // Укажите ваш URL для оплаты

// Пример данных для оплаты
const paymentData = ref<PaymentData>({
    totalPrice: '10.00', // Замените на ваши данные
    currencyCode: 'USD', // Замените на ваши данные
    merchantId: '01234567890123456789', // Пример merchantId
    merchantName: 'Example Merchant', // Пример имени мерчанта
    allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
    allowedCardNetworks: ['MASTERCARD', 'VISA'],
    gateway: 'example',
    gatewayMerchantId: 'exampleGatewayMerchantId'
});

const openGooglePay = () => {
    if (window.cordova) {
        if (window.cordova.InAppBrowser) {
            const target = "_system"; // Открыть в системном браузере
            const options = "location=yes";

            window.cordova.InAppBrowser.open(paymentUrl, target, options);
            paymentStatus.value = 'Ссылка открыта в системном браузере';
        } else {
            paymentStatus.value = 'InAppBrowser не поддерживается';
        }
    } else {
        paymentStatus.value = 'Cordova не поддерживается';
    }

    // Пример использования глобального объекта
    window.paymentData = paymentData.value;

    // Или можно использовать событие
    const event = new CustomEvent('paymentDataReady', {
        detail: paymentData.value
    });
    window.dispatchEvent(event);
};
</script>



<template>
    <div class="payments lexend">
        <q-radio v-model="method" checked-icon="task_alt" unchecked-icon="panorama_fish_eye" val="gpay"
            label="Google Pay" />
    </div>

    <q-btn @click="openGooglePay" color="primary" :label="$t('Continue')" />
    <q-btn flat @click="$emit('stepBack')" color="primary" :label="$t('Back')" class="q-ml-sm" />
</template>
