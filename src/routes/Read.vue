<template>
    <div class="w-1/2 m-auto">
        <div class="flex justify-end">
            <button class="btn">Edit</button>
        </div>
        <div
            class="form-control w-full"
            v-for="(value, key) in store.data"
            :key="key"
        >
            <label class="label">
                <span class="label-text w-1/3">{{ key }}</span>
                <div class="w-full truncate">{{ value }}</div>
            </label>
        </div>
    </div>
</template>
<script>
import { useFieldStore } from '@/stores/field'
export default {
    setup() {
        const store = useFieldStore()
        return {
            store,
        }
    },
    created() {
        const { model, id } = this.$route.params
        this.store.getModel(model, id)
    },
}
</script>
