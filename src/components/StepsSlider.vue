<script setup lang="ts">
import { ref } from 'vue';
import imgFirst from './slideFirst.vue';
import imgSecond from './slideSecond.vue';
import imgThird from './slideThird.vue';
import { useI18n } from 'vue-i18n';

// const dialog = ref(true);
// const backdropFilter = ref('blur(4px)');

const { t } = useI18n();

const slideItem = ref('first');

const slideFirst = {
    id: 1,
    name: 'first',
    imgSrc: imgFirst,
    headline: t('Slide_first.title'),
    bodyText: t('Slide_first.subtitle')
}
const slideMiddle = {
    id: 2,
    name: 'middle',
    imgSrc: imgSecond,
    headline: t('Slide_second.title'),
    bodyText: t('Slide_second.subtitle')
}
const slideFinal = {
    id: 3,
    name: 'final',
    imgSrc: imgThird,
    headline: t('Slide_third.title'),
    bodyText: t('Slide_third.subtitle')
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
        swipeable animated class="grow rounded-borders bg-transparent h-auto">
        <template v-slot:navigation-icon="{ active, onClick }">
            <q-btn v-if="active" class="pag__btn pag__btn_active" flat round dense />
            <q-btn v-else class="pag__btn" flat round dense @click="onClick" />
        </template>
        <q-carousel-slide :name="slide.name" class="grid p-0" v-for="slide in slides" :key="slide.id">
            <div class="start__item grid grid-rows-[auto_min-content]">
                <component :is="slide.imgSrc" />
                <div class="start__details grid gap-y-5 self-end p-[4%] rounded-[30px]"
                    :class="{ 'bg-white': !$q.dark.isActive }">
                    <div class="details__title">
                        <h1 class="headline lexend-bold text-center" :class="{ 'text-black': !$q.dark.isActive }">
                            {{ slide.headline }}
                        </h1>
                        <p class="self-end body-text text-secondary text-center">
                            {{ slide.bodyText }}
                        </p>
                    </div>
                    <CustomBtn v-if="slide.id < 3" @click="slideNext">{{ t('Next') }}</CustomBtn>
                    <CustomBtn v-else @click="$router.push('/authorization')">{{ t('Get_started') }}</CustomBtn>
                </div>
            </div>
        </q-carousel-slide>
    </q-carousel>

    <!-- <q-dialog v-model="dialog" :backdrop-filter="backdropFilter" full-width>
        <q-card>
            <q-card-section class="row items-center justify-center q-pb-none text-h6">
                {{ t('ChooseLang') }}
            </q-card-section>

            <q-card-section class="flex justify-center items-center gap-[5vw]">

            </q-card-section>

            <q-card-actions class="flex justify-center">
                <q-btn flat :label="t('Save')" color="primary" v-close-popup />
            </q-card-actions>
        </q-card>
    </q-dialog> -->
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
