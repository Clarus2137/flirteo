<script setup lang="ts">

</script>



<template>
    <h1 class="lexend-bold text-2xl text-center mb-5">{{ $t('Catalog') }}</h1>
    <div class="catalog flex flex-col justify-center items-center gap-[5vw]">
        <div class="catalog__item pack flex flex-col gap-3 lexend">
            <p class="pack__title">{{ $t('Packages.base.title') }}</p>
            <ul class="pack__features">
                <li>{{ $t('Packages.base.size') }}</li>
                <li>{{ $t('Support') }}</li>
                <li>{{ $t('Set') }}</li>
            </ul>
            <CustomBtn class="hover-reverse"><span>{{ $t('Order') }}</span></CustomBtn>
        </div>
    </div>
</template>



<style scoped lang="scss">
.pack {
    min-width: 300px;
    width: 28vw;
    padding: 0.875rem;
    border-radius: 1rem;
    border: 2px solid transparent;
    background: $bg_gradient;
    color: #fff;
    transition: 0.7s;

    .pack__title {
        text-align: center;
    }

    &:hover {
        border: 2px solid $middle_color;
        background: #fff;
    }
}
</style>
