import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

// import ElementPlus from 'element-plus';
import 'element-plus/theme-chalk/index.css';
// import locale from 'element-plus/lib/locale/lang/zh-cn';
// import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import { Location, ElementPlus, UserFilled, Plus, Minus, UploadFilled } from '@element-plus/icons-vue';

import httpAuthority from './utils/httpAuthority';
// import httpExcel from "@/utils/httpExcel";

const app = createApp(App);
app.use(router).use(store);
// app.use(router).use(store).use(ElementPlus);
app.mount('#app');
app.component("Location", Location)
    .component("ElementPlus", ElementPlus)
    .component("UserFilled", UserFilled)
    .component("Plus", Plus)
    .component("Minus", Minus)
    .component("UploadFilled", UploadFilled);

// for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
//     app.component(key, component)
// }

app.config.globalProperties.$httpAuthority = httpAuthority;
// app.config.globalProperties.$httpExcel = httpExcel;
