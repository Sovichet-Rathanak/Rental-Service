<template>
    <div class="container">
        <div class="floating-card">
            <div class="card-left">
                <div class="image-section">
                    <img src="../../assets/images/bg-login.jpg" alt="Welcome" class="login-image" />
                </div>
            </div>

            <div class="card-right">
                <div class="auth-section">
                    <hgroup>
                        <h2 v-if="!isSignUp" style="color: #345FCC">
                            Welcome Back!</h2>
                        <h2 v-else style="color: #345FCC;">Create Account</h2>
                        <h3 v-if="!isSignUp">Sign in to manage your bookings and explore new stays</h3>
                        <h3 v-else>Join us to book amazing stays and experiences</h3>
                    </hgroup>

                    <form @submit.prevent="isSignUp ? handleSignUp() : handleLogin()" class="auth-form">
                        <div v-if="isSignUp" class="name-row">
                            <div class="input-group">
                                <label for="firstName">First Name</label>
                                <input type="text" id="firstName" v-model="firstName" placeholder="Enter first name"
                                    required />
                            </div>
                            <div class="input-group">
                                <label for="lastName">Last Name</label>
                                <input type="text" id="lastName" v-model="lastName" placeholder="Enter last name"
                                    required />
                            </div>
                        </div>

                        <div class="input-group">
                            <label for="email">Email</label>
                            <input type="email" id="email" v-model="email" placeholder="Enter your email" required />
                        </div>

                        <div class="input-group">
                            <label for="password">Password</label>
                            <input type="password" id="password" v-model="password"
                                :placeholder="isSignUp ? 'Create a password (min 8 characters)' : 'Enter your password'"
                                :minlength="isSignUp ? 8 : undefined" required />
                        </div>

                        <div v-if="isSignUp" class="input-group">
                            <label for="confirmPassword">Confirm Password</label>
                            <input type="password" id="confirmPassword" v-model="confirmPassword"
                                placeholder="Confirm your password" required />
                        </div>

                        <button type="submit" class="auth-btn">
                            {{ isSignUp ? 'Create Account' : 'Sign In' }}
                        </button>

                        <div class="form-footer">
                            <div v-if="!isSignUp" class="forgot-password">
                                <a href="#" @click.prevent="forgotPassword">Forgot your password?</a>
                            </div>

                            <div class="toggle-mode">
                                <span v-if="!isSignUp">Don't have an account? </span>
                                <span v-else>Already have an account? </span>
                                <a href="#" @click.prevent="toggleMode">
                                    {{ isSignUp ? 'Sign In' : 'Sign Up' }}
                                </a>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { useUserStore } from '@/stores/user';
import { mapStores } from 'pinia';

export default {
    name: 'LoginScreen',
    data() {
        return {
            isSignUp: false,
            firstName: '',
            lastName: '',
            email:'',
            password: '',
            confirmPassword: ''
        }
    },
    computed: {
        ...mapStores(useUserStore)
    },
    methods: {
        toggleMode() {
            this.isSignUp = !this.isSignUp;
            this.email = '';
            this.password = '';
            this.firstName = '';
            this.lastName = '';
            this.confirmPassword = '';
        },

        async handleSignUp(){
            if(this.password !== this.confirmPassword){
                alert("Make Sure Password and Confrim Password Match")
                return;
            }

            const newUser = {
                firstname: this.firstName,
                lastname: this.lastName,
                email: this.email,
                password: this.password,
                confirm_password: this.confirmPassword,
                role: 'tenant'
            }

            try{
                console.log(newUser)
                await this.userStore.createUser(newUser);
                this.userStore.isLoggedIn = true;
                console.log("User Created Succesfuly: ", newUser);
                console.log("Login: ", this.userStore.isLoggedIn);
                this.$router.push({name: 'Home'})
            }catch(error){
                console.error(error);
            }
        },

        async handleLogin(){
            if(!this.email || !this.password){
                console.log("Empty password and email")
                return;
            }

            try{
                await this.userStore.handleLogIn({
                    email: this.email,
                    password: this.password
                })
            }catch(error){
                console.error("Login error");
            }
        }
    }
}
</script>

<style scoped>
.container {
    width: 100%;
    height: 100vh;
    background-image: url('../../assets/images/PP-bg.png');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    box-sizing: border-box;
    position: relative;
}

.container::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 255, 0.15);
    backdrop-filter: blur(2px);
}

.floating-card {
    width: 70%;
    max-width: 1200px;
    height: 75%;
    background: white;
    border-radius: 20px;
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
    display: flex;
    overflow: hidden;
    position: relative;
    z-index: 1;
}

.card-left {
    flex: 1;
    position: relative;
}

.image-section {
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
}

.login-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.card-right {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 60px 40px;
}

.auth-section {
    width: 100%;
    max-width: 380px;
}

hgroup h2 {
    margin: 0 0 10px 0;
    font-size: 2rem;
    color: #333;
    font-weight: 700;
}

hgroup h3 {
    margin: 0 0 40px 0;
    color: #666;
    font-size: 1rem;
    line-height: 1.5;
    font-weight: 400;
}

.auth-form {
    width: 100%;
}

.name-row {
    display: flex;
    gap: 16px;
    margin-bottom: 24px;
}

.name-row .input-group {
    flex: 1;
    margin-bottom: 0;
}

.input-group {
    margin-bottom: 24px;
}

.input-group label {
    display: block;
    margin-bottom: 8px;
    font-weight: 600;
    color: #333;
    font-size: 14px;
}

.input-group input {
    width: 100%;
    padding: 16px 20px;
    border: 2px solid #e1e5e9;
    border-radius: 10px;
    font-size: 16px;
    transition: all 0.3s ease;
    box-sizing: border-box;
    background: #fafbfc;
}

.input-group input:focus {
    outline: none;
    border-color: #345FCC;
    background: white;
    box-shadow: 0 0 0 3px rgba(52, 95, 204, 0.1);
}

.input-group input::placeholder {
    color: #9ca3af;
}

.auth-btn {
    width: 100%;
    padding: 16px;
    background-color: #345FCC;
    color: white;
    border: none;
    border-radius: 12px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    margin-top: 10px;
    box-shadow: 0 4px 15px rgba(52, 95, 204, 0.3);
}

.auth-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(52, 95, 204, 0.4);
}

.auth-btn:active {
    transform: translateY(0);
}

.form-footer {
    margin-top: 30px;
}

.forgot-password {
    text-align: center;
    margin-bottom: 20px;
}

.forgot-password a {
    color: #345FCC;
    text-decoration: none;
    font-size: 14px;
    font-weight: 500;
    transition: color 0.3s ease;
}

.forgot-password a:hover {
    color: #2847A3;
    text-decoration: underline;
}

.toggle-mode {
    text-align: center;
    font-size: 14px;
    color: #666;
}

.toggle-mode a {
    color: #345FCC;
    text-decoration: none;
    font-weight: 600;
    transition: color 0.3s ease;
}

.toggle-mode a:hover {
    color: #2847A3;
    text-decoration: underline;
}
</style>