<template>
  <div class="calendar-container" v-if="show">
    <div class="display-header">
      <div class="display-description">
        <h3>Select dates</h3>
        <p>Add your move-in date</p>
      </div>
      <div class="display-date">
        <h3>Move-in date</h3>
        <p>{{ selectedDate ? formatDate(selectedDate) : "Select date" }}</p>
      </div>
    </div>

    <v-calendar
      borderless
      expanded
      :attributes="attributes"
      :disabled-dates="disabledDates"
      @dayclick="onDayClick"
    />

    <div class="btn-group">
      <button class="clear" @click="clearDate">Clear date</button>
      <button class="close" @click="handleClose">Close</button>
    </div>
  </div>
</template>

<script>
import { mapState } from "pinia";
import { ref, computed } from "vue";

export default {
  name: "datePopUp",
  props: {
    show: {
      type: Boolean,
      required: true,
    },
  },
  setup(props, { emit }) {
    const selectedDate = ref(null);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const onDayClick = (day) => {
      if (day.isDisabled) return;
      selectedDate.value = day.date;
      emit("update-date", selectedDate.value);
    };

    const clearDate = () => {
      selectedDate.value = null;
      emit("update-date", null);
    };

    const handleClose = () => {
      emit("close");
      emit("update-date", selectedDate.value);
    };

    const attributes = computed(() => {
      const attrs = [
        {
          key: "today",
          highlight: { contentClass: "highlight-today" },
          dates: new Date(),
        },
      ];

      if (selectedDate.value) {
        attrs.push({
          key: "selected",
          highlight: { contentClass: "highlight-selected" },
          dates: selectedDate.value,
        });
      }
      return attrs;
    });

    const disabledDates = [
      {
        start: new Date(1900, 0, 1),
        end: new Date(today.getTime() - 86400000) // yesterday
      }
    ];

    return {
      selectedDate,
      attributes,
      disabledDates,
      onDayClick,
      clearDate,
      handleClose
    };
  },
  methods: {
    formatDate(date) {
      if (!date) return "";
      return new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }).format(date);
    },
  },
};
</script>

<style scoped>
.calendar-container {
  position: absolute;
  width: 400px;
  z-index: 1000;
  top: 980px;
  left: 1075px;
  background-color: white;
  border-radius: 24px;
  flex-direction: column;
  padding: 30px 40px;
  box-shadow: 1px 1px 5px 4px lightgray;
}
.display-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 100px;
}
.display-header p {
  color: gray;
  margin-top: -10px;
}
.display-date h3 {
  margin-top: 10px;
}
.display-date {
  border: 1px solid black;
  width: 40%;
  height: 75px;
  display: flex;
  flex-direction: column;
  padding-left: 15px;
  border-radius: 20px;
  margin-bottom: 30px;
}
.btn-group {
  display: flex;
  justify-content: flex-end;
  gap: 20px;
}
.clear {
  font-size: 18px;
  border: none;
  background-color: transparent;
  text-decoration: underline;
  font-weight: bold;
}
.close {
  background-color: black;
  border-radius: 10px;
  font-size: 18px;
  border: none;
  width: 90px;
  height: 35px;
  color: white;
}
::v-deep(.vc-day-content) {
  font-size: 18px !important;
  font-family: "Airbnb Font";
  padding: 15px !important;
  margin: 10px !important;
}
::v-deep(.vc-title) {
  font-size: 20px !important;
  font-family: "Airbnb Font";
  background-color: transparent;
}
::v-deep(.vc-weekday) {
  padding: 15px;
}
::v-deep(.highlight-today) {
  background-color: #3b82f6;
}
::v-deep(.highlight-selected) {
  background-color: black;
  color: #f0f0f0;
}
</style>
