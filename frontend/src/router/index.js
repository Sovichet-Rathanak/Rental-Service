import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/views/HomePage.vue'
import AccountSetting from '@/views/AccountSetting/AccountSetting.vue'
import ShowUser from '@/views/ShowUser.vue'
import DetailPage from '@/views/DetailPage.vue'
import PersonalInfoPage from '@/views/AccountSetting/PersonalInfoPage.vue'
import NotificationPage from '@/views/AccountSetting/NotificationPage.vue'
import InvoicePage from '@/views/AccountSetting/InvoicePage.vue'
import RentingList from '@/views/AccountSetting/RentingList.vue'
import PaymentPage from '@/views/AccountSetting/PaymentRelated/PaymentPage.vue'
import ManagePayment from '@/views/AccountSetting/PaymentRelated/ManagePayment.vue'
import AuthDisplay from '@/views/AuthScreen/AuthDisaply.vue'

import HelpCenterPage from '@/views/HelpCenterPage.vue'
import EarningChartPage from '@/views/Landlord/EarningChartPage.vue'
import Calendar from '@/views/Landlord/Calendar.vue'
import Message from '@/views/Message.vue'
import Message1 from '@/views/Message1.vue'
import Message2 from '@/views/Message2.vue'
import Message3 from '@/views/Message3.vue'
import Message4 from '@/views/Message4.vue'
import ListingEditorPage from '@/views/Landlord/ListingEditorPage.vue'
import LandlordPage from '@/views/Landlord/LandlordPage.vue'
import ListingPage from '@/components/Landlord/LisitngPage.vue'
import WishlistPage from '@/views/WishlistPage.vue'
import LoginAndSecurity from '@/views/AccountSetting/LoginAndSecurity.vue'
import hostings_route from './hostings_route'

const routes = [
  ...hostings_route,
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
  {
    path: '/message',
    name: 'Message',
    component: Message,
  },
  {
    path: '/landlord',
    name: 'Landlord Page',
    component: LandlordPage,
    redirect: { name: 'Listing Page' },
    children: [
      {
        path: 'listing',
        name: 'Listing Page',
        component: ListingPage
      },
      {
        path: 'listing/listing-editor',
        name: 'Listing Editor',
        component: ListingEditorPage
      },
      {
        path: 'earning',
        name: 'Earning',
        component: EarningChartPage,
      },
      {
        path: 'calendar',
        name: 'Calendar',
        component: Calendar
      },
    ]
  },
  {
    path: '/wishlist',
    name: 'Wishlist Page',
    component: WishlistPage,
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router