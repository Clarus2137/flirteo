import { boot } from 'quasar/wrappers';
import HomeBtn from 'src/components/UI/HomeBtn.vue';
import CustomBtn from 'src/components/UI/CustomBtn.vue';
import BackBtn from 'src/components/UI/BackBtn.vue';
import CustomInput from 'src/components/UI/CustomInput.vue';
import TitleRow from 'src/components/UI/TitleRow.vue';
import HomeTab from 'src/components/UI/HomeTab.vue';
import SearchTab from 'src/components/UI/SearchTab.vue';
import FavoritesTab from 'src/components/UI/FavoritesTab.vue';
import ChatTab from 'src/components/UI/ChatTab.vue';
import ProfileTab from 'src/components/UI/ProfileTab.vue';
import ArrowTriangle from 'src/components/UI/ArrowTriangle.vue';
import DetailsIcon from 'src/components/UI/DetailsIcon.vue';
import SettingsIcon from 'src/components/UI/SettingsIcon.vue';
import TermsIcon from 'src/components/UI/TermsIcon.vue';
import PrivacyIcon from 'src/components/UI/PrivacyIcon.vue';
import AboutIcon from 'src/components/UI/AboutIcon.vue';
import SvgGradient from 'src/components/UI/SvgGradient.vue';
import FormLoader from 'src/components/UI/FormLoader.vue';
import CommonInfo from 'src/components/CommonInfo.vue';
import UserGender from 'src/components/UserGender.vue';
import LoadingScreen from 'src/components/LoadingScreen.vue';


const components = [
    { name: 'HomeBtn', component: HomeBtn },
    { name: 'CustomBtn', component: CustomBtn },
    { name: 'BackBtn', component: BackBtn },
    { name: 'CustomInput', component: CustomInput },
    { name: 'TitleRow', component: TitleRow },
    { name: 'HomeTab', component: HomeTab },
    { name: 'SearchTab', component: SearchTab },
    { name: 'FavoritesTab', component: FavoritesTab },
    { name: 'ChatTab', component: ChatTab },
    { name: 'ProfileTab', component: ProfileTab },
    { name: 'ArrowTriangle', component: ArrowTriangle },
    { name: 'DetailsIcon', component: DetailsIcon },
    { name: 'SettingsIcon', component: SettingsIcon },
    { name: 'TermsIcon', component: TermsIcon },
    { name: 'PrivacyIcon', component: PrivacyIcon },
    { name: 'AboutIcon', component: AboutIcon },
    { name: 'SvgGradient', component: SvgGradient },
    { name: 'FormLoader', component: FormLoader },
    { name: 'CommonInfo', component: CommonInfo },
    { name: 'UserGender', component: UserGender },
    { name: 'LoadingScreen', component: LoadingScreen }
];

export default boot(({ app }) => {
    components.forEach(({ name, component }) => {
        app.component(name, component);
    });
});
