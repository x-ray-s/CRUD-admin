import { defineStore } from 'pinia'

const initFields = (fields) => {
    return fields.reduce((prev, acc) => {
        // default value
        if (acc.isList) {
            prev[acc.name] = []
        } else if (acc.type === 'Boolean') {
            prev[acc.name] = false
        } else if (acc.type === 'Json') {
            prev[acc.name] = {}
        } else if (acc.type === 'DateTime') {
            prev[acc.name] = Date.now()
        } else {
            prev[acc.name] = ''
        }
        return prev
    }, {})
}

export const useCreateStore = defineStore('create', {
    state: () => ({
        payload: {},
        enums: {},
        model: '',
        fields: [],
    }),
    getters: {
        fieldsMap(state) {
            return state.fields.reduce((prev, acc) => {
                prev[acc.name] = acc
                return prev
            }, {})
        },
    },
    actions: {
        init() {
            return initFields(this.fields)
        },
        validate() {
            return this.fields.filter((i) => {
                const value = this.payload[i.name]
                return (
                    i.isRequired &&
                    !i.hasDefaultValue &&
                    !i.isUpdatedAt &&
                    (value === null || value === '' || value === undefined)
                )
            })
        },
        async headers() {
            const { fields, enums } = await fetch(`/admin/${this.model}`, {
                params: {
                    type: 'create',
                },
            })
            this.fields = fields
            this.enums = enums
            this.payload = this.init()
        },
        async create() {
            const hasFile = Object.values(this.payload).some((v) => {
                return v instanceof File
            })
            if (hasFile) {
                await fetch(`/admin/${this.model}/upload`, {
                    method: 'POST',
                    data: this.payload,
                    headers: {
                        'content-type': 'multipart/form-data',
                    },
                })
            } else {
                await fetch(`/admin/${this.model}`, {
                    method: 'POST',
                    data: this.payload,
                    headers: {
                        'content-type': 'application/json',
                    },
                })
            }
        },
    },
})
