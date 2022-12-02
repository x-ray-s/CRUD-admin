<template>
    <input type="checkbox" :id="id" class="modal-toggle" />
    <div class="modal">
        <div class="modal-box relative">
            <h3 class="text-lg font-bold">
                Congratulations random Internet user!
            </h3>
            <p class="py-4">
                You've been selected for a chance to get one year of
                subscription to use Wikipedia for free!
            </p>
            <div class="modal-action">
                <label @click="deleteHandler" class="btn btn-error">yes!</label>
                <label :for="id" class="btn">no!</label>
            </div>
        </div>
    </div>
</template>
<script>
import { useFieldsStore } from '@/stores/fields'
export default {
    props: ['id'],
    setup() {
        const store = useFieldsStore()
        return {
            store,
        }
    },

    methods: {
        async deleteHandler() {
            await this.store.removeFromQueue()
            document.querySelector(`#${this.id}`).checked = false
            this.store.list()
        },
    },
}
</script>
