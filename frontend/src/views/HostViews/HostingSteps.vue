<template>
    <div class="main-container">
        <header>
            <button class="exit-btn">Exit</button>
        </header>

        <main>
            <router-view></router-view>
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
            const childRoutes = this.getAllChildRoutes("Hosting Steps");
            console.log(this.percent);
            
            if (this.currentRoute < childRoutes.length) {
                this.currentRoute++;
                this.progressPercent = (100 / childRoutes.length) * this.currentRoute;

                let childRouteName = childRoutes[this.currentRoute-1].name;
                this.$router.push({name: `${childRouteName}`});
            } else {
                return;
            }
        },

        prevPage() {
            const childRoutes = this.getAllChildRoutes("Hosting Steps");
            if (this.currentRoute > 1 && childRoutes.length > 0) {
                this.currentRoute--;

                console.log(this.currentRoute)
                this.progressPercent = (100 / childRoutes.length) * this.currentRoute;
                
                let childRouteName = childRoutes[this.currentRoute -1].name;
                this.$router.push({name: `${childRouteName}`});
            }
        },
    },
    computed:{
        percent(){
            let childRoutes = this.getAllChildRoutes("Hosting Steps");
            return (100 / childRoutes.length) * this.currentRoute;
        }
    }
};
</script>

<style scoped>
.main-container {
    height: 100vh;
    display: flex;
    flex-direction: column;
    margin: 0;
    padding: 0;
}

header,
footer {
    width: 100%;
    display: flex;
}

header {
    justify-content: flex-end;
}

footer {
    flex-direction: column;
    justify-content: center;
}

main {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    box-sizing: border-box;
    padding-inline: 300px;
    width: 100%;
    height: 100%;
}

.progress-border {
    width: 100%;
    background-color: lightgrey;
}

.progress-bar {
    height: 5px;
    background-color: black;
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