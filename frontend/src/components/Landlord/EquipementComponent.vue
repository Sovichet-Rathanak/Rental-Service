<template>
  <div class="item">
    <Icon :icon="icon" width="32" height="32" />
    {{ text }}
  </div>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true
    }
  }
}
</script>


<style scoped>
.item {
  border: 1px solid #A7A7A7;
  border-radius: 20px;
  padding: 25px 0 28px 33px;
  display: flex;
  flex-direction: column;
  width: 290px;
  gap: 25px;
  font-weight: 400;
  cursor: pointer;
}

.item:hover {
  background-color: rgba(250, 249, 248, 0.5);
  box-shadow: 0 12px 10px 0 rgba(0, 0, 0, 0.05);
}
</style>
