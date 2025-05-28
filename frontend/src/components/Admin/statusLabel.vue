<template>
  <span :class="['status-label', status.toLowerCase()]">
    {{ status }}
  </span>
</template>

<script>
export default {
  props: {
    status: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>
.status-label {
  padding: 0.25rem 0.75rem;
  border-radius: 0.25rem;
  font-weight: 500;
  color: black
}
.status-label.pending {
  background-color: #e0e7ff;
  color: #3b82f6;
}
.status-label.occupied {
  background-color: #fef3c7;
  color: #f59e0b;
}
.status-label.rejected {
  background-color: #fee2e2;
  color: #ef4444;
}
.status-label.available {
  background-color: #d1fae5;
  color: #10b981;
}
.status-label.approved {
  background-color: #dbeafe;
  color: #3b82f6;
}
</style>
