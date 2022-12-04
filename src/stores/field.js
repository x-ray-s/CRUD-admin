import { defineStore } from 'pinia'

export const useFieldStore = defineStore('model', {
    state: () => ({
        data: {},
        enums: {},
        filedsByType: {
            read: [],
            update: [],
        },
        id: '',
        model: '',
    }),
    actions: {
        async view() {
            const data = await fetch(`/admin/${this.model}/${this.id}`)
            this.data = data
        },
        async update() {
            await fetch(`/admin/${this.model}/${this.id}`, {
                method: 'PATCH',
                data: this.data,
            })
        },
        async headers(type) {
            if (this.filedsByType[type].length) {
                return
            }
            const { fields, enums } = await fetch(`/admin/${this.model}`, {
                params: {
                    type,
                },
            })
            this.fields = fields.reduce((prev, acc) => {
                prev[acc.name] = acc
                return prev
            }, {})
            this.filedsByType[type] = fields
            this.enums = enums
        },
        fieldsMap(type) {
            return this.filedsByType[type].reduce((prev, acc) => {
                prev[acc.name] = acc
                return prev
            }, {})
        },
    },
})
