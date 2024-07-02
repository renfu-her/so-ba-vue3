import { createApp } from 'vue';
import App from './App.vue';
import axios from 'axios';
import { createRouter, createWebHistory } from 'vue-router';
import UserManagement from './components/UsersManager.vue';
import AdminUserManager from './components/AdminUserManager.vue';
import ProductManager from './components/ProductManager.vue';
import MemberManager from './components/MemberManager.vue';

// 全局設置 axios，以便在組件中使用
axios.defaults.baseURL = 'https://so-ba-web.test/api';

import 'startbootstrap-sb-admin-2/css/sb-admin-2.min.css';
import './assets/css/custom.css';

// Font Awesome 設置
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';


// 添加所有的 solid 圖標到庫中
library.add(fas);


const routes = [
  {
    path: '/users',
    name: 'UserManagement',
    component: UserManagement,
  },
  {
    path: '/adminUsers',
    name: 'AdminUserManager',
    component: AdminUserManager,
  },
  {
    path: '/products',
    name: 'ProductManager',
    component: ProductManager,
  },
  {
    path: '/members',
    name: 'MemberManager',
    component: MemberManager,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const app = createApp(App);

app.component('font-awesome-icon', FontAwesomeIcon);
app.use(router);

app.mount('#app');
