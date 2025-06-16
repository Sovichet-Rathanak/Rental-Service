<template>
    <header>
        <HeaderNav2 />
    </header>

    <main class="content">
        <BreadCrumbs style="margin: 30px 0px; align-self: flex-start;" />

        <div class="info-container">
            <div class="info-section">
                <!-- Profile Picture Upload -->
                <div class="pfp-container">
                    <label for="pfp-upload" class="pfp-wrapper">
                        <Icon v-if="!user.pfp_original_url"  icon="ion:person" width="120" height="120"  style="color: black" />
                        <img v-else :src="`http://localhost:9000/romdoul/${user.pfp_original_url}`" alt="Profile Picture" class="pfp-img" @error="onImageError" />
                        <div class="overlay">Change</div>
                        <input type="file" id="pfp-upload" accept="image/*" @change="handlePfp" />
                    </label>
                    <p class="pfp-name">{{ user.firstname }} {{ user.lastname }}</p>
                </div>

                <!-- Info List -->
                <div v-for="(item, index) in personalInfo" :key="index" class="info-item">
                    <div>
                        <strong>{{ item.label }}</strong>
                        <p>{{ item.value || 'Not provided' }}</p>
                    </div>
                    <button v-if="!item.editing" class="edit-btn" @click="enableEdit(index)"
                        :aria-label="`Edit ${item.label}`">
                        Edit
                    </button>
                </div>
            </div>

            <!-- Sidebar Info -->
            <aside class="info-sidebar">
                <div v-for="(box, index) in sidebarItems" :key="index" class="info-box">
                    <Icon :icon="box.icon" class="icon" />
                    <h3>{{ box.title }}</h3>
                    <p>{{ box.text }}</p>
                </div>
            </aside>
        </div>
    </main>

    <footer>
        <FooterComponent />
    </footer>
</template>

<script>
import BreadCrumbs from '@/components/BreadCrumbs.vue';
import FooterComponent from '@/components/FooterComponent.vue';
import HeaderNav2 from '@/components/headerComponents/HeaderNav2.vue';
import { useUserStore } from '@/stores/user';
import { mapActions, mapState } from 'pinia';

export default {
    components: {
        HeaderNav2,
        FooterComponent,
        BreadCrumbs,
    },
    computed: {
        ...mapState(useUserStore, ['user']),
        personalInfo() {
            return [
                { label: 'Fist name', value: `${this.user.firstname}`, editing: false },
                { label: 'Last name', value: `${this.user.lastname}`, editing: false },
                { label: 'Email address', value: this.user.email || '', editing: false },
            ];
        },
    },
    data() {
        return {
            sidebarItems: [
                {
                    title: 'Why isn’t my info shown here?',
                    text: 'We’re hiding some account details to protect your identity.',
                    icon: 'mdi:lock',
                },
                {
                    title: 'Which details can be edited?',
                    text: 'Contact info and personal details can be edited. If this info was used to verify your identity, you’ll need to get verified again the next time you book or to continue hosting.',
                    icon: 'mdi:account-edit',
                },
                {
                    title: 'What info is shared with others?',
                    text: 'Romdoul Joul Pteas only releases contact information for Hosts and guests after a reservation is confirmed.',
                    icon: 'mdi:eye-outline',
                },
            ],
        };
    },
    methods: {
        ...mapActions(useUserStore, ['handlePfp']),
    },
};
</script>


<style scoped>
.header {
    padding: 25px 200px;
    margin-bottom: 10px;
}

.header h3 {
    color: #555;
    font-size: 18px;
    margin-bottom: 10px;
}

.header h2 {
    font-size: 30px;
    font-weight: 600;
    color: #222;
    margin-bottom: 25px;
}

.content {
    display: flex;
    flex-direction: column;
    padding: 0 200px;
}

.info-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.info-section {
    width: 50%;
}

.info-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 0;
    border-bottom: 1px solid #e0e0e0;
}

.info-item strong {
    font-size: 20px;
    font-weight: 500;
}

.info-item p {
    font-size: 16px;
    color: #666;
    margin-top: 4px;
}

.edit-btn {
    background: none;
    border: none;
    color: #007bff;
    font-size: 20px;
    cursor: pointer;
    transition: color 0.2s ease;
}

.edit-btn:hover,
.edit-btn:focus {
    color: #0056b3;
    text-decoration: underline;
}

.info-sidebar {
    width: 40%;
    box-sizing: border-box;
    background: #fff;
    padding: 40px;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    border: 1px solid #e0e0e0;
}

.info-box {
    margin-bottom: 20px;
}

.info-box h3 {
    font-size: 20px;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
}

.icon {
    font-size: 30px;
    color: #007bff;
    display: block;
}

.info-box p {
    font-size: 16px;
    color: #666;
}

.pfp-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 30px;
}

.pfp-wrapper {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 200px;
    height: 200px;
    border-radius: 50%;
    overflow: hidden;
    cursor: pointer;
    border: 2px solid #ccc;
    transition: border-color 0.3s ease;
}

.pfp-wrapper:hover {
    border-color: #007bff;
}

.pfp-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
}

.pfp-wrapper input[type="file"] {
    display: none;
}

.overlay {
    position: absolute;
    bottom: 0;
    background: rgba(0, 123, 255, 0.6);
    color: white;
    width: 100%;
    text-align: center;
    font-size: 14px;
    padding: 5px 0;
    opacity: 0;
    transition: opacity 0.3s ease;
}

.pfp-wrapper:hover .overlay {
    opacity: 1;
}

.pfp-name {
    font-size: 18px;
    font-weight: 500;
    margin-top: 10px;
    color: #333;
}
</style>