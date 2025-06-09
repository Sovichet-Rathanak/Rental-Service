<template>
    <div class="main-container">
        <header>
            <button class="exit-btn">Exit</button>
        </header>
        <main>
            <Transition>
                <router-view></router-view>
            </Transition>
        </main>

        <footer>
            <div class="progress-border">
                <div class="progress-bar" :style="{ width: percent + '%' }"></div>
            </div>
            <div class="button-container">
                <button class="back-btn" @click="prevPage">Back</button>
                <button class="next-btn" @click="nextPage">Next</button>
            </div>
        </footer>
    </div>
</template>

<script>
import { useImageStore } from '@/stores/image';
import { useListingStore } from '@/stores/listing';
import axios from 'axios';
import { mapStores } from 'pinia';

export default {
    name: 'MainLayout',
    data() {
        return {
            progressPercent: 0,
            currentRoute: 1,
        }
    },
    methods: {
        getAllChildRoutes(routeName) {
            const route = this.$router.options.routes;
            const targetRoute = route.find(route => route.name === routeName);

            if (targetRoute && targetRoute.children) {
                return targetRoute.children;
            } else {
                return [];
            }
        },

        nextPage() {
            const nextIndex = this.currentRouteIndex + 1;
            if (nextIndex < this.childRoutes.length) {
                this.$router.push({ name: this.childRoutes[nextIndex].name });
            } else {
                this.handleSubmit();
            }
        },

        prevPage() {
            const prevIndex = this.currentRouteIndex - 1;
            if (prevIndex >= 0) {
                this.$router.push({ name: this.childRoutes[prevIndex].name });
            }
        },

        async handleSubmit() {
            const form = this.listingStore.listingForm;
            try {
                console.log(form)
                const createRsp = await axios.post('http://localhost:3000/api/listing/', form)
                const listingId = createRsp.data.id;
                console.log(listingId)
            }catch(error){
                console.log(error);
            }
        }
    },
    computed: {
        ...mapStores(useListingStore),
        ...mapStores(useImageStore),

        percent() {
            const childRoutes = this.getAllChildRoutes("Hosting Steps");
            const index = childRoutes.findIndex(r => r.name === this.$route.name);
            return ((index + 1) / childRoutes.length) * 100;
        },

        currentRouteIndex() {
            const childRoutes = this.getAllChildRoutes("Hosting Steps");
            return childRoutes.findIndex(r => r.name === this.$route.name);
        },

        childRoutes() {
            return this.getAllChildRoutes("Hosting Steps");
        }
    }

};
</script>

<style scoped>
.main-container {
    display: flex;
    height: 100vh;
    flex-direction: column;
    margin: 0;
    padding: 0;
}

header {
    position: sticky;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
    background-color: white;
    display: flex;
    justify-content: flex-end;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1),
        0 2px 4px rgba(0, 0, 0, 0.05);
}

footer {
    position: sticky;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 100;
    background-color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

main {
    flex: 1;
    display: flex;
    justify-content: center;
    box-sizing: border-box;
    padding: 0 14%;
    margin: 0 auto;
    width: 100%;
    padding-bottom: 30px;
}

.v-enter-active,
.v-leave-active {
    transition: opacity 1s ease, transform 1s ease-out;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
    transform: translateY(6px);
}

.progress-border {
    width: 100%;
    background-color: lightgrey;
}

.progress-bar {
    height: 5px;
    background-color: black;
    transition: 700ms width ease-in;
}

.button-container {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.exit-btn,
.next-btn {
    margin: 30px 40px;
    font-size: 16px;
    padding: 16px;
    width: 100px;
    border: none;
    border-radius: 14px;
    cursor: pointer;
    background-color: transparent;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2),
        0 4px 4px rgba(0, 0, 0, 0.1);
    transition: background-color 0.3s ease, box-shadow 0.3s ease, transform 0.2s ease;
}

.exit-btn:hover {
    background-color: rgb(230, 230, 230);
}

.next-btn {
    background-color: #345FCC;
    color: white;
    font-weight: bold;
}

.next-btn:hover {
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15),
        0 2px 4px rgba(0, 0, 0, 0.1);
}

.exit-btn:active,
.next-btn:active {
    box-shadow: none;
}

.back-btn {
    border: none;
    background-color: transparent;
    margin-left: 40px;
    font-size: 16px;
    text-decoration: underline;
    color: black;
    font-weight: bold;
    cursor: pointer;
}
</style>