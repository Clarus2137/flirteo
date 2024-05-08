<script setup lang="ts">
import { ref } from 'vue';


const emit = defineEmits(['agreement']);

const isAgreed = ref(false);

const switchAgreement = () => {
    emit('agreement');
}
</script>



<template>
    <div class="reg_privacy text-center lexend-light text-sm">
        <div class="permition inline-block">
            <svg width="15px" height="15px" viewBox="0 0 14.85 15" xmlns="http://www.w3.org/2000/svg" v-if="!isAgreed">
                <g id="SVGRepo_iconCarrier">
                    <g fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
                        <path
                            d="m2.5.5h10c1.1045695 0 2 .8954305 2 2v10c0 1.1045695-.8954305 2-2 2h-10c-1.1045695 0-2-.8954305-2-2v-10c0-1.1045695.8954305-2 2-2z"
                            stroke="#989394" stroke-width="2"></path>
                    </g>
                </g>
            </svg>
            <svg width="15px" height="15px" viewBox="0 0 14.85 15" xmlns="http://www.w3.org/2000/svg" v-else>
                <SvgGradient />
                <g id="SVGRepo_iconCarrier">
                    <g fill="url(#gradient_primary)" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
                        <path
                            d="m2.5.5h10c1.1045695 0 2 .8954305 2 2v10c0 1.1045695-.8954305 2-2 2h-10c-1.1045695 0-2-.8954305-2-2v-10c0-1.1045695.8954305-2 2-2z"
                            stroke="transparent" stroke-width="2"></path>
                        <path d="m4.5 7.5 2 2 4-4" stroke="#fff" stroke-width="2"></path>
                    </g>
                </g>
            </svg>
            <input type="checkbox" id="permission" name="permission" v-model="isAgreed" @change="switchAgreement"
                class="hover:cursor-pointer">
        </div>
        <label for="permission" class="hover:cursor-pointer">
            {{ $t('Terms_and_Privacy.Accept') }} <p><span><router-link class="text-gradient-primary" to="/terms">{{
                $t('Terms_and_Privacy.Terms')
            }}</router-link></span> {{ $t('Terms_and_Privacy.And') }} <span><router-link
                        class="text-gradient-primary" to="/privacy">{{ $t('Terms_and_Privacy.Privacy')
                        }}</router-link></span></p>
        </label>
    </div>
</template>



<style scoped lang="scss">
.permition {
    width: 15px;
    height: 15px;
    margin-right: 10px;
    position: relative;

    * {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
    }

    input {
        opacity: 0;
    }
}

a {
    border-bottom: 2px solid transparent;

    &:hover {
        border-color: $middle_color;
    }
}
</style>
