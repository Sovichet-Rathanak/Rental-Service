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

export default [
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
]