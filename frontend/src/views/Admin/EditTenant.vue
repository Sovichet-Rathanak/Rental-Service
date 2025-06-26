<template>
<div class="container">
   <div class="top">
    <ImageInForm 
      title="Edit Tenant"
      imageUrl="/src/assets/images/property_images/property1.jpeg"
      text="Add Images"
      :backRoute="{ name: 'Admin Dashboard Tenant'}"
      @image-uploaded="handleImage"
    ></ImageInForm>

    <button>Save</button>
   </div>

    <DynamicForm
      class="form"
      icon="material-symbols:arrow-back-rounded"
      :inputSet="tenantInput"
      @submit="handleFormSubmit"  
    />
</div>
</template>

<script>
import DynamicForm from "@/components/Admin/DynamicForm.vue";
import ImageInForm from "@/components/Admin/ImageInForm.vue";
import { useUserStore } from "@/stores/user";

export default {
  components: { DynamicForm, ImageInForm },
  data() {
    return {
      userId: null,
      formModel: {}, // to store actual form values
      tenantInput: [
        { key: "firstName", label: "First Name", type: "text", placeholder: "Enter First Name" },
        { key: "lastName", label: "Last Name", type: "text", placeholder: "Enter Last Name" },
        { key: "gender", label: "Gender", type: "select", placeholder: "Select gender", options: [
          { label: "Male", value: "male" },
          { label: "Female", value: "female" },
          { label: "Other", value: "other" },
        ]},
        { key: "dateOfBirth", label: "Date of Birth", type: "calendar", placeholder: "DD/MM/YYYY" },
        { key: "phoneNumber", label: "Phone Number", type: "number", placeholder: "Enter Phone Number" },
        { key: "email", label: "Email", type: "email", placeholder: "example@gmail.com" },
      ],
    };
  },
  async mounted() {
    this.userId = this.$route.params.id;
    const userStore = useUserStore();

    try {
      const tenant = await userStore.fetchUserById(this.userId); // ← You must implement this
      this.formModel = {
        firstName: tenant.firstname,
        lastName: tenant.lastname,
        gender: tenant.gender,
        dateOfBirth: tenant.dateOfBirth,
        phoneNumber: tenant.phoneNumber,
        email: tenant.email,
      };
    } catch (error) {
      console.error("Failed to load tenant:", error);
    }
  },
  methods: {
    async handleFormSubmit(formData) {
      const userStore = useUserStore();
      try {
        await userStore.updateUser(this.userId, formData);
        alert("Tenant updated successfully");
        this.$router.push({ name: "Admin Dashboard Tenant" });
      } catch (e) {
        console.error("Failed to update tenant:", e);
      }
    },
    handleImage() {
      // Optional: image update handler
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