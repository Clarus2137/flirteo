<script setup lang="ts">
import { ref, onBeforeMount, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from 'src/stores/userStore';
import { useI18n } from 'vue-i18n';


const { t } = useI18n();

const emit = defineEmits(['goToGender', 'sendTitle']);

const title: PageTitle = {
    title: t('Your_Info.title'),
    subtitle: t('Your_Info.subtitle')
}

const level = ref('');
const options = ref<string[]>([]);

const isVisible = ref(false);

const userFirstName = ref('');
const userLastName = ref('');
const userDateOfBirth = ref('');
const userLocation = ref('');

const dateLocale = {
    days: t('Days').split('_'),
    daysShort: t('Days_Short').split('_'),
    months: t('Months').split('_'),
    monthsShort: t('Months_Short').split('_'),
    firstDayOfWeek: 1, // 0-6, 0 - Sunday, 1 Monday, ...
    format24h: true
}

const userStore = useUserStore();
const router = useRouter();

const addData = (e: Event) => {
    e.preventDefault();
    const firstName = userFirstName.value;
    const lastName = userLastName.value;
    const dateOfBirth = userDateOfBirth.value;
    const location = userLocation.value;

    const chosenLevel = userStore.educationLevels.filter(lvl => lvl.name === level.value);
    const educationLevel = `/api/education_levels/${chosenLevel[0].id}`;

    userStore.userEducation = level.value;

    const addingData: Partial<User> = {
        firstName,
        lastName,
        dateOfBirth,
        location,
        educationLevel
    }
    const isSuccess = userStore.addUserData(addingData);
    if (isSuccess) {
        // userStore.setEducationLevel(level.value);
        emit('goToGender');
    }

    userFirstName.value = '';
    userLastName.value = '';
    userDateOfBirth.value = '';
    userLocation.value = '';
    level.value = '';

}

const loadUserData = (strSessionStorage: string) => {
    const userData: Partial<User> = JSON.parse(strSessionStorage); // Assuming currentUser is the property holding user data. Adjust according to your store structure.
    userStore.user = userData;
    userStore.userEducation = userStore.user.educationLevel;
    userFirstName.value = userData.firstName || '';
    userLastName.value = userData.lastName || '';
    userDateOfBirth.value = userData.dateOfBirth || '';
    userLocation.value = userData.location || '';

    if (userStore.user.educationLevel !== null) {
        level.value = userStore.userEducation.name;
    } else {
        level.value = '';
    }
    console.log(userData);
}

onMounted(async () => {
    if (options.value[0]) {
        userStore.educationLevels.forEach(level => {
            options.value.push(level.name);
        });
    } else {
        await userStore.getEducation();
        console.log(userStore.educationLevels);
        userStore.educationLevels.forEach(level => {
            options.value.push(level.name);
        });
        console.log(options);
    }
});

onBeforeMount(() => {
    const strSessionStorage = sessionStorage.getItem('userData');
    if (strSessionStorage !== null) {
        loadUserData(strSessionStorage);
    }
    emit('sendTitle', title);
    userStore.setRouter(router);
});
</script>



<template>
    <div class="details__photo photo grid justify-center">
        <div class="photo__img inline-block p-1.5 rounded-[50%] w-[100px] h-[100px]">
            <img src="./../assets/user-male.png" class="h-full mx-auto" alt="User Male"
                v-if="userStore.user.gender !== 'female'">
            <img src="./../assets/user-female.png" class="h-full mx-auto" alt="User Female" v-else>
            <!-- <img src="./../assets/user-neutral.png" class="h-full mx-auto" alt="User Neutral" v-else> -->
        </div>
    </div>
    <form class="details__personal-data grow flex flex-col gap-y-[1.25vh]" @submit="addData">
        <div class="firstName">
            <CustomInput id="firstName" type="text" v-model="userFirstName" required />
            <label for="firstName">{{ t('First_Name') }}</label>
        </div>
        <div class="lastName">
            <CustomInput id="lastName" type="text" v-model="userLastName" required />
            <label for="lastName">{{ t('Last_Name') }}</label>
        </div>
        <div class="date">
            <CustomInput id="date" type="text" @click="isVisible = !isVisible" class="hover:cursor-pointer"
                v-model="userDateOfBirth" required />
            <label for="date">{{ t('Date_of_birth') }}</label>
        </div>
        <div class="location">
            <CustomInput id="location" type="text" v-model="userLocation" required />
            <label for="location">{{ t('Location') }}</label>
        </div>
        <!-- <div class="education">
            <CustomInput id="education" type="text" v-model="userEducation" required />
            <label for="education">{{ t('Education') }}</label>
        </div> -->
        <q-select v-model="level" :options="options" :label="t('Education')" class="education" />
        <div class="grow flex content-end">
            <CustomBtn type="submit">{{ t('Continue') }}</CustomBtn>
        </div>
    </form>
    <div class="w-full h-full absolute top-0 left-0 hover:cursor-pointer bg-black opacity-75"
        :class="{ 'hidden': !isVisible, 'block': isVisible }" @click="isVisible = !isVisible"></div>
    <div class="date-picker w-full text-center absolute duration-300" :class="{ 'visible': isVisible }">
        <q-date v-model="userDateOfBirth" :locale="dateLocale" mask="YYYY-MM-DD" color="pink-4" class="w-full mb-3" />
        <CustomBtn type="submit" class="max-w-[200px]" @click="isVisible = !isVisible">{{ t('Select') }}</CustomBtn>
    </div>
</template>



<style lang="scss">
.details__personal-data {
    &>* {
        width: 100%;
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
                border-radius: 5px;
                color: #f24e80;
                top: -6px;
            }
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

.education {
    .q-field__inner {
        padding: 0 14px;
        background: #fff;
        border-radius: 10px;

        .q-field__label {
            color: $text_primary;
            font-size: 0.75rem;
            font-weight: 300;
        }
    }
}

[id^="q-portal--dialog--"] {
    .q-dialog--modal {
        .q-field__inner {
            background: none;
        }

        .q-field--filled .q-field__control {
            background: none;

            &::before {
                background: none;
            }
        }

        .q-item__label {
            color: $text_primary;
        }
    }

}
</style>
