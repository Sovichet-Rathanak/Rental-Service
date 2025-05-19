<template>
    <div class="footer-container">
        <div class="footer-main">
            <h1>Quality homes, <br>affordable living.</h1>
            <div>
                <h4>Contact Us</h4>
                <ul style="list-style-type: none; padding: 0;">
                    <li>Email: romdouljoulpteas@gmail.com</li>
                    <li>Contact Number: +123 12345678</li>
                    <li>Address: #14 ST28B, Sangkat BKK1 </li>
                </ul>
                <h4>Get Help</h4>
                <span>Report any related concern</span>
            </div>
            <div>
                <h4>About</h4>
                <ul style="list-style-type: none; padding: 0;">
                    <li>About our rental service</li>
                    <li>Terms and conditions</li>
                    <li>Privacy and policy</li>
                </ul>
            </div>
            <div>
                <h4>Our Social</h4>
                <Icon icon="ic:baseline-facebook" width="40" height="40" style="color: black; margin-right: 10px;" />
                <Icon icon="mdi:instagram" width="40" height="40" style="color: black; margin-inline: 10px;" />
                <Icon icon="mdi:linkedin" width="40" height="40" style="color: black; margin-inline: 10px;" />
            </div>
        </div>
        <div class="footer-sub">
            <h4>ⒸRomdoul Rental All Rights Reserved. </h4>
        </div>
    </div>
</template>

<style scoped>
.footer-container {
    display: flex;
    border-top: 1px solid rgba(128, 128, 128, 0.508);
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-inline: 100px;
    margin-top: 60px;
    background-color: white;
}

.footer-main {
    display: grid;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding-top: 30px ;
    padding-bottom: 30px ;
    grid-template-columns: repeat(4, 1fr);
    border-bottom: 1px solid rgba(128, 128, 128, 0.508);
}
</style>