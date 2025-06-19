import axios from "axios";
import { defineStore } from "pinia";

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
        },
        isLoggedIn: false,
        authToken: null
    }),
    actions: {
        async createUser(userData) {
            try {
                const userRsp = await axios.post('http://localhost:3000/api/user/', userData);
                console.log('Registration Successful: ', userRsp.data);

                //Login automatically when user successfuly create an account
                await this.handleLogIn({
                    email: userData.email,
                    password: userData.password
                })

                return userRsp.data;
            } catch (error) {
                console.log('Registration error: ', error);
                throw error;
            }
        },

        async handleLogIn(credentials) {
            try {
                const userRsp = await axios.post('http://localhost:3000/api/auth/login', credentials);
                const { accessToken, user } = userRsp.data;

                this.user = {
                    id: user.id,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    email: user.email,
                    role: user.role,
                    pfp_original_url: user.pfp_original_url || '',
                    pfp_thumbnail_url: user.pfp_thumbnail_url || '',
                };

                this.isLoggedIn = true;

                if (accessToken) {
                    this.authToken = accessToken;
                    axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
                }

                console.log('Login Successful: ', this.user);
                console.log('Token deez balls: ', this.authToken);
                return this.user;
            } catch (error) {
                console.log('Login error: ', error);
                this.clearUser();
                throw error;
            }
        },

        handleLogOut() {
            this.clearUser();
            localStorage.removeItem('token'); 
        },

        async handlePfp(event) {
            console.log(event.target.files[0])
            const pfp = event.target.files[0];
            if (!pfp) return;
            const formData = new FormData();
            formData.append('file', pfp);
            try {
                const pfpRsp = await axios.post(`http://localhost:3000/api/user/${this.user.id}/profile-picture`, formData, {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${this.authToken}`
                })
                console.log(pfpRsp);

                this.user.pfp_original_url = pfpRsp.data.pfp_original_url;
                this.user.pfp_thumbnail_url = pfpRsp.data.pfp_thumbnail_url;
            } catch (error) {
                console.error("Error: ", error)
            }
        },

        async fetchCurrentUser() {
            if (!this.authToken && !this.user.email) {
                console.log('error')
                return;
            }

            try {
                let rsp;
                if (this.authToken) {
                    rsp = await axios.get('http://localhost:3000/api/user/me')
                } else if (this.user.email) {
                    rsp = await axios.get(`http://localhost:3000/api/user/email/${this.user.email}`);
                }

                if (rsp && rsp.data) {
                    this.user = { ...this.user, ...rsp.data };
                    this.isLoggedIn = true;
                }
            } catch (error) {
                console.log('Failed to fetch user: ', error);
                this.clearUser();
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

            this.isLoggedIn = false;
            delete axios.defaults.headers.common['Authorization'];
        },

        async initializeAuth() {
            if (this.authToken) {
                try {
                    await this.fetchCurrentUser();
                } catch (error) {
                    console.log('Stored auth invalid');
                    this.clearUser();
                }
            }
        }
    },
    persist: true
})

//Account settings (TBD) (3h)
//Filtering (3h - 12h (in case of geolocation filtering))
//Add coord to each listing  (4h update listing steps as well)
//Show more function on the homepage