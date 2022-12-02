import { defineStore } from 'pinia'

export const useFieldStore = defineStore('model', {
    state: () => ({
        data: {},
    }),
    actions: {
        async getModel(model, id) {
            const data = await fetch(`/admin/${model}/${id}`)
            this.data = data
        },
    },
})
