<script setup lang="ts">
import { ref } from 'vue';
import { useUserStore } from 'src/stores/userStore';
import UserView from 'src/components/UserView.vue';
import NoUser from 'src/components/NoUser.vue';


const userStore = useUserStore();
const showUserView = ref(true);

const isExists = userStore.isUserExists();
if (!isExists) {
    showUserView.value = !showUserView.value
}
</script>



<template>
    <UserView v-if="showUserView" />
    <NoUser v-else />
</template>
