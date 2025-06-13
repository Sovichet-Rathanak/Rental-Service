import { defineStore } from 'pinia';

export const useNotificationStore = defineStore('notification', {
  state: () => ({
    filterType: 'all',
    notifications: [
        {
            id: 1,
            type: 'tour',
            name: 'Shen Yue',
            description: 'Your tour request has been accepted by the landlord.',
            date: '16 Mar',
            status: 'Approved',
            imgUrl: 'src/assets/images/pfp.jpg',
        },        
        {
            id: 2,
            type: 'rent',
            name: 'Shen Yue',
            description: 'Landlord has approved your rent. Do you want to pay now?',
            date: '14 Mar',
            status: 'Pending',
            imgUrl: 'src/assets/images/pfp.jpg'
        },
        {
            id: 3,
            type: 'rent',
            name: 'Shen Yue',
            description: 'You have successfully paid rent',
            date: '14 Mar',
            status: 'Approved',
            imgUrl: 'src/assets/images/pfp.jpg'
        },
        {
            id: 4,
            type: 'tour',
            name: 'Shen Yue',
            description: 'The landlord declined your tour request.',
            date: '15 Mar',
            status: 'Declined',
            imgUrl: 'src/assets/images/pfp.jpg'
        }, 
        {
            id: 5,
            type: 'rent',
            name: 'Shen Yue',
            description: 'You have declined rent.',
            date: '14 Mar',
            status: 'Declined',
            imgUrl: 'src/assets/images/pfp.jpg'
        },
        {
            id: 6,
            type: 'tour',
            name: 'Shen Yue',
            description: 'Your tour request is being reviewed by lanlord.',
            date: '14 Mar',
            status: 'Pending',
            imgUrl: 'src/assets/images/pfp.jpg'
        }
        ]
    }),
    getters: {
        filteredNotifications(state) {
        if (state.filterType === 'all') return state.notifications;
        return state.notifications.filter(n => n.type === state.filterType);
        }
    },
    actions: {
        setFilter(type) {
        this.filterType = type;
        },
        addNotification(notification) {
        this.notifications.unshift(notification); 
    }
    }
});
