<template>
    <header>
        <HeaderNav2></HeaderNav2>
    </header>

    <main>
        <div class="breadContainer">
            <BreadCrumbs style="margin: 30px 0px; align-self: flex-start;" />
            <h1 style="margin: 0px;">Notifications</h1>
        </div>
        <div class="notiList">
            <notiComponent img-url="src/assets/images/pfp.jpg" name="Shen Yue"
                description="Your tour request has been accepted by the landlord. Requested Date: March 15, 2025, 2:00 PM "
                date="16 Mar" icon-name="teenyicons:tick-circle-solid" icon-color="green" />
            <notiComponent img-url="src/assets/images/pfp.jpg" name="Shen Yue"
                description="Unfortunately, the landlord has declined your tour request for Modern Studio in City Center."
                date="16 Mar" icon-name="gridicons:cross-circle" icon-color="red" />
            <notiComponent img-url="src/assets/images/pfp.jpg" name="Shen Yue"
                description="Your tour request for Modern Studio in City Center is awaiting landlord approval."
                date="16 Mar" icon-name="ion:hourglass-outline" icon-color="#2D01CE" />
            <notiComponent img-url="src/assets/images/pfp.jpg" name="Shen Yue"
                description="Your tour request has been accepted by the landlord. Requested Date: March 15, 2025, 2:00 PM "
                date="16 Mar" icon-name="teenyicons:tick-circle-solid" icon-color="green" />
        </div>
    </main>
    <footer>
        <FooterComponent></FooterComponent>
    </footer>
</template>

<script>
import FooterComponent from '@/components/FooterComponent.vue';
import HeaderNav2 from '@/components/headerComponents/HeaderNav2.vue';
import notiComponent from '@/components/notificationComponent/notiComponent.vue';
import BreadCrumbs from '@/components/BreadCrumbs.vue';
export default {
    components: {
        FooterComponent,
        HeaderNav2,
        notiComponent,
        BreadCrumbs
    }
}
</script>

<style scoped>
span {
    font-size: 20px;
}

main {
    padding-inline: 300px;
}

.breadContainer {
    display: flex;
    flex-direction: column;
    align-items: start;
    gap: 15px;
    margin-bottom: 20px
}

.notiList {
    width: 100%;
    display: flex;
    flex-direction: column;
}
</style>