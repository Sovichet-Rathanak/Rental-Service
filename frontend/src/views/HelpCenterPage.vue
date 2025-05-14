<template>
  <HeaderNav2 />
  <div class="container">

    <div class="centered-text">
      <h1>Contact | Romdoul</h1>
    </div>


  </div>
  <div class="help-center-faq">

    <h2>Top Questions</h2>
    <div v-for="(faq, idx) in faqs" :key="idx" class="faq-block">
      <div class="faq-question" @click="toggleAnswer(idx)" :style="{ cursor: 'pointer' }">
        <span class="styled-question" :class="{ active: openedIndex === idx }" v-html="faq.question"></span>
      </div>

      <transition name="fade-slide">
        <div class="faq-answer" v-show="openedIndex === idx" v-html="faq.answer"></div>
      </transition>

      <hr v-if="idx < faqs.length - 1" />
    </div>
  </div>

  <!-- Need to get in touch section -->
  <section class="contact-section">
    <h2 class="contact-title">Need to get in touch?</h2>
    <p class="contact-lead">
      <strong>We’ll start with some questions and get you to the right contact.</strong>
    </p>
    <button class="contact-btn">Contact Us</button>
  </section>

  <FooterComponent />
</template>

<script>
import FooterComponent from '@/components/FooterComponent.vue';
import HeaderNav2 from '@/components/headerComponents/HeaderNav2.vue';

export default {
  components: {
    FooterComponent,
    HeaderNav2
  },
  data() {
    return {
      openedIndex: null,
      faqs: [
        {
          question: '<strong>How can I schedule a property viewing?</strong>',
          answer: `Viewings are arranged directly with the landlord. Once you find a property you're interested in, we’ll connect you with the landlord to schedule a visit at a convenient time.`
        },
        {
          question: '<strong>What are the steps to apply for a rental?</strong>',
          answer: `
            The application process is handled between the landlord and tenant. Typically, it involves:
            <ol>
              <li>Viewing the property and discussing terms with the landlord.</li>
              <li>Submitting any required documents.</li>
              <li>Agreeing on the deposit and first rental payment.</li>
              <li>Signing the lease agreement.</li>
            </ol>
          `
        },
        {
          question: '<strong>Who do I contact if I have maintenance or repair issues?</strong>',
          answer: `All maintenance and repair issues should be discussed directly with the landlord, as they manage the property.`
        },
        {
          question: '<strong>How do I renew or terminate my lease?</strong>',
          answer: `Lease renewals and terminations are handled directly between the landlord and tenant. Make sure to discuss your options in advance to avoid any misunderstandings.`
        },
        {
          question: '<strong>How do I report an issue or complaint about the property or neighbors?</strong>',
          answer: `If you have any concerns, report them directly to the landlord. If it's serious or unresolved, you can reach out to our support team.`
        },
        {
          question: '<strong>What are the payment methods, and when are payments due?</strong>',
          answer: `Payment methods and due dates are decided by the landlord. Always confirm those details before signing the lease.`
        }
      ]
    }
  },
  methods: {
    toggleAnswer(idx) {
      this.openedIndex = this.openedIndex === idx ? null : idx;
    }
  }
}
</script>

<style scoped>
.container {
  width: 100vw;
  height: 50vh;
  max-width: 100%;
  background-color: #345fcc9d;
  background-image: url("/src/assets/images/PP-bg.png");
  background-blend-mode: overlay;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  z-index: 100;
  margin-top: -20px;
}

.centered-text {
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #fff;
  font-weight: bold;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
  letter-spacing: 2px;
  text-align: center;
  pointer-events: none;
}

.help-center-faq {
  background: #fff;
  max-width: 1300px;
  margin: 0 auto;
  margin-top: 0;
  padding: 40px 32px 48px 32px;
  border-radius: 0 0 8px 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
}

h2 {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 32px;
  margin-top: 0;
}

.faq-block {
  margin-bottom: 24px;
  position: relative;
}

.faq-question {
  font-size: 1.08rem;
  font-weight: bold;
  margin-bottom: 8px;
  color: #222;
}

.faq-answer {
  font-size: 1rem;
  color: #333;
  padding: 16px 0;
}

.faq-answer ol {
  margin: 8px 0 8px 24px;
  padding-left: 0;
}

hr {
  border: none;
  border-top: 1px solid #e0e0e0;
  margin: 24px 0 0 0;
}

.contact-section {
  background: #fff;
  max-width: 1300px;
  margin: 0 auto;
  padding: 10px 32px 48px 32px;
  background: #fff;
  border-radius: 8px;
  text-align: left;
}

.contact-title {
  font-size: 2.3rem;
  font-weight: bold;
  margin-bottom: 32px;
}

.contact-lead {
  font-size: 1.15rem;
  font-weight: 500;
  margin-bottom: 32px;
}

.contact-btn {
  background: #2979ff;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 16px 32px;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.2s;
  margin-top: 8px;
  box-shadow: 0 2px 8px rgba(41, 121, 255, 0.08);
}

.contact-btn:hover {
  background: #1565c0;
}

.styled-question {
  color: #222;
  text-decoration: none;
  transition: text-decoration 0.2s;
}

.styled-question.active {
  text-decoration: underline;
}
</style>
