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
        config: {},
        enums: {},
        filedsByType: {
            create: [],
            list: [],
            read: [],
            update: [],
        },
    }),

    actions: {
        async list() {
            if (!this.field) {
                return
            }
            const { data, page } = await fetch(
                `http://localhost:4000/admin/${this.field}_list`
            )
            this.items = data
            this.page.total = page
        },
        async pagination(v) {
            if (!this.field) {
                return
            }
            this.page.current = v
            const { list } = await fetch(
                `http://localhost:4000/admin/${this.field}_list?page=${v}`
            )
            this.items = list
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
            const { fields, enums, config } = await fetch(
                `http://localhost:4000/admin/${this.field}`,
                {
                    params: {
                        type,
                    },
                }
            )
            this.fields = fields
            this.filedsByType[type] = fields
            this.enums = enums
            this.config = config
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
