<template>
  <!-- Modal Overlay -->
  <div 
    class="modal-overlay" 
    v-if="showModal"
    @click.self="closeModal"
  >
    <!-- Modal Content -->
    <div class="modal-content">
      <!-- Close Button -->
      <button class="modal-close" @click="closeModal">
        <iconify-icon icon="mdi:close" width="1.5rem" height="1.5rem"/>
      </button>

      <!-- Login Screen -->
      <div v-if="!showResetPassword && !showSignUp">
        <h1>Welcome To Romdoul Rental</h1>
        
        <div v-if="userInitials" class="user-avatar">
          {{ userInitials }}
        </div>
        
        <form class="login-form" @submit.prevent="handleLogin">
          <div class="input-group">
            <label>Email</label>
            <input type="email" v-model="email" placeholder="Enter your email" required>
            <p class="error-message" v-if="emailError">{{ emailError }}</p>
          </div>
          
          <div class="input-group">
            <label>Password</label>
            <input type="password" v-model="password" placeholder="Enter your password" required>
            <p class="error-message" v-if="passwordError">{{ passwordError }}</p>
          </div>
          
          <div class="remember-forgot">
            <label class="remember-me">
              <input type="checkbox" v-model="rememberMe">
              Remember me
            </label>
            <span class="forgot-password" @click="showResetPassword = true">
              Forgot password?
            </span>
          </div>
          
          <button type="submit" class="login-button">Sign In</button>
        </form>
        
        <div class="divider">
          <div class="divider-line"></div>
          <span>or continue with</span>
          <div class="divider-line"></div>
        </div>
        
        <div class="social-login">
          <button type="button" class="social-button google" @click="signInWithGoogle">
            <iconify-icon icon="devicon:google" width="1.5rem" height="1.5rem"/>
          </button>
          <button type="button" class="social-button facebook" @click="signInWithFacebook">
            <iconify-icon icon="logos:facebook" width="1.5rem" height="1.5rem"/>
          </button>
          <button type="button" class="social-button apple" @click="signInWithApple">
            <iconify-icon icon="ic:outline-apple" width="1.5rem" height="1.5rem"/>
          </button>
        </div>
        
        <p class="auth-switch">
          Don't have an account? <span @click="showSignUp = true">Sign Up</span>
        </p>
      </div>

      <!-- Reset Password Screen -->
      <div v-if="showResetPassword">
        <h1>Reset Password</h1>
        
        <form class="login-form" @submit.prevent="handleResetPassword">
          <div class="input-group">
            <label>Email</label>
            <input type="email" v-model="resetEmail" placeholder="Enter your email" required>
            <p class="error-message" v-if="resetEmailError">{{ resetEmailError }}</p>
          </div>
          
          <div class="input-group">
            <label>New Password</label>
            <input type="password" v-model="newPassword" placeholder="Create new password" required>
          </div>
          
          <button type="submit" class="login-button">Reset Password</button>
        </form>
        
        <p class="auth-switch" @click="showResetPassword = false">
          <span>Back to Sign In</span>
        </p>
      </div>

      <!-- Sign Up Screen -->
      <div v-if="showSignUp">
        <h1>Create Account</h1>
        
        <form class="login-form" @submit.prevent="handleSignUp">
          <div class="input-group">
            <label>First Name</label>
            <input type="text" v-model="firstName" placeholder="Enter your first name" required>
          </div>
          
          <div class="input-group">
            <label>Last Name</label>
            <input type="text" v-model="lastName" placeholder="Enter your last name" required>
          </div>
          
          <div class="input-group">
            <label>Date of Birth</label>
            <input type="date" v-model="dateOfBirth" required>
          </div>
          
          <div class="input-group">
            <label>Phone Number</label>
            <input type="tel" v-model="phoneNumber" placeholder="Enter your phone number" required>
          </div>
          
          <div class="input-group">
            <label>Email</label>
            <input type="email" v-model="signUpEmail" placeholder="Enter your email" required>
          </div>
          
          <div class="input-group">
            <label>Password</label>
            <input type="password" v-model="signUpPassword" placeholder="Create password" required>
            <div class="password-strength" :class="passwordStrengthClass">
              Password strength: {{ passwordStrength }}
            </div>
          </div>
          
          <div class="input-group">
            <label>Confirm Password</label>
            <input type="password" v-model="confirmPassword" placeholder="Confirm password" required>
            <p class="error-message" v-if="passwordMatchError">{{ passwordMatchError }}</p>
          </div>
          
          <div class="terms-agreement">
            <label class="terms-checkbox">
              <input type="checkbox" v-model="agreeToTerms" required>
              I agree to the Romdoul Rental <a href="#" @click.prevent="showTerms">Terms of Service</a>
              &
              <a href="#" @click.prevent="showPrivacy">Privacy Policy</a>
            </label>
            <p class="terms-text">
              By creating an account, you agree to our rental terms, including our vehicle usage policies, 
              insurance requirements, and payment terms. You consent to receiving important account 
              notifications via email or SMS.
            </p>
          </div>
          
          <button type="submit" class="login-button">Sign Up</button>
        </form>
        
        <div class="divider">
          <div class="divider-line"></div>
          <span>or sign up with</span>
          <div class="divider-line"></div>
        </div>
        
        <div class="social-login">
          <button type="button" class="social-button google" @click="signInWithGoogle">
            <iconify-icon icon="devicon:google" width="1.5rem" height="1.5rem"/>
          </button>
          <button type="button" class="social-button facebook" @click="signInWithFacebook">
            <iconify-icon icon="logos:facebook" width="1.5rem" height="1.5rem"/>
          </button>
          <button type="button" class="social-button apple" @click="signInWithApple">
            <iconify-icon icon="ic:outline-apple" width="1.5rem" height="1.5rem"/>
          </button>
        </div>
        
        <p class="auth-switch" @click="showSignUp = false">
          Already have an account? <span>Sign in</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { Icon } from '@iconify/vue';

export default {
  props: {
    showModal: {
      type: Boolean,
      default: false
    }
  },
  components: {
    IconifyIcon: Icon
  },
  data() {
    return {
      rememberMe: false,
      
      // Login screen data
      email: "",
      password: "",
      emailError: "",
      passwordError: "",
      userInitials: localStorage.getItem('userInitials') || "",
      
      // Reset password screen data
      showResetPassword: false,
      resetEmail: "",
      newPassword: "",
      resetEmailError: "",
      
      // Sign up screen data
      showSignUp: false,
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      phoneNumber: "",
      signUpEmail: "",
      signUpPassword: "",
      confirmPassword: "",
      passwordMatchError: "",
      agreeToTerms: false,
    };
  },
  computed: {
    passwordStrength() {
      if (!this.signUpPassword) return "";
      if (this.signUpPassword.length < 6) return "Weak";
      if (this.signUpPassword.length < 10) return "Medium";
      return "Strong";
    },
    passwordStrengthClass() {
      return {
        'weak': this.passwordStrength === "Weak",
        'medium': this.passwordStrength === "Medium",
        'strong': this.passwordStrength === "Strong"
      };
    }
  },
  watch: {
    showModal(newVal) {
      console.log('showModal changed to:', newVal);
    },
    confirmPassword(newVal) {
      if (newVal && this.signUpPassword !== newVal) {
        this.passwordMatchError = "Passwords don't match";
      } else {
        this.passwordMatchError = "";
      }
    }
  },
  methods: {
    validateEmail(email) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(email);
    },
    closeModal() {
      this.$emit('close');
      this.showResetPassword = false;
      this.showSignUp = false;
      this.resetFormFields();
      document.body.style.overflow = '';
    },
    resetFormFields() {
      this.email = "";
      this.password = "";
      this.emailError = "";
      this.passwordError = "";
      this.resetEmail = "";
      this.newPassword = "";
      this.resetEmailError = "";
      this.firstName = "";
      this.lastName = "";
      this.dateOfBirth = "";
      this.phoneNumber = "";
      this.signUpEmail = "";
      this.signUpPassword = "";
      this.confirmPassword = "";
      this.passwordMatchError = "";
      this.agreeToTerms = false;
    },
    async handleLogin() {
      this.emailError = "";
      this.passwordError = "";
      
      if (!this.validateEmail(this.email)) {
        this.emailError = "Please enter a valid email";
        return;
      }
      
      if (this.password.length < 6) {
        this.passwordError = "Password must be at least 6 characters";
        return;
      }
      
      try {
        // Simulate API call
        console.log("Logging in with:", this.email);
        
        // Show success message
        alert("Sign In Successfully");
        
        // Close modal
        this.closeModal();
        
      } catch (error) {
        console.error("Login error:", error);
        this.passwordError = "Invalid email or password";
      }
    },
    handleResetPassword() {
      if (!this.validateEmail(this.resetEmail)) {
        this.resetEmailError = "Please enter a valid email";
        return;
      }
      
      console.log("Resetting password for:", this.resetEmail);
      alert("Password reset instructions sent to your email");
      this.showResetPassword = false;
    },
    showTerms() {
      alert(`Terms of Service:
      
1. Romdoul Rental Agreement: You agree to abide by all terms of the rental agreement, including vehicle usage restrictions and return policies.
2. Payment: All rentals require a valid payment method. You authorize us to charge for rental fees, damages, and other applicable charges.
3. Vehicle Care: You agree to return the vehicle in the same condition as received, normal wear and tear excepted.
4. Prohibited Uses: Commercial use, off-road driving, and illegal activities are strictly prohibited.
5. Insurance: You must maintain adequate insurance coverage as specified in the rental agreement.`);
    },
    showPrivacy() {
      alert(`Privacy Policy:
      
1. Information Collection: We collect personal information including name, contact details, payment information, and driving history to provide our services.
2. Data Usage: Your information is used for rental processing, account management, and service improvements.
3. Data Sharing: We may share information with insurance providers, law enforcement, and service partners as required.
4. Security: We implement industry-standard measures to protect your personal information.
5. Your Rights: You may access, correct, or request deletion of your personal information as permitted by law.`);
    },
    getUserInitials() {
      if (this.firstName && this.lastName) {
        return `${this.firstName.charAt(0)}${this.lastName.charAt(0)}`.toUpperCase();
      }
      return "";
    },
    handleSignUp() {
      if (this.signUpPassword !== this.confirmPassword) {
        this.passwordMatchError = "Passwords don't match";
        return;
      }
      
      if (!this.agreeToTerms) {
        alert("Please agree to the terms and conditions");
        return;
      }
      
      console.log("Signing up with:", {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.signUpEmail,
        dob: this.dateOfBirth,
        phone: this.phoneNumber
      });
      
      // Store user initials in localStorage for display in login
      const initials = this.getUserInitials();
      localStorage.setItem('userInitials', initials);
      this.userInitials = initials;
      
      alert("Account created successfully!");
      this.closeModal();
    },
    signInWithGoogle() {
      console.log("Signing in with Google");
      // Implement Google auth
    },
    signInWithFacebook() {
      console.log("Signing in with Facebook");
      // Implement Facebook auth
    },
    signInWithApple() {
      console.log("Signing in with Apple");
      // Implement Apple auth
    }
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(3px);
  animation: fadeIn 0.3s ease-out;
  z-index: 9999 !important;
}

.modal-content {
  background-color: white;
  padding: 2.5rem;
  border-radius: 16px;
  width: 100%;
  max-width: 420px;
  position: relative;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
  animation: slideUp 0.3s ease-out;
}

.modal-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  cursor: pointer;
  color: #666;
  padding: 0.5rem;
  border-radius: 50%;
  transition: background-color 0.2s;
}

.modal-close:hover {
  background-color: #f5f5f5;
}

/* Content Styles */
h1 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #130092;
  margin-bottom: 1.5rem;
  text-align: center;
}

.user-avatar {
  width: 50px;
  height: 50px;
  background-color: #130092;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1.2rem;
  margin: 0 auto 1rem auto;
}

.login-form {
  margin-bottom: 1.5rem;
}

.input-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: #333;
  margin-bottom: 0.5rem;
}

input[type="email"],
input[type="password"],
input[type="text"],
input[type="date"],
input[type="tel"] {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  box-sizing: border-box;
  transition: border-color 0.2s;
}

input[type="email"]:focus,
input[type="password"]:focus,
input[type="text"]:focus,
input[type="date"]:focus,
input[type="tel"]:focus {
  border-color: #130092;
  outline: none;
}

input[type="email"]::placeholder,
input[type="password"]::placeholder,
input[type="text"]::placeholder,
input[type="tel"]::placeholder {
  color: #aaa;
}

.error-message {
  color: #e53e3e;
  font-size: 0.75rem;
  margin-top: 0.25rem;
}

.remember-forgot {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 1rem 0;
}

.remember-me {
  display: flex;
  align-items: center;
  font-size: 0.875rem;
  color: #555;
  cursor: pointer;
}

.remember-me input {
  margin-right: 0.5rem;
}

.forgot-password {
  font-size: 0.875rem;
  color: #555;
  cursor: pointer;
  text-decoration: underline;
}

.forgot-password:hover {
  color: rgb(255, 0, 0);
}

.login-button {
  width: 100%;
  padding: 0.875rem;
  background-color: rgb(0, 0, 155);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  margin-top: 0.5rem;
  transition: background-color 0.2s;
}

.login-button:hover {
  background-color: rgb(9, 0, 76);
}

.divider {
  display: flex;
  align-items: center;
  margin: 1.5rem 0;
  color: #777;
  font-size: 0.875rem;
}

.divider-line {
  flex: 1;
  height: 1px;
  background-color: #e2e2e2;
}

.divider span {
  padding: 0 1rem;
}

.social-login {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.social-button {
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  border: 1px solid #e2e2e2;
  background: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s, background-color 0.2s;
}

.social-button:hover {
  transform: translateY(-2px);
}

.google {
  color: #DB4437;
  border-color: #DB4437;
}

.google:hover {
  background-color: rgba(219, 68, 55, 0.1);
}

.facebook {
  color: #1877F2;
  border-color: #1877F2;
}

.facebook:hover {
  background-color: rgba(24, 119, 242, 0.1);
}

.apple {
  color: #000;
  border-color: #000;
}

.apple:hover {
  background-color: rgba(0, 0, 0, 0.1);
}

.auth-switch {
  text-align: center;
  font-size: 0.875rem;
  color: #555;
  margin-top: 1rem;
}

.auth-switch span {
  color: #130092;
  font-weight: 600;
  cursor: pointer;
  text-decoration: underline;
}

.auth-switch span:hover {
  color: #000249;
}

.password-strength {
  font-size: 0.75rem;
  margin-top: 0.25rem;
  padding: 0.25rem 0;
}

.password-strength.weak {
  color: #e53e3e;
}

.password-strength.medium {
  color: #d69e2e;
}

.password-strength.strong {
  color: #38a169;
}

/* Terms and Conditions Styles */
.terms-agreement {
  margin: 1rem 0;
  font-size: 0.6rem;
}

.terms-checkbox {
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
}

.terms-checkbox input {
  margin-right: 0.5rem;
}

.terms-text {
  color: #666;
  font-size: 0.75rem;
  margin-top: 0.5rem;
  line-height: 1.4;
  margin-left: 0.5;
}

.terms-agreement a {
  color: #130092;
  text-decoration: underline;
  padding-inline-start: 0.5rem;
  font-size: 0.8rem;

}

.terms-agreement a:hover {
  color: #000249;
}

/* Animations */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from { 
    transform: translateY(20px);
    opacity: 0;
  }
  to { 
    transform: translateY(0);
    opacity: 1;
  }
}

@media (max-width: 480px) {
  .modal-content {
    padding: 1.5rem;
    max-width: 90%;
  }
}
</style>