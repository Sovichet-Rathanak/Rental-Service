import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/components/headerComponents/LoginPage.vue'
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

//Hosting Steps
import HostingSteps from '@/views/Landlord/HostingSteps/HostingSteps.vue'
import StepOverview from '@/views/Landlord/HostingSteps/StepOverview.vue'
import AboutPlace from '@/views/Landlord/HostingSteps/AboutPlace.vue'
import AccommodationType from '@/views/Landlord/HostingSteps/AccommodationType.vue'
import PlaceLocation from '@/views/Landlord/HostingSteps/PlaceLocation.vue'
import FloorPlan from '@/views/Landlord/HostingSteps/FloorPlan.vue'
import StandOut from '@/views/Landlord/HostingSteps/StandOut.vue'
import Amenities from '@/views/Landlord/HostingSteps/Amenities.vue'
import PropertyPhoto from '@/views/Landlord/HostingSteps/PropertyPhoto.vue'
import PropertyTitle from '@/views/Landlord/HostingSteps/PropertyTitle.vue'
import PropertyDesc from '@/views/Landlord/HostingSteps/PropertyDesc.vue'
import FinishPublish from '@/views/Landlord/HostingSteps/FinishPublish.vue'
import MonthlyPrice from '@/views/Landlord/HostingSteps/MonthlyPrice.vue'
import YearlyPrice from '@/views/Landlord/HostingSteps/YearlyPrice.vue'
import ListingReview from '@/views/Landlord/HostingSteps/ListingReview.vue'

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

const routes = [
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
    path: '/hosting-steps',
    name: 'Hosting Steps',
    component: HostingSteps,
    redirect: { name: 'Step Overview' },
    children: [
      {
        path: 'overview',
        name: 'Step Overview',
        component: StepOverview,
      },
      {
        path: 'about-your-place',
        name: 'About Place',
        component: AboutPlace,
      },
      {
        path: 'type',
        name: 'Type',
        component: AccommodationType,
      },
      {
        path: 'location',
        name: 'Location',
        component: PlaceLocation
      },
      {
        path: 'floor-plan',
        name: 'Floor Plan',
        component: FloorPlan
      },
      {
        path: 'stand-out',
        name: 'Stand Out',
        component: StandOut
      },
      {
        path: 'amenities',
        name: 'Amenities',
        component: Amenities
      },
      {
        path: 'photos',
        name: 'Photo',
        component: PropertyPhoto
      },
      {
        path: 'title',
        name: 'Title',
        component: PropertyTitle
      },
      {
        path: 'description',
        name: 'Description',
        component: PropertyDesc
      },
      {
        path: 'finish-setup',
        name: 'Finish Setup',
        component: FinishPublish
      },
      {
        path: 'monthly-price',
        name: 'Monthly Price',
        component: MonthlyPrice
      },
      {
        path: 'yearly-price',
        name: 'Yearly Price',
        component: YearlyPrice
      },
      {
        path: 'listing-review',
        name: 'Listing Review',
        component: ListingReview
      }
    ]
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