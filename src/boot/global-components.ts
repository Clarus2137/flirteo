import { boot } from 'quasar/wrappers';
import HomeBtn from 'src/components/UI/HomeBtn.vue'
import CustomBtn from 'src/components/UI/CustomBtn.vue'
import BackBtn from 'src/components/UI/BackBtn.vue'
import CustomInput from 'src/components/UI/CustomInput.vue'
import TitleRow from 'src/components/UI/TitleRow.vue'

const components = [
   { name: 'HomeBtn', component: HomeBtn },
   { name: 'CustomBtn', component: CustomBtn },
   { name: 'BackBtn', component: BackBtn },
   { name: 'CustomInput', component: CustomInput },
   { name: 'TitleRow', component: TitleRow },
];

export default boot(({ app }) => {
   components.forEach(({ name, component }) => {
      app.component(name, component);
   });
});