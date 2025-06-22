import AdminDashboard from '@/views/Admin/AdminDashboard.vue'
import AdminPage from '@/views/Admin/AdminPage.vue'
import AdminInvoice from '@/views/Admin/AdminInvoice.vue'
import Tenant from '@/views/Admin/Tenant.vue'
import ManageLandlord from '@/views/Admin/ManageLandlord.vue'
import CreateRoom from '@/views/Admin/CreateRoom.vue'
import CreateHouse from '@/views/Admin/CreateHouse.vue'
import EditTenant from '@/views/Admin/EditTenant.vue'
import EditLandlord from '@/views/Admin/EditLandlord.vue'
import MessagePage from '@/views/MessagePage.vue'
import Property from '@/views/Admin/Property.vue'
import EditProperty from '@/views/Admin/EditProperty.vue'

export default [
    {
        path: '/admin',
        name: 'Admin Page',
        component: AdminPage,
        redirect: { name: 'Admin Dashboard' },
        children: [
            {
                path: 'dashboard',
                name: 'Admin Dashboard',
                component: AdminDashboard
            },
            {
                path: 'property',
                name: 'Admin Dashboard Property',
                component: Property
            },
            {
                path: 'invoice',
                name: 'Admin Invoice',
                component: AdminInvoice
            },
            {
                path: 'room/create-house',
                name: 'Admin Create House',
                component: CreateHouse
            },
            {
                path: 'room/create-room',
                name: 'Admin Create Room',
                component: CreateRoom
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
            {
                path: "property/edit-property/:id/edit",
                name: "Admin Edit Property",
                component: EditProperty
            }
        ]

    }
]
