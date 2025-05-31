<template>
<div class="container">
   <div class="top">
    <ImageInForm 
      title="Edit Landlord"
      imageUrl="/src/assets/images/property_images/property1.jpeg"
      text="Add Images"
      :backRoute="{ name: 'Admin Dashboard Landlord'}"
      @image-uploaded="handleImage"
    ></ImageInForm>

    <button>Save</button>
   </div>

    <DynamicForm
      class="form"
      icon="material-symbols:arrow-back-rounded"
      :inputSet="landlordInput"
      @submit="handleFormSubmit"  
    />
</div>
</template>

<script>
import DynamicForm from "@/components/Admin/DynamicForm.vue";
import ImageInForm from "@/components/Admin/ImageInForm.vue";

export default {
  components: { DynamicForm, ImageInForm, },
  data() {
    return {
      landlordInput: [
        { key: "firstName", label: "First Name", type: "text", placeholder: "Enter First Name" },
        { key: "lastName", label: "Last Name", type: "text", placeholder: "Enter Last Name" },
        { key: "gender", label: "Gender", type: "select", placeholder: "Select gender", options: [{label: "Male", value: "male"}, {label: "Femaale", value: "female"}, {label: "Other", value: "other"}] },
        { key: "dateOfBirth", label: "Date of Birth", type: "calendar", placeholder: "DD/MM/YYYY" },
        { key: "phoneNumber", label: "Phone Number", type: "number", placeholder: "Enter Phone Number" },
        { key: "email", label: "Email", type: "email", placeholder: "example@gmail.com" },
      ],
    };
  },
  methods: {
    handleFormSubmit(formData) {
      console.log("Form submitted with data:", formData);
    },
  },
};
</script>
<style scoped>
.container{
  display: flex;
  flex-direction: column;
  padding: 10px 100px;
  margin-bottom: 50px;
}
.top{
  position: relative;
}
button{
  position: absolute;
  top: 7%;
  right: 3%;
  display: flex;
  align-items: center;
  gap: 0;
  background-color: #3E5EFF;
  border-radius: 10px;
  font-weight: bold;
  color: white;
  padding: 10px 20px;
  font-size: 20px;
  text-decoration: none;
  border: none;
}
button:hover{
  background-color: #2335ff;
}
</style>