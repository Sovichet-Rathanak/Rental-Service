import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/views/HomePage.vue'
import AccountSetting from '@/views/AccountSetting/AccountSetting.vue'
import PersonalInfoPage from '@/views/AccountSetting/PersonalInfoPage.vue'
import NotificationPageTenant from '@/views/AccountSetting/NotificationPageTenant.vue'
import InvoicePage from '@/views/AccountSetting/InvoicePage.vue'
import RentingList from '@/views/AccountSetting/RentingList.vue'
import PaymentPage from '@/views/AccountSetting/PaymentRelated/PaymentPage.vue'
import ManagePayment from '@/views/AccountSetting/PaymentRelated/ManagePayment.vue'
import AuthDisplay from '@/views/AuthScreen/AuthDisplay.vue'

import HelpCenterPage from '@/views/HelpCenterPage.vue'
import WishlistPage from '@/views/WishlistPage.vue'
import LoginAndSecurity from '@/views/AccountSetting/LoginAndSecurity.vue'

import hostings_route from './hostings_route'
import admin_route from './admin_route'
import landlord_route from './landlord_route'
import MessagePage from '@/views/MessagePage.vue'


const routes = [
  ...hostings_route,
  ...admin_route,
  ...landlord_route,
  {
    path: '/',
    name: 'Home',
    component: HomePage,
  },
  {
    path: '/login-and-security',
    name: 'Login and Security',
    component: LoginAndSecurity
  },
  {
    path: '/login',
    name: 'Login',
    component: AuthDisplay
  },
  {
    path: '/account-setting',
    name: 'Account Setting',
    component: AccountSetting,
  },
  {
    path: '/accommodation/:id',
    name: 'Accommodation',
    component: () => import('@/views/DetailPage.vue'), //lazy loading for better performance
    props: true
  },
  {
    path: '/rent-list',
    name: 'Rent List',
    component: RentingList,
  },
  {
    path: '/payment',
    name: 'Payment',
    component: PaymentPage
  },
  {
    path: '/payment/manage-payment',
    name: 'Manage Payment',
    component: ManagePayment
  },
  {
    path: '/invoice',
    name: 'Invoice',
    component: InvoicePage,
  },
  {
    path: '/notification',
    name: 'Notification',
    component: NotificationPageTenant,
  },
  {
    path: '/personal-info',
    name: 'Personal Information',
    component: PersonalInfoPage,
  },
  {
    path: '/help-center',
    name: 'Help Center',
    component: HelpCenterPage,
  },
  {
    path: '/wishlist',
    name: 'Wishlist Page',
    component: WishlistPage,
  },
  {
    path: '/message',
    name: 'Message',
    component: MessagePage,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router