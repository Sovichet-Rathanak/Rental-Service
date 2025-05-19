import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/components/headerComponents/LoginPage.vue' // Full path with extension
import HomePage from '@/views/HomePage.vue'
import AccountSetting from '@/views/AccountSetting.vue'
import ShowUser from '@/views/ShowUser.vue'
import DetailPage from '@/views/DetailPage.vue'
import PersonalInfoPage from '@/views/PersonalInfoPage.vue'
import NotificationPage from '@/views/NotificationPage.vue'
import InvoicePage from '@/views/InvoicePage.vue'
import RentingList from '@/views/RentingList.vue'
import PaymentPage from '@/views/PaymentRelated/PaymentPage.vue'
import ManagePayment from '@/views/PaymentRelated/ManagePayment.vue'
import HostingSteps from '@/views/HostViews/HostingSteps.vue'
import StepOverview from '@/views/HostViews/StepOverview.vue'
import AboutPlace from '@/views/HostViews/AboutPlace.vue'
import AccommodationType from '@/views/HostViews/AccommodationType.vue'
import PlaceLocation from '@/views/HostViews/PlaceLocation.vue'
import FloorPlan from '@/views/HostViews/FloorPlan.vue'
import StandOut from '@/views/HostViews/StandOut.vue'
import Amenities from '@/views/HostViews/Amenities.vue'
import PropertyPhoto from '@/views/HostViews/PropertyPhoto.vue'
import PropertyTitle from '@/views/HostViews/PropertyTitle.vue'
import PropertyDesc from '@/views/HostViews/PropertyDesc.vue'
import FinishPublish from '@/views/HostViews/FinishPublish.vue'
import MonthlyPrice from '@/views/HostViews/MonthlyPrice.vue'
import YearlyPrice from '@/views/HostViews/YearlyPrice.vue'
import ListingReview from '@/views/HostViews/ListingReview.vue'
import HelpCenterPage from '@/views/HelpCenterPage.vue'
import EarningChartPage from '@/views/EarningChartPage.vue'
import CalendarPage from '@/components/bannerComponents/landlord/calendarPage.vue'

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
    path: '/helpCenter',
    name: 'Help Center',
    component: HelpCenterPage,
  },
  {
    path: '/earningChart',
    name: 'earningChart',
    component: EarningChartPage,
  },
  {
    path: '/hosting-steps',
    name: 'Hosting Steps',
    component: HostingSteps,
    redirect: {name: 'Step Overview'},
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
        name:'Description',
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
  }
  {
    path: '/landlordCalendar',
    name: 'landlordCalendar',
    component: CalendarPage
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router