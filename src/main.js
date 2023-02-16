import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import ElementPlus from 'element-plus';
import 'element-plus/theme-chalk/index.css';
// import locale from 'element-plus/lib/locale/lang/zh-cn';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';

import httpAuthority from './utils/httpAuthority';

const app = createApp(App);
app.use(router).use(store).use(ElementPlus);
app.mount('#app');

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

app.config.globalProperties.$httpAuthority = httpAuthority;
