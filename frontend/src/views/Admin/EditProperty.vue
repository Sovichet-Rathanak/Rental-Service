<template>
  <div class="container">
    <div class="top">
    <ImageInForm 
      title="Edit Property"
      imageUrl="/src/assets/images/property_images/property1.jpeg"
      text="Add Images"
      :backRoute="{ name: 'Admin Dashboard House'}"
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
      <div class="buttons-container">
            <h3>What about these guest favorites?</h3>
            <div class="fave-amen-container">
                <StepButton v-for="(amenity, index) in guestFavorites" :key="'fave-' + index" :label="amenity.label"
                    :icon="amenity.icon" :active="selectedAmenities.includes(amenity)"
                    @setActive="toggleAmenity(amenity)"></StepButton>
            </div>
            <h3>Do you have any standout amenities?</h3>
            <div class="stand-amen-container">
                <StepButton v-for="(amenity, index) in standOut" :key="'standOut-' + index" :label="amenity.label"
                    :icon="amenity.icon" :active="selectedAmenities.includes(amenity)"
                    @setActive="toggleAmenity(amenity)"></StepButton>
            </div>
            <h3>Do you have any of these safety items?</h3>
            <div class="safety-amen-container">
                <StepButton v-for="(amenity, index) in safetyItems" :key="'safety-' + index" :label="amenity.label"
                    :icon="amenity.icon" :active="selectedAmenities.includes(amenity)"
                    @setActive="toggleAmenity(amenity)"></StepButton>
            </div>
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
        guestFavorites: [
            {
                label: "Wifi",
                icon: 'material-symbols:wifi'
            },
            {
                label: "TV",
                icon: 'material-symbols-light:tv-outline-rounded'
            },
            {
                label: "Kitchen",
                icon: 'fluent:oven-48-regular'
            },
            {
                label: "Washer",
                icon: 'fluent:washer-32-regular'
            },
            {
                label: "Free parking",
                icon: 'iconoir:parking'
            },
            {
                label: "Paid parking",
                icon: 'maki:parking-paid'
            },
            {
                label: "Air conditioning",
                icon: 'mynaui:snow'
            },
            {
                label: "Dedicated workspace",
                icon: 'streamline:workspace-desk'
            }
        ],
        standOut: [
            {
                label: "Pool",
                icon: 'cil:pool'
            },
            {
                label: "Coffee machine",
                icon: 'icon-park-outline:coffee-machine'
            },
            {
                label: "Balcony",
                icon: 'iconoir:balcony'
            },
            {
                label: "Garden",
                icon: 'hugeicons:flower-pot'
            },
            {
                label: "Fire pit",
                icon: 'hugeicons:fire-pit'
            },
            {
                label: "BBQ grill",
                icon: 'hugeicons:bbq-grill'
            }
        ],
        safetyItems: [
            {
                label: "Smoke Alarm",
                icon: 'tabler:alarm-smoke'
            },
            {
                label: "First aid kit",
                icon: 'hugeicons:first-aid-kit'
            },
            {
                label: "Fire extinguisher",
                icon: 'streamline:fire-extinguisher-sign'
            },
        ]
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
    },

    toggleAmenity(amenity) {
        if (this.selectedAmenities.includes(amenity)) {
            this.selectedAmenities = this.selectedAmenities.filter(a => a !== amenity);
        } else {
            this.selectedAmenities.push(amenity);
        }
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

.equipment {
  display: grid;
  grid-template-columns: repeat(5, auto);
  gap: 15px;
}

h3 {
    margin: 50px 0px 10px 0px;
}

.buttons-container {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 20px;
    width: 100%;
    box-sizing: border-box;
}

.fave-amen-container,
.stand-amen-container,
.safety-amen-container {
    display: grid;
    align-self: center;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    width: 100%;
    box-sizing: border-box;
    padding: 20px 5px;
}

.texT{
    font-size: 22px;
    font-weight: bold;
    margin-top: 35px;
    margin-bottom: 10px;
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
</style>
