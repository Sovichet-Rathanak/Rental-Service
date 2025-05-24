<template>
    <div class="card">
        <div class="card-header">
            <span class="label">
                <span class="icon-wrapper">
                    <Icon :icon="icon" class="icon" />
                </span>
                {{ label }}
            </span>
            <a href="#" class="link">View</a>
        </div>
        <hr class="hr" />
        <div class="value">{{ value }}</div>
    </div>
</template>

<script>
import { Icon } from '@iconify/vue'
export default {
    props: {
        label: String,
        value: [String, Number],
        icon: String
    }
}
</script>

<style scoped>
.card {
    background: #fff;
    border-radius: 10px;
    border: 1px solid #d3d3d3;
    box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.1);
    height: 150px;
    justify-content: center;
}

.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
    padding: 10px;
}

.label {
    font-size: 1rem;
    font-weight: bold;
    color: #333;
    display: flex;
    align-items: center;
}

.icon-wrapper {
    display: flex;
    align-items: center;
    margin-right: 20px;
}

.icon {
    font-size: 1.5rem;
    display: flex;
    align-items: center;
}

.link {
    color: #007bff;
    text-decoration: none;
    font-size: 0.9rem;
}

.link:hover {
    text-decoration: underline;
}

.value {
    font-size: 2rem;
    font-weight: bold;
    color: #333;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
}

.hr {
    border: none;
    border-top: 1px solid #d3d3d3;
}
</style>