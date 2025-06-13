<template>
  <HeaderNav3></HeaderNav3>
  <div class="container">
    <ImageInForm 
      title="Create House"
      imageUrl="/src/assets/images/property_images/property1.jpeg"
      text="Add Images"
    ></ImageInForm>
    <DynamicForm
      class="form"
      icon="material-symbols:arrow-back-rounded"
      :title="'Create Room'"
      :inputSet="house1Inputs"
      @submit="handleFormSubmit"  
    />
      <div class="texT">Equipment Status:</div>
        <div class="buttons-container">
            <StepButton :active="amenity_type === 'wifi'" icon="material-symbols:wifi-rounded"
                label="WIFI" @setActive="() => setActive('wifi')">
            </StepButton>
            <StepButton :active="amenity_type === 'tv'" icon="material-symbols-light:tv-outline"
                label="TV" @setActive="() => setActive('tv')">
            </StepButton>
            <StepButton :active="amenity_type === 'kitchen'" icon="hugeicons:oven"
                label="Kitchen" @setActive="() => setActive('kitchen')">
            </StepButton>
            <StepButton :active="amenity_type === 'smokeAlarm'" icon="tabler:alarm-smoke"
                label="Smoke alarm" @setActive="() => setActive('smokeAlarm')">
            </StepButton>
            <StepButton :active="amenity_type === 'firstAidKit'" icon="jam:first-aid"
                label="First aid kit" @setActive="() => setActive('firstAidKit')">
            </StepButton>
            <StepButton :active="amenity_type === 'washer'" icon="iconoir:washing-machine"
                label="Washer" @setActive="() => setActive('washer')">
            </StepButton>
            <StepButton :active="amenity_type === 'parking'" icon="fluent:vehicle-car-parking-16-regular"
                label="Parking" @setActive="() => setActive('parking')">
            </StepButton>
            <StepButton :active="amenity_type === 'airConditioning'" icon="mingcute:air-condition-line"
                label="Air Conditioning" @setActive="() => setActive('airConditioning')">
            </StepButton>
            <StepButton :active="amenity_type === 'carboneMonoxideAlarn'" icon="carbon:alarm-subtract"
                label="Carbon monoxide alarm" @setActive="() => setActive('carboneMonoxideAlarn')">
            </StepButton>
            <StepButton :active="amenity_type === 'fireExtinguisher'" icon="lucide:fire-extinguisher"
                label="Fire extinguisher" @setActive="() => setActive('fireExtinguisher')">
            </StepButton>
            <StepButton :active="amenity_type === 'pool'" icon="icon-park-outline:swimming-pool"
                label="Pool" @setActive="() => setActive('pool')">
            </StepButton>
        </div>

        <div class="texT">Description:</div>
    <textarea class="description" placeholder="Enter description for your house"></textarea>

        <!-- map -->
        <div class="map">
            <div class="text">Set a specific location</div>
            <span>Make it clear to guests where your place is located. We'll only share your <br>
            address after they've made a reservation. <span class="learnMore">Learn more</span></span>

            <div class="map-container">
                <MapComponent></MapComponent>
            </div>
        </div>
        <FooterComponent></FooterComponent>
  </div>
</template>

<script>
import DynamicForm from "@/components/Admin/DynamicForm.vue";
import MapComponent from "@/components/MapComponent.vue";
import ImageInForm from "@/components/Admin/ImageInForm.vue";
import StepButton from "@/components/StepButton.vue";
import HeaderNav3 from "@/components/Landlord/HeaderNav3.vue";
import FooterComponent from "@/components/FooterComponent.vue";

export default {
  components: { DynamicForm, MapComponent, ImageInForm, StepButton },
  data() {
    return {
      house1Inputs: [
        { key: "title", label: "Title", type: "text", placeholder: "Cozy Home" },
        { key: "price", label: "Price", type: "text", placeholder: "300" },
        { key: "city", label: "City", type: "text", placeholder: "Phnom Penh" },
        { key: "address", label: "Address", type: "text", placeholder: "#40, Toul Kork,..." },
        { key: "floor", label: "Floor", type: "text", placeholder: "Enter floor" },
        { key: "type", label: "Type", type: "text", placeholder: "Select type" },
      ],

      amenity_type: null,
    };
  },
  methods: {
    handleFormSubmit(formData) {
      console.log("Form submitted with data:", formData);
    },

    setActive(type) {
            if(this.amenity_type === type){ 
                this.amenity_type = null
            }else{
                this.amenity_type = type;
            }
            console.log(this.amenity_type);
        }
  },
};
</script>

<style scoped>
.container{
  display: flex;
  flex-direction: column;
  padding-inline: 200px;
}
.texT {
  font-size: 22px;
  font-weight: bold;
  margin-top: 35px;
  margin-bottom: 25px;
}

.equipment {
  display: grid;
  grid-template-columns: repeat(5, auto);
  gap: 15px;
}

.description{
    width: 95%;
    height: 200px;
    border-radius: 15px;
    border: 1px solid #D3D3D3;
    box-shadow: 0 12px 10px 0 rgba(0, 0, 0, 0.05);
    padding: 20px 30px;
    font-size: 24px;
    margin-top:10px;
    position: relative;
}


.description::placeholder{
    font-size: 24px;
}

/* map */
.text{
    font-size: 22px;
    font-weight: bold;
    margin-top: 35px;
    margin-bottom: 10px;
}
.map > span{
    font-size: 19px;
    font-weight: 300;
    margin-top: 20px;
    line-height: 1.7;
}
.learnMore{
    text-decoration: underline;
    font-weight: bold;
    cursor: pointer;
}
.map-container {
    width: 100%;
    height: 500px;
    overflow: hidden;
    border-radius: 20px;
    background-color: grey;
    box-shadow: 0px 8px 12px rgba(0, 0, 0, 0.1), 0px 4px 6px rgba(0, 0, 0, 0.1);
    margin-top: 30px;
    margin-bottom: 70px;
}
.buttons-container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    gap: 20px;
    width: 100%;
    box-sizing: border-box;
    padding: 15px;
}
</style>
