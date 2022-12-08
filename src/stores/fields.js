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

        checkList: [],
    }),
    getters: {
        checkedAll() {
            return (
                this.items.length !== 0 &&
                this.checkList.length === this.items.length
            )
        },
    },
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
            const { fields, enums } = await fetch(`/admin/${this.field}`, {
                params: {
                    type,
                },
            })
            this.fields = fields
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
        lineUp() {
            this.queue = [...this.queue, ...this.checkList]
        },
        async removeFromQueue() {
            await Promise.all(
                this.queue.map((i) => {
                    return this.remove(i)
                })
            )

            this.queue = []
            this.checkList = []
        },
        headersReset() {
            this.filedsByType = {
                create: [],
                list: [],
                read: [],
                update: [],
            }
        },
        checkAll() {
            if (this.checkedAll) {
                this.checkList = []
            } else {
                this.checkList = this.items.map((i) => i.id)
            }
        },
        check(id) {
            if (this.checkList.includes(id)) {
                this.checkList = this.checkList.filter((i) => i !== id)
            } else {
                this.checkList.push(id)
            }
        },
    },
})
