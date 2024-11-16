<template>
    <div vaul-drawer-wrapper id="app" class="bg-white h-screen flex">
        <div class="p-2 border">
            <Sidebar />
        </div>
        <div class="p-2 border flex-1">
            <Navbar />
            <div class="p-2 m-2">
                <slot />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'DefaultLayout',
}
</script>