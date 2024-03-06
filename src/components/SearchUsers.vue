<script setup lang="ts">
import { ref } from 'vue'


const isActive = ref(false);
</script>



<template>
    <div class="user grid items-start content-start gap-y-10">
        <div class="user__top-row flex justify-between items-center">
            <div class="user__location location flex items-center gap-x-3">
                <svg width="25px" height="25px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg"
                    class="location__img">
                    <SvgGradient />
                    <path
                        d="M16.114-0.011c-6.559 0-12.114 5.587-12.114 12.204 0 6.93 6.439 14.017 10.77 18.998 0.017 0.020 0.717 0.797 1.579 0.797h0.076c0.863 0 1.558-0.777 1.575-0.797 4.064-4.672 10-12.377 10-18.998 0-6.618-4.333-12.204-11.886-12.204zM16.515 29.849c-0.035 0.035-0.086 0.074-0.131 0.107-0.046-0.032-0.096-0.072-0.133-0.107l-0.523-0.602c-4.106-4.71-9.729-11.161-9.729-17.055 0-5.532 4.632-10.205 10.114-10.205 6.829 0 9.886 5.125 9.886 10.205 0 4.474-3.192 10.416-9.485 17.657zM16.035 6.044c-3.313 0-6 2.686-6 6s2.687 6 6 6 6-2.687 6-6-2.686-6-6-6zM16.035 16.044c-2.206 0-4.046-1.838-4.046-4.044s1.794-4 4-4c2.207 0 4 1.794 4 4 0.001 2.206-1.747 4.044-3.954 4.044z"
                        fill=url(#gradient_primary)>
                    </path>
                </svg>
                <div class="location__info">
                    <p class="location__title lexend-bold text-xl mb-1.5">Location</p>
                    <p class="location__address lexend-light text-secondary text-sm">UserCountry, UserCity</p>
                </div>
            </div>
            <div class="user__subscription subscription">
                <svg width="25px" height="25px" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"
                    class="subscription__img" :class="{ 'active': isActive }" @click="isActive = !isActive">
                    <SvgGradient />
                    <path
                        d="M427.68,351.43C402,320,383.87,304,383.87,217.35,383.87,138,343.35,109.73,310,96c-4.43-1.82-8.6-6-9.95-10.55C294.2,65.54,277.8,48,256,48S217.79,65.55,212,85.47c-1.35,4.6-5.52,8.71-9.95,10.53-33.39,13.75-73.87,41.92-73.87,121.35C128.13,304,110,320,84.32,351.43,73.68,364.45,83,384,101.61,384H410.49C429,384,438.26,364.39,427.68,351.43Z"
                        fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="28px" />
                    <path d="M320,384v16a64,64,0,0,1-128,0V384" fill="none" stroke="#000" stroke-linecap="round"
                        stroke-linejoin="round" stroke-width="28px" />
                </svg>
            </div>
        </div>
        <div class="user__search-row">
            <CustomInput placeholder="Search" class="search" />
        </div>
        <div class="user__wrap relative">
            <div class="gradient-primary max-w-full aspect-[3/4] rounded-3xl"></div>
            <div class="user__info text-white absolute bottom-[5%] w-full p-5">
                <p class="text-lg">UserName, UserAge</p>
                <p class="lexend-light text-sm">Occupation</p>
            </div>
            <div class="users__controls flex justify-center items-end gap-x-8 absolute w-full bottom-[-20px]">
                <button type="button" class="user__btn p-1.5 rounded-full bg-white">
                    <svg width="25px" height="25px" viewBox="-3.5 0 19 19" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <linearGradient id="gradient_primary" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" style="stop-color:#ff84a7;stop-opacity:1" />
                                <stop offset="100%" style="stop-color:#e03368;stop-opacity:1" />
                            </linearGradient>
                        </defs>
                        <path
                            d="M11.383 13.644A1.03 1.03 0 0 1 9.928 15.1L6 11.172 2.072 15.1a1.03 1.03 0 1 1-1.455-1.456l3.928-3.928L.617 5.79a1.03 1.03 0 1 1 1.455-1.456L6 8.261l3.928-3.928a1.03 1.03 0 0 1 1.455 1.456L7.455 9.716z"
                            fill="#989394" />
                    </svg>
                </button>
                <button type="button" class="user__btn p-1.5 rounded-full bg-white">
                    <svg width="35px" height="35px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <linearGradient id="gradient_primary" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" style="stop-color:#ff84a7;stop-opacity:1" />
                                <stop offset="100%" style="stop-color:#e03368;stop-opacity:1" />
                            </linearGradient>
                        </defs>
                        <path fill=url(#gradient_primary)
                            d="M12 6.00019C10.2006 3.90317 7.19377 3.2551 4.93923 5.17534C2.68468 7.09558 2.36727 10.3061 4.13778 12.5772C5.60984 14.4654 10.0648 18.4479 11.5249 19.7369C11.6882 19.8811 11.7699 19.9532 11.8652 19.9815C11.9483 20.0062 12.0393 20.0062 12.1225 19.9815C12.2178 19.9532 12.2994 19.8811 12.4628 19.7369C13.9229 18.4479 18.3778 14.4654 19.8499 12.5772C21.6204 10.3061 21.3417 7.07538 19.0484 5.17534C16.7551 3.2753 13.7994 3.90317 12 6.00019Z" />
                    </svg>
                </button>
                <button type="button" class="user__btn p-1.5 rounded-full bg-white">
                    <svg width="25px" height="25px" viewBox="-1 0 19 19" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <linearGradient id="gradient_primary" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" style="stop-color:#ff84a7;stop-opacity:1" />
                                <stop offset="100%" style="stop-color:#e03368;stop-opacity:1" />
                            </linearGradient>
                        </defs>
                        <path
                            d="m12.673 10.779.798 4.02c.221 1.11-.407 1.566-1.395 1.013L8.5 13.81l-3.576 2.002c-.988.553-1.616.097-1.395-1.013l.397-2.001.401-2.02-1.51-1.397-1.498-1.385c-.832-.769-.592-1.507.532-1.64l2.026-.24 2.044-.242 1.717-3.722c.474-1.028 1.25-1.028 1.724 0l1.717 3.722 2.044.242 2.026.24c1.124.133 1.364.871.533 1.64L14.184 9.38z"
                            fill="#989394" />
                    </svg>
                </button>
            </div>
        </div>
    </div>
</template>



<style scoped lang="scss">
.user__search-row {
    position: relative;

    &::after {
        content: "";
        display: block;
        width: 20px;
        height: 20px;
        background: url("../assets/search.svg") no-repeat;
        background-size: contain;
        position: absolute;
        top: 50%;
        left: 14px;
        transform: translateY(-50%);
    }

    .search {
        padding-left: 40px;
    }
}

.active>path {
    stroke: url(#gradient_primary);
}

.user__btn {
    box-shadow: 0 0 5px 2px rgba(0, 0, 0, .15);
}
</style>