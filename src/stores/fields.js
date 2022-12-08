import { defineStore } from 'pinia'

export const useFieldsStore = defineStore('list', {
    state: () => ({
        items: [],
        page: {
            current: 1,
            total: 0,
        },
        fields: [],
        queue: [],
        field: '',
        enums: {},
        filedsByType: {
            create: [],
            list: [],
        },
    }),

    actions: {
        async list() {
            if (!this.field) {
                return
            }
            const { data, page } = await fetch(`/admin/${this.field}_list`)
            this.items = data
            this.page.total = page
        },
        async pagination(v) {
            if (!this.field) {
                return
            }
            this.page.current = v
            const { data } = await fetch(`/admin/${this.field}_list?page=${v}`)
            this.items = data
        },
        async remove(id) {
            if (!this.field) {
                return
            }
            await fetch(`http://localhost:4000/admin/${this.field}/${id}`, {
                method: 'DELETE',
            })

            this.items = this.items.filter((i) => i.id !== id)
        },
        async headers(type) {
            if (!this.field) {
                return
            }
            if (this.filedsByType[type].length) {
                return
            }
            const { fields, enums } = await fetch(`/admin/${this.field}`, {
                params: {
                    type,
                },
            })
            this.fields = fields
            this.filedsByType[type] = fields
            this.enums = enums
        },
        async create(payload) {
            if (!this.field) {
                return
            }
            const hasFile = Object.values(payload).some((v) => {
                return v instanceof File
            })
            if (hasFile) {
                await fetch(`/admin/${this.field}/upload`, {
                    method: 'POST',
                    data: payload,
                    headers: {
                        'content-type': 'multipart/form-data',
                    },
                })
            } else {
                await fetch(`/admin/${this.field}`, {
                    method: 'POST',
                    data: payload,
                    headers: {
                        'content-type': 'application/json',
                    },
                })
            }
        },
        lineUp(items) {
            this.queue = [...this.queue, ...items]
        },
        async removeFromQueue() {
            await Promise.all(
                this.queue.map((i) => {
                    return this.remove(i)
                })
            )

            this.queue = []
        },
        headersReset() {
            this.filedsByType = {
                create: [],
                list: [],
                read: [],
                update: [],
            }
        },
    },
})
