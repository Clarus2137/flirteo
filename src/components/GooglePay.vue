<!-- <template>
    <div id="container"></div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import { useOrderStore } from 'src/stores/orderStore';

const emit = defineEmits(['paymentSuccess']);

const orderStore = useOrderStore();

const environment = 'TEST'; // Измените на 'PRODUCTION' в боевом окружении

const paymentRequest: google.payments.api.PaymentDataRequest = {
    apiVersion: 2,
    apiVersionMinor: 0,
    allowedPaymentMethods: [
        {
            type: 'CARD',
            parameters: {
                allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
                allowedCardNetworks: ['AMEX', 'DISCOVER', 'JCB', 'MASTERCARD', 'VISA']
            },
            tokenizationSpecification: {
                type: 'PAYMENT_GATEWAY',
                parameters: {
                    gateway: 'stripe', // или другой платёжный шлюз, который вы используете
                    'stripe:version': '2020-08-27',
                    'stripe:publishableKey': 'pk_test_TYooMQauvdEDq54NiTphI7jx'
                }
            }
        }
    ],
    merchantInfo: {
        merchantName: 'Example Merchant'
    },
    transactionInfo: {
        totalPriceStatus: 'FINAL',
        totalPriceLabel: 'Total',
        totalPrice: `${orderStore.order.orderPrice}`, // Укажите цену
        currencyCode: 'PLN', // Валюта для Польши
        countryCode: 'PL' // Код страны для Польши
    }
};

const onLoadPaymentData = (paymentData: google.payments.api.PaymentData) => {
    console.log('PaymentData loaded', paymentData);
    // Обработка данных платежа
    emit('paymentSuccess');
};

const loadScript = (src: string) => {
    return new Promise<void>((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.async = true;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
        document.head.appendChild(script);
    });
};

const checkForGooglePay = async () => {
    try {
        let isAvailable = await cordova.plugins.ApplePayGooglePay.canMakePayments();
        if (isAvailable) {
            console.log('Google Pay is available');
            alert('Google Pay is available')
        } else {
            console.log('Google Pay is not available');
            alert('Google Pay is not available');
        }
    } catch (error) {
        console.error('Error checking Google Pay availability:', error);
    }
};

const onDeviceReady = () => {
    checkForGooglePay();
};

onMounted(async () => {
    try {
        await loadScript('https://pay.google.com/gp/p/js/pay.js');
        const paymentsClient = new google.payments.api.PaymentsClient({ environment });
        const isReadyToPayRequest = {
            apiVersion: 2,
            apiVersionMinor: 0,
            allowedPaymentMethods: paymentRequest.allowedPaymentMethods
        };
        const isReadyToPay = await paymentsClient.isReadyToPay(isReadyToPayRequest);
        if (isReadyToPay.result) {
            const button = paymentsClient.createButton({
                onClick: () => {
                    paymentsClient.loadPaymentData(paymentRequest).then(onLoadPaymentData).catch((err) => {
                        if (err.statusCode === 'CANCELED') {
                            console.warn('User canceled the payment request.');
                        } else {
                            console.error('Error loading payment data', err);
                        }
                    });
                }
            });
            const container = document.getElementById('container');
            if (container !== null) {
                container.appendChild(button);
            }
        } else {
            console.error('Google Pay is not available on this device.');
        }
    } catch (error) {
        console.error(error);
    }

    document.addEventListener('deviceready', onDeviceReady, false);
});

onUnmounted(() => {
    const script = document.querySelector('script[src="https://pay.google.com/gp/p/js/pay.js"]');
    if (script) {
        document.head.removeChild(script);
    }
    document.removeEventListener('deviceready', onDeviceReady);
});
</script> -->





<!-- <template>
    <div id="container">
        <button @click="openPaymentPage">Pay with Google Pay</button>
    </div>
</template>

<script setup lang="ts">
import { useOrderStore } from 'src/stores/orderStore';

const emit = defineEmits(['paymentSuccess']);

const orderStore = useOrderStore();

const environment = 'TEST'; // Измените на 'PRODUCTION' в боевом окружении

const paymentRequest = {
    apiVersion: 2,
    apiVersionMinor: 0,
    allowedPaymentMethods: [
        {
            type: 'CARD',
            parameters: {
                allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
                allowedCardNetworks: ['AMEX', 'DISCOVER', 'JCB', 'MASTERCARD', 'VISA']
            },
            tokenizationSpecification: {
                type: 'PAYMENT_GATEWAY',
                parameters: {
                    gateway: 'stripe', // или другой платёжный шлюз, который вы используете
                    'stripe:version': '2020-08-27',
                    'stripe:publishableKey': 'pk_test_TYooMQauvdEDq54NiTphI7jx'
                }
            }
        }
    ],
    merchantInfo: {
        merchantName: 'Example Merchant'
    },
    transactionInfo: {
        totalPriceStatus: 'FINAL',
        totalPriceLabel: 'Total',
        totalPrice: `${orderStore.order.orderPrice}`, // Укажите цену
        currencyCode: 'PLN', // Валюта для Польши
        countryCode: 'PL' // Код страны для Польши
    }
};

const openPaymentPage = () => {
    const url = new URL('https://flirteo.eu/payments');
    url.searchParams.set('paymentRequest', JSON.stringify(paymentRequest));
    window.open(url.toString(), '_blank');
};
</script> -->



<template>
    <div>
        <h2>Оплата</h2>
        <button @click="openGooglePay">Оплатить с Google Pay</button>
        <div v-if="paymentStatus">
            <p>{{ paymentStatus }}</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const paymentStatus = ref<string | null>(null);
const paymentUrl = 'https://flirteo.eu/payments'; // Укажите ваш URL для оплаты

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
};
</script>

<style scoped>
button {
    margin-top: 1em;
}
</style>
