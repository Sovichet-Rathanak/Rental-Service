<template>
    <HeaderNav2></HeaderNav2>
    <header class="header">
        <h3>Account &gt; Personal info</h3>
        <h2>Personal info</h2>  
    </header>

    <div class="content">
        <!-- Main content -->
        <div class="info-section">
            <div v-for="(item, index) in personalInfo" :key="index" class="info-item">
                <div>
                    <strong>{{ item.label }}</strong>
                    <p>{{ item.value || 'Not provided' }}</p>
                </div>
                <button v-if="!item.editing" class="edit-btn" @click="enableEdit(index)" aria-label="Edit {{ item.label }}">
                    Edit
                </button>
            </div>
        </div>

        <!-- Sidebar -->
        <aside class="info-sidebar">
            <div v-for="(box, index) in sidebarItems" :key="index" class="info-box">
                <Icon :icon="box.icon" class="icon" />
                <h3>{{ box.title }}</h3>
                <p>{{ box.text }}</p>
            </div>
        </aside>
    </div>
</template>

<script>
import HeaderNav2 from '@/components/headerComponents/HeaderNav2.vue';

export default {
    components: {
        HeaderNav2
    },
    data() {
        return {
            personalInfo: [
                { label: 'Legal name', value: 'Lina Van', editing: false },
                { label: 'Preferred first name', value: '', editing: false },
                { label: 'Email address', value: 'linavan2509@gmail.com', editing: false },
                { label: 'Phone numbers', value: '', editing: false },
                { label: 'Identity verification', value: 'Not started', editing: false },
                { label: 'Address', value: '', editing: false },
                { label: 'Emergency contact', value: '', editing: false },
            ],
            sidebarItems: [
                {
                    title: "Why isn’t my info shown here?",
                    text: "We’re hiding some account details to protect your identity.",
                    icon: "mdi:lock"
                },
                {
                    title: "Which details can be edited?",
                    text: "Contact info and personal details can be edited. If this info was used to verify your identity, you’ll need to get verified again the next time you book or to continue hosting.",
                    icon: "mdi:account-edit"
                },
                {
                    title: "What info is shared with others?",
                    text: "Romdoul Joul Pteas only releases contact information for Hosts and guests after a reservation is confirmed.",
                    icon: "mdi:eye-outline"
                }
            ]
        };
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
    gap: 40px;
    flex-wrap: nowrap;
    padding: 0 200px; 
}

.info-section {
    flex: 2;
    min-width: 300px;
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

/* Sidebar */
.info-sidebar {
    flex: 1;
    min-width: 250px;
    background: #fff;
    padding: 15px 20px;
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
</style>

