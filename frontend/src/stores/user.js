import axios from "axios";
import { defineStore } from "pinia";
import { stringifyQuery } from "vue-router";

export const useUserStore = defineStore('user', {
    state: () => ({
        user: {
            id: '',
            firstname: '',
            lastname: '',
            email: '',
            role: '',
            pfp_original_url: '',
            pfp_thumbnail_url: '',
        }
    }),
    actions: {
        async createUser(userData) {
            this.user = { ...userData};
            try{
               const userRsp = await axios.post('http://localhost:3000/api/user/', userData);
                this.user = {...userRsp.data};
                console.log(this.user);
            }catch(error){
                console.log('Found error: ', error);
            }
        },

        clearUser() {
            this.user = {
                id: '',
                firstname: '',
                lastname: '',
                email: '',
                role: '',
                pfp_original_url: '',
                pfp_thumbnail_url: '',
            }
        },
    },
    persist: true
})