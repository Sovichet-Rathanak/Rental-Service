<template>
  <div class="action-buttons">
    <button
      @click.stop="$emit('edit-item', index)"
      class="btn-edit"
    >
      <Icon icon="mdi:edit" width="30" height="30" class="icon" />
    </button>

    <button
      @click.stop="$emit('delete-item', index)"
      class="btn-delete"
    >
      <Icon icon="ic:baseline-delete" width="30" height="30" style="color: red" />
    </button>
  </div>
</template>

<script>
export default {
  props: {
    index: {
      type: Number,
      required: true,
    },
  },
};
</script>

<style scoped>
.action-buttons {
  display: flex;
  gap: 0.5rem;
}

.btn-edit,
.btn-delete {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
}
</style>
