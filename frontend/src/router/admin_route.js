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
import MessagePage from '@/views/MessagePage.vue'

export default [
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
            path: 'message',
            name: 'Admin Message',
            component: MessagePage,
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
