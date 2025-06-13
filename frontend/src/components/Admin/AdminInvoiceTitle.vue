<template>
    <div class="container">
        <div class="title">
            <Icon :icon="icon" width="35px" height="35px"></Icon> 
            <div style="font-size: 30px; font-weight: bold  ;">{{title}}</div>
        </div>
        
        <div class="rightSection">

            <div class="statusButon">
                <div class="statusPaid">Paid: {{ statusCounts.paid }}</div>
                <div class="statusUnpaid">Unpaid: {{ statusCounts.unpaid }}</div>
                <div class="statusOverdue">Overdue: {{ statusCounts.overdue }}</div>
            </div>
            
            <div class="searchBox">
                <Icon icon="material-symbols:search-rounded" width="24" height="24" class="searchIcon"></Icon>
                <input type="text" placeholder="Search">
            </div>
        </div>

    </div>
</template>
<script>
export default {
  props: {
    title: String,
    total: {
      type: Number,
      default: 0
    },
    icon: {
      type: String,
      required: true
    },
    invoices: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    statusCounts() {
      let paid = 0;
      let unpaid = 0;
      let overdue = 0;

      this.invoices.forEach(invoice => {
        const status = invoice.status.toLowerCase();
        if (status === 'paid') paid++;
        else if (status === 'pending') unpaid++;
        else if (status === 'overdue') overdue++;
      });

      return { paid, unpaid, overdue };
    }
  }
};
</script>

<style scoped>
.container{
    display: flex;
    justify-content: space-between;
    padding: 40px 120px;
    align-items: center;
}
.title{
    display: flex;
    align-items: center;
    gap: 13px;
}

.rightSection{
    display: flex;
    gap: 15px;
}
.statusButon{
    display: flex;
    gap: 10px;
    align-items: center;
}

.statusPaid {
  color: #319F43;
  border: 1px solid #319F43;
  background-color: rgba(49, 159, 67, 0.1);
  height: 33px;
  padding: 8px 16px;
  font-size: 18px;
  border-radius: 10px;
  align-items: center;
  display: flex;
  width: auto;
}

.statusUnpaid {
  color: #F79E1B;
  border: 1px solid #F79E1B;
  background-color: rgba(247, 158, 27, 0.2);
  height: 33px;
  padding: 8px 16px;
  font-size: 18px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  width: auto;
}

.statusOverdue {
  color: #CD4D4D;
  border: 1px solid #CD4D4D;
  background-color: rgba(205, 77, 77, 0.2);
  height: 33px;
  padding: 8px 16px;
  font-size: 18px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  width: auto;
}
.total{
    border: 0.5px solid #1A4CCC;
    color: #1A4CCC;
    background-color: rgba(26, 76, 204, 0.2);
    padding: 10px 25px;
    border-radius: 10px;
    width: 200px;
    font-size: 22px;
}
.searchBox{
    display: flex;
    position: relative;
    align-items: center;
}
.searchIcon{
    position: absolute;
    left: 3%;
    color: #A7A7A7;
}
input{
    width: 310px;
    padding: 10px 0 10px 40px;
    font-size: 20px;
    border-radius: 10px;
    border: 1px solid #A7A7A7;
    color: #A7A7A7;
    height: 30px;
}
.create{
    display: flex;
    align-items: center;
    gap: 0;
    background-color: #3E5EFF;
    border-radius: 10px;
    font-weight: bold;
    color: white;
    padding: 10px 20px;
    font-size: 20px;
}
</style>