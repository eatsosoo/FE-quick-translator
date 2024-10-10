<template>
    <!-- <div class="default-layout">
        <div class="sidebar">
        </div>
        <div class="content">
            <div class="container">    
                <slot />
            </div>
        </div>
    </div> -->
    <div vaul-drawer-wrapper id="app" class="bg-white h-screen">
        <Sidebar />
    </div>
    
</template>

<script>
export default {
    name: 'DefaultLayout',
    // Add your component logic here
}
</script>

<style scoped>
.default-layout {
    display: flex;
    height: 100vh;
}

.sidebar {
    width: 15rem;
    background-color: #f0f0f0;
    /* Add any additional styles for the sidebar here */
}

.content {
    flex: 1;
    /* Add any additional styles for the main content here */
}
</style>