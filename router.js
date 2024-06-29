import { createRouter, createWebHistory } from 'vue-router';
import UserManagement from './components/UsersManager.vue';
import AdminUserManager from './components/AdminUserManager.vue'; // 假設你有另一個組件

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
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
