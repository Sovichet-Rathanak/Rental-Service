import { createRouter, createWebHistory } from 'vue-router'
// import Home from '@/App.vue' // Using @ alias for src
import Login from '@/components/headerComponents/LoginPage.vue' // Full path with extension

const routes = [
  // {
  //   path: '/',
  //   name: 'Home',
  //   component: Home
  // },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router