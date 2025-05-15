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
import ListingEditorPage from '@/views/Landlord/ListingEditorPage.vue'
import ListingPage from '@/views/Landlord/ListingPage.vue'
import ListingOverview from '@/components/Landlord/ListingOverview.vue'

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
    path: '/listing',
    name: 'Listing Page',
    component: ListingPage,
    children: [
      {
        path: '',
        name: 'Listing Overview',
        component: ListingOverview
      },
      {
        path: 'listing-editor',
        name: 'Listing Editor',
        component: ListingEditorPage
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router