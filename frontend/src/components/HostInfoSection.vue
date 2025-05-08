<template>
        <h1 style="margin-top: 100px;">Meet Your Host</h1>
        <div class="info-main">
            <div class="host-card">

                <div class="host-icon">
                    <div class="left" style="display: flex; flex-direction: column; justify-content: center; align-items: center;">
                        <div class="host-image" style="display: flex; justify-content: center; align-items: center; position: relative;">
                            <Icon icon="octicon:feed-person-16" width="130" height="130"  style="color: #000" />
                            <Icon icon="si:verified-fill" width="35" height="35" style="color: blue; position: absolute; bottom: 1px; right: -1px;"/>
                        </div>
                        <h2>Shen Yue</h2>
                    </div>
                </div>

                <div class="host-rating">
                    <div class="right" style="display: flex; flex-direction: column; justify-content: center; align-items: center;">
                        <div class="rating-info">
                            <div class="info-item">
                                <span class="reviews">300</span>
                                <span class="label">reviews</span>
                            </div>
                            <div class="info-item">
                                <span class="rating">
                                <span class="star-icon">
                                    <Icon icon="stash:star-solid" width="24" height="24"  style="color: #000"/></span>
                                    4.88
                                </span>
                                <span class="label">rating</span>
                            </div>
                            <div class="info-item">
                                <span class="years">5</span>
                                <span class="label">years on Romdoul</span>
                            </div>

                        </div>
                        <button class="host-info-btn">Host Info</button>     
                    </div>

                </div>
                
            </div>

            <div class="host-info">
                <div class="info-details">
                    <h2>About Shen Yue</h2>
                    <p><span class="p-icon">
                        <Icon icon="akar-icons:language" width="22" height="22"  style="color: #000" /></span> Speak English, French and Khmer <span class="divider"></span> <span class="p-icon">
                        <Icon icon="fluent:globe-location-24-regular" width="22" height="22"  style="color: #000" /></span> Lives in Phnom Penh, Cambodia</p>
                    <p>I love traveling very much, and I know what you need and hope that my villa and service will bring you a more perfect vacation! I hope to make friends with you.</p>
                </div>
                <div class="host-details">
                    <h2>Host Details</h2>
                    <p>Response rate: 100%</p>
                    <p>Responds within an hour</p>
                    <button class="host-message-btn">Message Host</button>     
                </div>   

            </div>
        </div>

</template>
<script></script>


<style scoped>
.info-main {
    display: flex;
    flex-direction: row;
    gap: 100px;
    width: 100%;
}

.host-card{
    display: flex;
    border: 1px solid white;
    border-radius: 20px;
    flex-direction: row;
    gap: 20px;
    width: 35%;
    height: 300px;
    box-sizing: border-box;
    padding: 20px;
    background-color: white;
    box-shadow: 1px 8px 12px rgb(153, 153, 153);
}

.host-icon{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    height: 100%;
    width: 45%;
}

.host-rating{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    height: 100%;
    width: 55%;
}

.info-item {
    display: flex;
    flex-direction: column;
    width: 200px;
    padding: 1px 0;
    border-bottom: 1px solid #000000; /* Horizontal line between items */
}

.reviews,
.rating,
.years {
    font-size: 22px; /* Larger font size to match the bold look */
    font-weight: bold;
    line-height: 1.2;
}

.rating .star-icon {
    color: #000;
    font-size: 22px;
    font-weight: bold;
    margin-right: 1px;
}

.label {
    font-size: 16px;
    font-weight: normal;
    color: #000;
}

.host-info-btn {
    margin-top: 15px;
    width: 60%;
    padding: 12px;
    background-color: #000;
    color: #fff;
    border: none;
    border-radius: 15px; 
    font-size: 16px;
    font-weight: bold;
    text-transform: uppercase;
    cursor: pointer;
}

.host-info-btn:hover {
    background-color: #000536;
}

.host-info {
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 65%;
    height: 100%;
    margin-top: -25px;
}

.info-details p {
    font-size: 18px;
    color: #000;
    margin: 0;
    padding: 7px;

}

.host-details p {
    font-size: 18px;
    color: #000;
    margin: 0;

}

.divider {
    margin: 0 100px;
  }

.p-icon {
    margin-right: 10px;
    color: #000;
}  

.host-message-btn {
    margin-top: 15px;
    width: 20%;
    padding: 12px;
    background-color: #000;
    color: #fff;
    border: none;
    border-radius: 15px; 
    font-size: 16px;
    font-weight: bold;
    text-transform: uppercase;
    cursor: pointer;
}

.host-message-btn:hover {
    background-color: #000536;
}
</style>
