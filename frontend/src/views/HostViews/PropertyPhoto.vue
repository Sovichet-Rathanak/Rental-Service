<template>
    <div class="container">
        <hgroup>
            <h1>Add some photos of your property</h1>
            <h2>You'll need 5 photos to get started. You can add more or make changes later.</h2>
        </hgroup>
        <label class="input-container">
            <input type="file" accept="image/*" multiple>
            <div class="upload-content">
                <div class="upload-icon">
                    <Icon icon="fluent-emoji:camera-with-flash" width="100" height="100" />
                </div>
                <div class="upload-text">
                    <h3 class="primary-text">Drag your photos here</h3>
                    <h4 class="secondary-text">or <span class="browse-text">upload from your device</span></h4>
                </div>
            </div>
        </label>
    </div>
</template>

<script>
</script>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    padding: 0;
    box-sizing: border-box;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
}

hgroup {
    align-self: flex-start;
}

h1 {
    margin-bottom: 10px;
    padding-top: 20px;
}

h2 {
    margin: 0;
    color: grey;
}

.input-container {
    margin-top: 30px;
    border-radius: 20px;
    width: 45%;
    height: 600px;
    background-color: #ffffff;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    border: 2px dashed #dddddd;
    transition: all 0.2s ease;
    overflow: hidden;
}

.input-container:hover {
    border-color: #345FCC;
    box-shadow: 0 1px 8px rgba(0, 0, 0, 0.3),
        0 4px 12px rgba(0, 0, 0, 0.09);
}

.input-container>input {
    opacity: 0;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    cursor: pointer;
}

.upload-content{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 30px;
}


.upload-icon{
    display: flex;
    justify-content: center;
    align-items: flex-start;
}

.upload-text {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 8px;
}

.primary-text {
    margin: 0;
    color: #222222;
}

.secondary-text {
    margin: 0;
    color: #717171;
}

.browse-text {
    font-weight: 600;
    text-decoration: underline;
}
</style>