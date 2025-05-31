<template>
  <div class="container">
    <div class="top">
    <ImageInForm 
      title="Create Room"
      imageUrl="/src/assets/images/property_images/property1.jpeg"
      text="Add Images"
      :backRoute="{ name: 'Admin Dashboard Room'}"
      @image-uploaded="handleImage"
    ></ImageInForm>

    <button>Save</button>
    </div>

    <DynamicForm
      class="form"
      icon="material-symbols:arrow-back-rounded"
      :inputSet="RoomInputs"
      @submit="handleFormSubmit"  
    />
      <div class="texT">Equipment Status:</div>
        <div class="buttons-container">
            <StepButton :active="isAmenitySelected('wifi')" icon="material-symbols:wifi-rounded"
                label="WIFI" @setActive="() => setActive('wifi')">
            </StepButton>
            <StepButton :active="isAmenitySelected('tv')" icon="material-symbols-light:tv-outline"
                label="TV" @setActive="() => setActive('tv')">
            </StepButton>
            <StepButton :active="isAmenitySelected('kitchen')" icon="hugeicons:oven"
                label="Kitchen" @setActive="() => setActive('kitchen')">
            </StepButton>
            <StepButton :active="isAmenitySelected('smokeAlarm')" icon="tabler:alarm-smoke"
                label="Smoke alarm" @setActive="() => setActive('smokeAlarm')">
            </StepButton>
            <StepButton :active="isAmenitySelected('firstAidKit')" icon="jam:first-aid"
                label="First aid kit" @setActive="() => setActive('firstAidKit')">
            </StepButton>
            <StepButton :active="isAmenitySelected('washer')" icon="iconoir:washing-machine"
                label="Washer" @setActive="() => setActive('washer')">
            </StepButton>
            <StepButton :active="isAmenitySelected('parking')" icon="fluent:vehicle-car-parking-16-regular"
                label="Parking" @setActive="() => setActive('parking')">
            </StepButton>
            <StepButton :active="isAmenitySelected('airConditioning')" icon="mingcute:air-condition-line"
                label="Air Conditioning" @setActive="() => setActive('airConditioning')">
            </StepButton>
            <StepButton :active="isAmenitySelected('carboneMonoxideAlarn')" icon="carbon:alarm-subtract"
                label="Carbon monoxide alarm" @setActive="() => setActive('carboneMonoxideAlarn')">
            </StepButton>
            <StepButton :active="isAmenitySelected('fireExtinguisher')" icon="lucide:fire-extinguisher"
                label="Fire extinguisher" @setActive="() => setActive('fireExtinguisher')">
            </StepButton>
            <StepButton :active="isAmenitySelected('pool')" icon="icon-park-outline:swimming-pool"
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
   

  </div>
</template>

<script>
import DynamicForm from "@/components/Admin/DynamicForm.vue";
import MapComponent from "@/components/MapComponent.vue";
import ImageInForm from "@/components/Admin/ImageInForm.vue";
import StepButton from "@/components/StepButton.vue";

export default {
  components: { DynamicForm, MapComponent, ImageInForm, StepButton },
  data() {
    return {
      RoomInputs: [
        { key: "title", label: "Title", type: "text", placeholder: "Cozy Home" },
        { key: "price", label: "Price", type: "text", placeholder: "300" },
        { key: "city", label: "City", type: "text", placeholder: "Phnom Penh" },
        { key: "address", label: "Address", type: "text", placeholder: "#40, Toul Kork,..." },
        { key: "houseNane", label: "House Name", type: "text", placeholder: "Cozt House" },
        { key: "roomSize", label: "Room Size", type: "text", placeholder: "Length x Width" },
      ],

      selectedAmenities: [],
    };
  },
  methods: {
    handleFormSubmit(formData) {
      console.log("Form submitted with data:", formData);
    },

    setActive(type) {
      const index = this.selectedAmenities.indexOf(type);
      if (index > 1 ) {
        this.seclectedAmenities.splice(index, 1);
      }else {
        this.selectedAmenities.push(type);
      }
            
    },

    isAmenitySelected(type) {
      return this.selectedAmenities.includes(type);
    }
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
    margin-top: 30px
}
.buttons-container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    gap: 20px;
    width: 89vw;
    box-sizing: border-box;
    padding: 15px;
}
</style>
