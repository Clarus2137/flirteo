<script setup lang="ts">
import { ref } from 'vue';
import imgFirst from './../assets/welcome.png';
import imgSecond from './../assets/dating.png';
import imgThird from './../assets/match.png';

const slideItem = ref('first');

const slideFirst = {
    id: 1,
    name: 'first',
    imgSrc: imgFirst,
    headline: 'Koniec z nieśmiałością!',
    bodyText: 'Czy czujesz tremę na samą myśl o zagadaniu do kogoś? Flirteo pomoże Ci przełamać lody i pokaże jak łatwe może być nawiązywanie nowych kontaktów!'
}
const slideMiddle = {
    id: 2,
    name: 'middle',
    imgSrc: imgSecond,
    headline: 'Zostań mistrzem flitru!',
    bodyText: 'Flirteo wykorzystuje AI, oferując inteligentnie dopasowane podpowiedzi, które sprawią, że każda rozmowa będzie prostsza i bardziej naturalna.'
}
const slideFinal = {
    id: 3,
    name: 'final',
    imgSrc: imgThird,
    headline: 'Darmowa rejestracja.',
    bodyText: 'Rejestrując się w Flirteo, odkryjesz, jak łatwo jest zamienić nieśmiałość na pewność siebie.'
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
        swipeable animated class="rounded-borders bg-transparent h-auto">
        <template v-slot:navigation-icon="{ active, onClick }">
            <q-btn v-if="active" class="pag__btn pag__btn_active" flat round dense />
            <q-btn v-else class="pag__btn" flat round dense @click="onClick" />
        </template>
        <q-carousel-slide :name="slide.name" class="grid p-0" v-for="slide in slides" :key="slide.id">
            <div class="start__item grid grid-rows-[auto_min-content]">
                <img class="max-w-100% mx-auto self-center" :src="slide.imgSrc" alt="Welcome">
                <div class="start__details grid gap-y-5 self-end bg-white p-[4%] rounded-[30px]">
                    <div class="details__title">
                        <h1 class="headline lexend-bold text-center">
                            {{ slide.headline }}
                        </h1>
                        <p class="self-end body-text text-secondary text-center">
                            {{ slide.bodyText }}
                        </p>
                    </div>
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
