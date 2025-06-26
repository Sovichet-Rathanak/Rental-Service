import EarningChartPage from '@/views/Landlord/EarningChartPage.vue'
import Calendar from '@/views/Landlord/Calendar.vue'
import ListingEditorPage from '@/views/Landlord/ListingEditorPage.vue'
import LandlordPage from '@/views/Landlord/LandlordPage.vue'
import ListingPage from '@/components/Landlord/LisitngPage.vue'
import NotificationPageLandlord from '@/views/Landlord/NotificationPageLandlord.vue'

export default [
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
        name: 'ListingEditor',
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
        path: 'notification',
        name: 'Landlord notification',
        component: NotificationPageLandlord,
      }
    ]
  },
]