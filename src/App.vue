<template>
    <div class="drawer drawer-mobile">
        <input id="my-drawer" type="checkbox" class="drawer-toggle" checked />
        <div class="drawer-content">
            <div class="drawer drawer-end">
                <input
                    id="create-drawer"
                    type="checkbox"
                    class="drawer-toggle"
                />
                <div class="drawer-content">
                    <div class="container mx-auto py-4">
                        <router-view></router-view>
                    </div>
                </div>
                <CreateDrawer id="create-drawer"></CreateDrawer>
                <DeleteConfirm id="delete-modal"></DeleteConfirm>
                <Toast />
            </div>
        </div>
        <div class="drawer-side">
            <label for="my-drawer" class="drawer-overlay"></label>

            <Side></Side>
        </div>
    </div>
</template>
<script>
import DeleteConfirm from '@/components/DeleteConfirm.vue'
import CreateDrawer from '@/components/CreateDrawer.vue'
import Side from '@/components/Side.vue'
import Toast from '@/components/Toast.vue'
export default {
    components: { DeleteConfirm, CreateDrawer, Side, Toast },
}
</script>
