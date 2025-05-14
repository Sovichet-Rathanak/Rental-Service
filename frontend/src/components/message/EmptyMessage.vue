<template>
    <div class="message-page">

        <div class="message-wrapper">
            <div class="left-side">
                <div class="message-header">
                    <h1>Messages</h1>
                    <div class="icon">
                        <button class="search-btn">
                            <Icon icon="ic:baseline-search" width="25" height="25" />
                        </button>
                        <button class="filter-btn">
                            <Icon icon="mage:filter" width="25" height="25"  style="color: #000" />
                        </button>
                    </div>
                </div>

                <div class="btn-tabs">
                    <button class="tab-active">All<Icon icon="mingcute:down-fill" width="20" height="20"  style="color: #fff; position: absolute; padding: 3px" /></button>
                    <button class="tab-unactive">Unread</button>
                </div>

                <div class="message-state">
                    <div class="message-icon">
                        <Icon icon="mi:message" width="40" height="40" />
                    </div>
                    <h2>You don't have any messages</h2>
                    <p>When you receive a new message, it will appear here.</p>
                </div>
            </div>

            <div class="right-side">
                <div class="content-wrapper">
                    <!-- Right side remains empty -->
                </div>
            </div>
        </div>
    </div>
</template>

<script>

</script>

<style scoped>
.message-page {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    background: #fff;
}

.message-wrapper {
    display: flex;
    min-height: calc(100vh - 135px);
    width: 100%;
}

.left-side {
    width: 45%; /* Left side takes 40% of the width */
    border-right: 1px solid gray; /* Vertical dividing line */
    padding-top: 15px;
}

.right-side {
    width: 55%; /* Right side takes 60% of the width */
    background: #fff; 
    padding-top: 35px;
    position: relative; 
}

.content-wrapper {
    border-top: 1px solid gray; 
    padding-top: 10px;
    margin-top: 35px;
    width: 100%;
}

.message-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
    padding-bottom: 20px;
}

.message-header h1 {
    font-size: 30px;
    padding-left: 200px;
    margin-top: 0px;

}

.icon {
    margin-right: 50px;
    display: flex;
    gap: 20px;
}

.search-btn, .filter-btn {
    cursor: pointer;
    padding: 5px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: 40px; 
    height: 40px;
    background-color: #f0f0f0; /* Light background */
    border-radius: 50%; /* Makes it a circle */
    transition: background-color 0.3s; /* Smooth hover effect */
}

.btn-tabs {
    display: flex;
    gap: 10px;
    padding-left: 200px;
    margin-top: -25px;
}

.tab-unactive {
    position: relative;
    margin-top: 15px;
    width: 100px;
    padding: 10px;
    background-color: white;
    color: black;
    border: 1px solid #000;
    border-radius: 30px; 
    font-size: 16px;
    font-weight: bold;
    text-transform: uppercase;
    cursor: pointer;
}

.tab-active {
    margin-top: 15px;
    width: 100px;
    padding: 10px;
    background-color: #000;
    color: #fff;
    border: none;
    border-radius: 30px; 
    font-size: 16px;
    font-weight: bold;
    text-transform: uppercase;
    cursor: pointer;
    position: relative;
}

.message-state {
    text-align: center;
    color: black;
    padding: 50px;
}

.message-icon {
    padding: 15px;
    margin-bottom: 20px;
    color: black;
}

.message-state h2 {
    font-size: 18px;
    margin-bottom: 8px;
    font-weight: bold;
}

.message-state p {
    font-size: 16px;
}
</style>