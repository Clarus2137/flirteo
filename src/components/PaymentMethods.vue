<script setup lang="ts">
import { ref } from 'vue';

const emit = defineEmits(['stepBack']);

const method = ref('gpay');

const paymentStatus = ref<string | null>(null);
const paymentUrl = 'https://flirteo.eu/payments';

const openGooglePay = () => {
    if (window.cordova) {
        if (window.cordova.InAppBrowser) {
            const target = '_system';
            const options = 'location=yes';

            window.cordova.InAppBrowser.open(paymentUrl, target, options);
            paymentStatus.value = 'Ссылка открыта в системном браузере';
            alert('InAppBrowser открыт');
        } else {
            paymentStatus.value = 'InAppBrowser не поддерживается';
            alert('InAppBrowser не поддерживается');
        }
    } else {
        paymentStatus.value = 'Cordova не поддерживается';
        alert('Cordova не поддерживается');
    }
};

const stepBack = () => {
    emit('stepBack');
};
</script>

<template>
    <div class="payments lexend">
        <q-radio v-model="method" checked-icon="task_alt" unchecked-icon="panorama_fish_eye" val="gpay"
            label="Google Pay" />
    </div>

    <q-btn @click="openGooglePay" color="primary" :label="$t('Continue')" />
    <q-btn flat @click="stepBack" color="primary" :label="$t('Back')" class="q-ml-sm" />
</template>
