<template>
    <div class="custom-button" :class="{ activeBtn: active }" @click="setActive">
        <span>
            <Icon :icon="icon" width="32" height="32" style="color: #000" />
        </span>
        <h3 style="margin: 10px 0px 0px 0px;">{{ label }}</h3>
    </div>
</template>

<script>
export default {
    methods: {
        setActive() {
            this.$emit('setActive');
        }
    },
    props: {
        active: {
            type: Boolean,
            default: false
        },
        label: {
            type: String,
            default: 'Label',
            required: true
        },
        icon: {
            type: String,
            default: 'tdesign:file-icon',
        }
    }
}
</script>

<style scoped>
.custom-button {
    box-sizing: border-box;
    width: 1fr;
    height: fit-content;
    padding: 15px;
    border-radius: 12px;
    cursor: pointer;
    border: 2px solid transparent;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1),
        0 4px 12px rgba(0, 0, 0, 0.08);
    user-select: none;
    transition: all 200ms ease;
}

.activeBtn {
    border: 2px solid black !important;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.5),
        0 4px 12px rgba(0, 0, 0, 0.08);
    transform: translateY(-3px);
}
</style>