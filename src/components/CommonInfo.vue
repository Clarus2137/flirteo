<script setup lang="ts">
import { ref } from 'vue';
import { useUserStore } from 'src/stores/userStore';


const emit = defineEmits(['goToGender']);

const isVisible = ref(false);

const userFirstName = ref('');
const userLastName = ref('');
const userDateOfBirth = ref('');
const userLocation = ref('');

const userStore = useUserStore();

const addData = (e: Event) => {
    e.preventDefault();
    const firstName = userFirstName.value;
    const lastName = userLastName.value;
    // const dateOfBirth = userDateOfBirth.value ? userDateOfBirth.value : new Date().toISOString().split('T')[0];
    const dateOfBirth = userDateOfBirth.value;
    const location = userLocation.value;

    const addingData: Partial<User> = {
        firstName,
        lastName,
        dateOfBirth,
        location
    }
    console.log('Adding Data is: ', addingData);
    const isSuccess = userStore.addUserData(addingData);
    if (isSuccess) {
        emit('goToGender');
    }

    userFirstName.value = '';
    userLastName.value = '';
    userDateOfBirth.value = '';
    userLocation.value = '';
}
</script>



<template>
    <div class="details__photo photo text-center">
        <div class="photo__img inline-block rounded-[50%] w-[100px] aspect-square"></div>
    </div>
    <form class="details__personal-data flex flex-col gap-y-3" @submit="addData">
        <div class="firstName">
            <CustomInput id="firstName" type="text" v-model="userFirstName" required />
            <label for="firstName">First Name</label>
        </div>
        <div class="lastName">
            <CustomInput id="lastName" type="text" v-model="userLastName" required />
            <label for="lastName">Last Name</label>
        </div>
        <div class="date">
            <CustomInput id="date" type="text" @click="isVisible = !isVisible" class="hover:cursor-pointer"
                v-model="userDateOfBirth" required />
            <label for="date">Date of birth</label>
        </div>
        <div class="location">
            <CustomInput id="location" type="text" v-model="userLocation" required />
            <label for="location">Location</label>
        </div>
        <CustomBtn type="submit">Continue</CustomBtn>
    </form>
    <div class="w-full h-full absolute top-0 left-0 hover:cursor-pointer bg-black opacity-75"
        :class="{ 'hidden': !isVisible, 'block': isVisible }" @click="isVisible = !isVisible"></div>
    <div class="date-picker w-full text-center absolute duration-300" :class="{ 'visible': isVisible }">
        <q-date v-model="userDateOfBirth" mask="YYYY-MM-DD" color="pink-4" text-color="black" class="w-full mb-3" />
        <CustomBtn type="submit" class="max-w-[200px]" @click="isVisible = !isVisible">Select</CustomBtn>
    </div>
</template>



<style scoped lang="scss">
.details__personal-data>* {
    position: relative;

    label {
        padding: 0 3px;
        font-size: 0.75rem;
        line-height: 1;
        position: absolute;
        top: 3px;
        left: 20px;
        transition: 0.3s;
    }

    input:active,
    input:focus {
        &+label {
            background: #fff;
            color: #f24e80;
            top: -6px;
        }
    }
}

[type="date"] {
    background: transparent;
    position: relative;

    &::-webkit-calendar-picker-indicator {
        opacity: 0;
    }

    &::after {
        content: "";
        display: block;
        width: 20px;
        height: 20px;
        background: url("../assets/calendar.svg") no-repeat;
        background-size: contain;
        position: absolute;
        top: 50%;
        right: 18px;
        transform: translateY(-50%);
        z-index: -1;
    }

    &:focus,
    &:active {
        &::after {
            background: url("../assets/calendar-active.svg") no-repeat;
        }
    }
}

.date-picker {
    top: 110%;
    left: 0;
    opacity: 0;

    &.visible {
        top: 50%;
        transform: translateY(-50%);
        opacity: 1;
    }
}
</style>
