import { createRouter, createWebHistory } from 'vue-router'
// import Home from '@/App.vue' // Using @ alias for src
import Login from '@/components/headerComponents/LoginPage.vue' // Full path with extension
import HomePage from '@/views/HomePage.vue'
import AccountSetting from '@/views/AccountSetting.vue'
import ShowUser from '@/views/ShowUser.vue'
import DetailPage from '@/views/DetailPage.vue'
import PersonalInfoPage from '@/views/PersonalInfoPage.vue'
import AccommadationImg from '@/components/AccommadationImg.vue'
import NotificationPage from '@/views/NotificationPage.vue'
import InvoicePage from '@/views/InvoicePage.vue' 
import RentingList from '@/views/RentingList.vue'
import PaymentPage from '@/views/PaymentRelated/PaymentPage.vue'
import ManagePayment from '@/views/PaymentRelated/ManagePayment.vue'
import Message from '@/views/Message.vue'
import Message1 from '@/views/Message1.vue'
import Message2 from '@/views/Message2.vue'
import Message3 from '@/views/Message3.vue'
import Message4 from '@/views/Message4.vue'


const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/account-setting',
    name: 'Account Setting',
    component: AccountSetting,
  },
  {
    path: '/show-user',
    name: 'Show User',
    component: ShowUser,
  },
  {
    path: '/accommodation',
    name: 'Accommodation',
    component: DetailPage,
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
    component: NotificationPage,
  },
  {
    path: '/personalInfo',
    name: 'personalInfo',
    component: PersonalInfoPage,
  },
  {
    path: '/message',
    name: 'Message',
    component: Message,
  },
  {
    path: '/message1',
    name: 'Message1',
    component: Message1,
  },
    {
    path: '/message2',
    name: 'Message2',
    component: Message2,
  },
  {
    path: '/message3',
    name: 'Message3',
    component: Message3,
  },
  {
    path: '/message4',
    name: 'Message4',
    component: Message4,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router