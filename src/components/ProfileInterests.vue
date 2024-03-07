<script setup lang="ts">
import { ref } from 'vue';
import { interests as importedInterests } from './interests';
import { useUserStore } from 'src/stores/user';

const title = {
   title: 'Select your interests',
   subtitle: 'Select a few of your interests to match with users who have similar things in common'
}

interface Interests {
   name: string,
   img: string,
   checked: boolean
}

const interests = ref<Interests[]>(importedInterests)

const toggleActive = (item: Interests) => {
   item.checked = !item.checked;
}

const userStore = useUserStore();

// Inside your <script setup> tag
const saveInterests = () => {
   const activeInterests = interests.value
      .filter(item => item.checked)
      .map(item => ({ name: item.name, img: item.img }));
   userStore.updateUser({ interests: activeInterests }); // Update the call here
};

// You can call saveInterests directly in your template when the user clicks "Continue"
</script>



<template>
   <div class="profile__interests interests flex flex-col items-center gap-y-10">
      <div class="interests__title w-full">
         <TitleRow :title="title" />
      </div>
      <div class="interests__items interest w-full flex justify-start gap-6">
         <div v-for="item in interests" :key="item.name"
            class="interest__item flex flex-no-wrap gap-x-1 items-center p-2 rounded-xl border border-solid border-inactive hover:cursor-pointer"
            @click="toggleActive(item)" :class="{ 'border-transparent gradient-primary': item.checked }">
            <div v-html="item.img" class="inline-block"></div>
            <span class="capitalize">{{ item.name }}</span>
         </div>
      </div>
      <CustomBtn type="button" @click="saveInterests(); $router.push('match')">Continue</CustomBtn>
   </div>
</template>