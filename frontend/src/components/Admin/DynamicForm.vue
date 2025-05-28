<template>
  <div class="wrapper">

    <div v-for="rowIndex in Math.ceil(inputSet.length / 2)" :key="rowIndex" class="inputRow">
      <div
        v-for="(input, index) in inputSet.slice((rowIndex - 1) * 2, rowIndex * 2)"
        :key="index"
        class="inputGroup"
      >
        <div class="formWrapper">
          <label :for="input.key">{{ input.label }}:</label>
          <input
            v-if="input.type !== 'file'"
            :type="input.type"
            :placeholder="input.placeholder"
            v-model="formData[input.key]"
          />
          <input
            v-else
            type="file"
            @change="handleFileUpload($event, input.key)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ImageInForm from './ImageInForm.vue';
import { Icon } from '@iconify/vue';
export default {
  components: {
    ImageInForm,
    Icon,
  },
  props: {
    title: {
      type: String,
      default: "Dynamic Form",
    },
    inputSet: {
      type: Array,
      required: true,
    },
    initialData: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      formData: {},
    };
  },
  methods: {
    handleFileUpload(event, key) {
      const file = event.target.files[0];
      if (file) {
        this.$set(this.formData, key, file);
      }
    },
    submitForm() {
      this.$emit("submit", this.formData);
    },
  },
  mounted() {
    this.inputSet.forEach((input) => {
      this.formData[input.key] = this.initialData[input.key] || "";
    });
  },
};
</script>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 20px;
  color: black;
}

.inputRow {
  display: grid;
  grid-template-columns: repeat(2, auto);
  gap: 10px;
  margin-bottom: 20px;
}

.formWrapper {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

label {
  font-size: 18px;
  font-weight: 400;
}

input {
  width: 42vw;
  border-radius: 15px;
  border: 1px solid #D3D3D3;
  box-shadow: 0 12px 10px 0 rgba(0, 0, 0, 0.05);
  padding: 15px;
  font-size: 18px;
}

input::placeholder {
  font-size: 18px;
}
</style>
