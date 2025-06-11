import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/views/HomePage.vue'
import AccountSetting from '@/views/AccountSetting/AccountSetting.vue'
import ShowUser from '@/views/ShowUser.vue'
import DetailPage from '@/views/DetailPage.vue'
import PersonalInfoPage from '@/views/AccountSetting/PersonalInfoPage.vue'
import NotificationPageTenant from '@/views/AccountSetting/NotificationPageTenant.vue'
import InvoicePage from '@/views/AccountSetting/InvoicePage.vue'
import RentingList from '@/views/AccountSetting/RentingList.vue'
import PaymentPage from '@/views/AccountSetting/PaymentRelated/PaymentPage.vue'
import ManagePayment from '@/views/AccountSetting/PaymentRelated/ManagePayment.vue'
import AuthDisplay from '@/views/AuthScreen/AuthDisaply.vue'

import HelpCenterPage from '@/views/HelpCenterPage.vue'
import EarningChartPage from '@/views/Landlord/EarningChartPage.vue'
import Calendar from '@/views/Landlord/Calendar.vue'
import Message3 from '@/views/Message3.vue'
import ListingEditorPage from '@/views/Landlord/ListingEditorPage.vue'
import LandlordPage from '@/views/Landlord/LandlordPage.vue'
import ListingPage from '@/components/Landlord/LisitngPage.vue'
import WishlistPage from '@/views/WishlistPage.vue'
import LoginAndSecurity from '@/views/AccountSetting/LoginAndSecurity.vue'
import hostings_route from './hostings_route'
import NotificationPageLandlord from '@/views/Landlord/NotificationPageLandlord.vue'

// Admin related imports
import AdminDashboard from '@/views/Admin/AdminDashboard.vue' 
import AdminPage from '@/views/Admin/AdminPage.vue'
import AdminInvoice from '@/views/Admin/AdminInvoice.vue'
import House from '@/views/Admin/House.vue'
import Room from '@/views/Admin/Room.vue'
import Tenant from '@/views/Admin/Tenant.vue'
import ManageLandlord from '@/views/Admin/ManageLandlord.vue'
import CreateRoom from '@/views/Admin/CreateRoom.vue'
import CreateHouse from '@/views/Admin/CreateHouse.vue'
import EditTenant from '@/views/Admin/EditTenant.vue'
import EditRoom from '@/views/Admin/EditRoom.vue'
import EditLandlord from '@/views/Admin/EditLandlord.vue'
import EditHouse from '@/views/Admin/EditHouse.vue'

import Message4 from '@/views/Message4.vue'

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
    path: '/message4',
    name: 'Message and pop up',
    component: Message4
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
      {
        path: 'message3',
        name: 'Landlord Message',
        component: Message3,
      },
      {
        path: 'notification',
        name: 'Landlord notification',
        component: NotificationPageLandlord,
      }
    ]
  },
  {
    path: '/wishlist',
    name: 'Wishlist Page',
    component: WishlistPage,
  },
  {
    path: '/admin',
    name: 'Admin Page',
    component: AdminPage,
    redirect: { name: 'Admin Dashboard'},
    children: [
      { 
        path: 'dashboard',
        name: 'Admin Dashboard',
        component: AdminDashboard
      },

      {
        path: 'invoice',
        name: 'Admin Invoice',
        component: AdminInvoice
      },
      {
        path: 'house',
        name: 'Admin Dashboard House',
        component: House
      },
      {
        path: 'message3',
        name: 'Admin Message',
        component: Message3,
      },
      {
        path: 'room/create-house',
        name: 'Admin Create House',
        component: CreateHouse
      },
      {
        path: 'house/edit-house/:id',
        name: 'Admin Edit House',
        component: EditHouse
      },
      {
        path: 'room',
        name: 'Admin Dashboard Room',
        component: Room
      },
      {
        path: 'room/create-room',
        name: 'Admin Create Room',
        component: CreateRoom
      },
      {
        path: 'room/edit-room/:id',
        name: 'Admin Edit Room',
        component: EditRoom
      },
      {
        path: 'tenant',
        name: 'Admin Dashboard Tenant',
        component: Tenant
      },
      {
        path: 'tenant/edit-tenant/:id',
        name: 'Admin Edit Tenant',
        component: EditTenant
      },
      {
        path: 'manage-landlord',
        name: 'Admin Dashboard Landlord',
        component: ManageLandlord
      },
      {
        path: 'landlord/edit-landlord/:id',
        name: 'Admin Edit Landlord',
        component: EditLandlord
      },
    ]
    
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router