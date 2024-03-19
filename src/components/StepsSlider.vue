<script setup lang="ts">
import { ref } from 'vue';

const slideItem = ref('first');

const slideFirst = {
   id: 1,
   name: 'first',
   imgSrc: 'src/assets/welcome.png',
   headline: 'Find your partner with us',
   bodyText: 'Amet minim mollit non deserunt sit aliqua dolor do amet sint.'
}
const slideMiddle = {
   id: 2,
   name: 'middle',
   imgSrc: 'src/assets/dating.png',
   headline: 'Dating betteer than ever before',
   bodyText: 'Amet minim mollit non deserunt sit aliqua dolor do amet sint.'
}
const slideFinal = {
   id: 3,
   name: 'final',
   imgSrc: 'src/assets/match.png',
   headline: 'Find your perfect match',
   bodyText: 'Amet minim mollit non deserunt sit aliqua dolor do amet sint.'
}
const slides = [slideFirst, slideMiddle, slideFinal];

const slideNext = () => {
   const currentIndex = slides.findIndex(slide => slide.name === slideItem.value);
   const nextIndex = (currentIndex + 1); // Loop back to the first slide if at the end
   slideItem.value = slides[nextIndex].name;
};
</script>



<template>
   <q-carousel v-model="slideItem" transition-prev="slide-right" transition-next="slide-left" control-color="primary"
      swipeable animated navigation class="rounded-borders w-full h-full max-h-fit bg-transparent">
      <template v-slot:navigation-icon="{ active, onClick }">
         <q-btn v-if="active" class="pag__btn pag__btn_active" flat round dense />
         <q-btn v-else class="pag__btn" flat round dense @click="onClick" />
      </template>
      <q-carousel-slide :name="slide.name" class="column no-wrap flex-center p-0 relative" v-for="slide in slides"
         :key="slide.id">
         <div class="start__item h-full max-h-fit text-center">
            <img class="mx-auto" :src="slide.imgSrc" alt="Welcome">
            <div class="start__details bg-white mt-[30px] p-5 rounded-[30px]">
               <div class="details__title justify-center mb-[75px]">
                  <h1 class="headline lexend-bold w-full">
                     {{ slide.headline }}
                  </h1>
                  <p class="body-text text-secondary w-full">
                     {{ slide.bodyText }}
                  </p>
               </div>
               <!-- <div class="pag w-full my-[30px] flex justify-center items-center gap-x-[5px]">
                     <div class="pag__btn pag__btn_active"></div>
                     <div class="pag__btn"></div>
                     <div class="pag__btn"></div>
                  </div> -->
               <CustomBtn v-if="slide.id < 3" @click="slideNext">Next</CustomBtn>
               <CustomBtn v-else @click="$router.push('/authorization')">Get started</CustomBtn>
            </div>
         </div>
      </q-carousel-slide>
   </q-carousel>
</template>



<style lang="scss">
.q-carousel__navigation {
   height: 15px;
   bottom: 16%;
}

.q-panel {
   height: auto;
}

.q-carousel__navigation-inner {
   column-gap: 5px;
}

.q-carousel__navigation .q-btn {
   margin: 0;
   padding: 0;
}

.q-btn--dense.q-btn--round {
   min-width: 0;
   min-height: 0;
}

.start {
   flex-grow: 1;
}

.pag__btn {
   width: 5px;
   height: 5px;
   border-radius: 10px;
   background: rgba(152, 147, 148, 0.2);

   &_active {
      height: 100%;
      background: $bg_gradient;
   }
}
</style>