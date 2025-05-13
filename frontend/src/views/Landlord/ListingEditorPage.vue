<template>
    <header>
        <header-nav-3></header-nav-3>
    </header>

    <main>
        <div class="header">
            <Icon icon="material-symbols:arrow-back-rounded" width="33" height="33"></Icon>
            Listing Editor
        </div>

        <!-- upload image -->
        <div class="addImage">
            <img :src="imageUrl" alt="Uploaded Image" />
            <div class="buttonOverlay">
                <button @click="triggerFileInput">Add/Edit Images</button>
                 <input
                    type="file"
                    accept="image/*"
                    ref="fileInput"
                    @change="handleImageUpload"
                    style="display: none"
                />        
             </div>
        </div>

        <div class="houseInfo">
            <div class="title">
                <label for="title">Title:</label>
                <input type="text" placeholder="BKK1, Cambodia">
            </div>

            <div class="price">
                <label for="price">Price:</label>
                <input type="price" placeholder="300">
            </div>

            <div class="city">
                <label for="city">City:</label>
                <input type="text" placeholder="Phnom Penh">
            </div>

            <div class="address">
                <label for="address">Address:</label>
                <input type="text" placeholder="#40, Toul Kork,...">
            </div>

            <div class="floor">
                <label for="floor">Floor:</label>
                <input type="text" placeholder="Enter floor">
            </div>

            <div class="type">
                <label for="type">Type:</label>
                <input type="text" placeholder="Select type">
            </div>
        </div>

        <!-- equipement -->
        <div class="texT">Equipment Status:</div>
        <div class="equipment">
        <EquipmentItem
            v-for="(equipement, index) in equipements"
            :key="index"
            :icon="equipement.icon"
            :text="equipement.text"
        />
        </div>

        <div class="texT">Description:</div>
        <textarea class="description" placeholder="Enter description for your house"></textarea>

        <!-- map -->
        <div class="map">
            <div class="text">Set a specific location</div>
            <span>Make it clear to guests where your place is located. We’ll only share your <br>
            address after they've made a reservation. <span class="learnMore">Learn more</span></span>

            <div class="map-container">
                <MapComponent></MapComponent>
            </div>
        </div>
    </main>

</template>

<script>
import HeaderNav3 from '@/components/Landlord/HeaderNav3.vue';
import EquipmentItem from '@/components/Landlord/EquipementComponent.vue';
import MapComponent from '@/components/MapComponent.vue';
export default {
    components: {
        HeaderNav3,
        EquipmentItem,
        MapComponent
    },

    data(){
        return {
            equipements: [
                { text: 'WIFI', icon: 'material-symbols:wifi-rounded'},
                { text: 'TV', icon: 'material-symbols-light:tv-outline'},
                { text: 'KItchen', icon: 'hugeicons:oven'},
                { text: 'Smoke alarm', icon: 'tabler:alarm-smoke'},
                { text: 'First aid kit', icon: 'jam:first-aid'},

                { text: 'Washer', icon: 'iconoir:washing-machine'},
                { text: 'Parking', icon: 'fluent:vehicle-car-parking-16-regular'},
                { text: 'Air Conditioning', icon: 'mingcute:air-condition-line'},
                { text: 'Carbon monoxide alarm', icon: 'carbon:alarm-subtract'},
                { text: 'Fire extinguisher', icon: 'lucide:fire-extinguisher'},

                { text: 'Workspace', icon: 'streamline:workspace-desk'},
                { text: 'Pool', icon: 'icon-park-outline:swimming-pool'},
                { text: 'WIFI', icon: 'material-symbols:wifi-rounded'},
                { text: 'WIFI', icon: 'material-symbols:wifi-rounded'},
            ],
            imageUrl: ('/src/assets/images/property_images/property1.jpeg')
        }
    },
    methods: {
    triggerFileInput() {
      this.$refs.fileInput.click();
    },
    handleImageUpload(event) {
      const file = event.target.files[0];
      if (file) {
        this.imageUrl = URL.createObjectURL(file);
      }
    }
  }
}
</script>

<style scoped>
main{
    padding: 0 150px 20px 150px;
}
.header{
    display: flex;
    align-items: center;
    font-size: 27px;
    font-weight: bold;
    gap: 20px;
    margin-bottom: 20px
}

/* upload image */
.addImage {
    position: relative;
    width: 400px; 
    border-radius: 15px;
    overflow: hidden;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    margin: 5px 0 40px 5px;
}

.addImage img {
    width: 100%;
    height: 400px;
    display: block;
    filter: brightness(40%); 
}

.buttonOverlay {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.buttonOverlay button {
    background-color: black;
    color: white;
    border: 0.5px solid #989898;
    padding: 14px 24px;
    font-size: 18px;
    border-radius: 15px;
    cursor: pointer;
    transition: background-color 0.3s;
    font-weight: 600;
}

.buttonOverlay button:hover {
    background-color: #333;
}


/* input text */
.houseInfo{
    display: grid;
    grid-template-columns: repeat(2, auto);
    gap: 25px
}
label{
    font-size: 22px;
    font-weight: 400;
}
input{
    width: 820px;
    border-radius: 15px;
    border: 1px solid #D3D3D3;
    box-shadow: 0 12px 10px 0 rgba(0, 0, 0, 0.05);
    padding: 19px;
    font-size: 20px;
    margin-top:10px
}
input::placeholder{
    font-size: 20px;
}

/* Equipment */
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
    width: 100%;
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

