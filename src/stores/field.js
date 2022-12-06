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
        payload: {},
    }),
    actions: {
        init() {
            this.payload = this.filedsByType.update.reduce((prev, acc) => {
                const name = acc.name
                const value = this.data[name]
                if (acc.type === 'DateTime') {
                    prev[name] = new Date(value).valueOf()
                }
                if (acc.type === 'Json') {
                    prev[name] = {
                        json: value,
                    }
                } else {
                    prev[name] = value
                }
                return prev
            }, {})
        },
        async view() {
            const data = await fetch(`/admin/${this.model}/${this.id}`)
            this.data = data
        },
        async update() {
            await fetch(`/admin/${this.model}/${this.id}`, {
                method: 'PATCH',
                data: this.payload,
            })
        },
        async headers(type) {
            const { fields, enums } = await fetch(`/admin/${this.model}`, {
                params: {
                    type,
                },
            })
            this.filedsByType[type] = fields
            this.enums = enums
        },
    },
})
