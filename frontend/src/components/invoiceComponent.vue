<template>
  <div class="popupOverlay">
    <div class="popupWrap">
      <div class="header">
        <Icon icon="ep:arrow-left-bold" width="30" height="30" @click="$emit('close')" />
        <div class="propertyContainer">
          <property-card />
        </div>
      </div>

      <div class="content">
        <div class="landlord">
          <Icon :icon="invoiceData.iconID" width="31" height="31" />
          Invoice ID: {{ invoiceData.id }}
        </div>

        <div class="landlord">
          <Icon :icon="invoiceData.iconLandLord" width="31" height="31" />
          Landlord Name: {{ invoiceData.landlordName }}
        </div>

        <div class="landlord">
          <Icon :icon="invoiceData.iconProperty" width="31" height="31" />
          Properties: {{ invoiceData.property }}
        </div>

        <div class="landlord">
          <Icon :icon="invoiceData.iconDuration" width="31" height="31" />
          Rental Period: {{ invoiceData.duration }}
        </div>

        <div class="landlord">
          <Icon :icon="invoiceData.iconPay" width="31" height="31" />
          Total Payment: {{ invoiceData.pay }}
        </div>

        <div class="landlord">
          <Icon :icon="invoiceData.iconDueDate" width="31" height="31" />
          Due Date: {{ invoiceData.dueDate }}
        </div>

        <div :class="['payment', invoiceData.status.toLowerCase()]">
          <Icon :icon="invoiceData.iconStatus" width="31" height="31" />
          Payment Status:
          <span :class="['status', invoiceData.status.toLowerCase()]">{{ invoiceData.status }}</span>
        </div>
      </div>

      <hr>

      <div class="footer">
        <div class="action share">
          <Icon icon="mi:share" width="28" height="28" />
          <span>Download PDF</span>
        </div>
        <div class="divider"></div>
        <div class="action message">
          <Icon icon="tabler:message" width="28" height="28" />
          <span>Message Landlord</span>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import PropertyCard from './PropertyCard.vue';

export default {
  components: {
    PropertyCard
  },
  props: {
    invoice: {
      type: Object,
      required: true
    }
  },
  computed: {
    invoiceData() {
      return {
        id: this.invoice.id,
        landlordName: this.invoice.landlordName,
        property: this.invoice.properties,
        duration: this.invoice.duration,
        pay: this.invoice.totalPayment,
        dueDate: this.invoice.dueDate,
        status: this.invoice.status,
        iconID: 'fluent:book-number-24-regular',
        iconLandLord: 'mage:scan-user-fill',
        iconProperty: 'solar:home-outline',
        iconDuration: 'solar:calendar-linear',
        iconPay: 'fluent-emoji-high-contrast:money-bag',
        iconDueDate: 'fluent-mdl2:date-time-2',
        iconStatus: 'majesticons:note-text-line'
      };
    }
  }
};
</script>


<style>
.popupOverlay{
    position: fixed;
    display: flex; 
    top: 0;
    left: 0;
    align-items: center;
    justify-content: center;
    z-index: 99999;
    background-color: rgba(0, 0, 0, 0.5);
    width: 100%;
    height: 100vh;
    overflow-y: auto
}
.popupWrap{
    background-color: #fff;
    border-radius: 35px;
    width: 100%;
    max-width: 690px;
    padding-bottom: 15px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
    height: auto;
    overflow-y: auto
}
.header{
    display: flex;
    gap: 8.5rem;
    margin: 40px 0 35px 35px ;
}
.propertyContainer{
    width: 300px;
}
.content{
    display: flex;
    flex-direction: column;
    gap: 40px;
    margin-left: 65px;
    margin-bottom: 45px;
}
.landlord{
    display: flex;
    gap: 22px;
    font-size: 23px;
    font-weight: 500;
}
.payment{
    display: flex;
    gap: 22px;
    font-size: 23px;
    font-weight: 500;
}
.status.paid {
  color: #00B00F;
  font-weight: 600;
}
.status.unpaid {
  color: #FFBB00;
  font-weight: 600;
}
.status.expired {
  color: #FF2121;
  font-weight: 600;
}
.footer {
    display: flex;
    justify-content: space-around;
    align-items: center;
    bottom: 0;
    width: 500px;
    margin: 0 auto;
}

.action {
    display: flex;
    align-items: center;
    gap: 8px;
    font-weight: 500;
    cursor: pointer;
    font-size: 20px;
    margin: 10px 0
}

.divider {
    height: 40px;
    width: 1px;
    background-color: #C6C6C6;
}


</style>