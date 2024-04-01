<script setup lang="ts">
import { ref } from 'vue';


const tab = ref('home');
</script>



<template>
    <q-tabs v-model="tab" switch-indicator narrow-indicator indicator-color="primary"
        class="bg-white text-white w-full fixed bottom-0">
        <q-route-tab name="home" to="/home" exact>
            <HomeTab />
        </q-route-tab>
        <q-route-tab name="chat" to="/chat" exact>
            <ChatTab />
        </q-route-tab>
        <q-route-tab name="profile" to="/profile" exact>
            <ProfileTab />
        </q-route-tab>
    </q-tabs>
</template>
