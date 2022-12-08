<script>
import Enter from '@/components/Icons/Enter.vue'
import Cell from '@/components/List/Cell.vue'
import Page from '@/components/Page.vue'
import { useCreateStore } from '@/stores/create'
import { useFieldsStore } from '@/stores/fields'

const TYPE = 'list'

export default {
    components: { Page, Enter, Cell },
    beforeRouteUpdate(to, from) {
        const { model } = to.params
        this.store.field = model
        document.querySelector(`#create-drawer`).checked = false
    },

    setup() {
        const store = useFieldsStore()
        const createStore = useCreateStore()

        return {
            store,
            createStore,
        }
    },
    data() {
        return {
            checkList: [],
        }
    },
    computed: {
        checkedAll() {
            return (
                this.store.items.length !== 0 &&
                this.checkList.length === this.store.items.length
            )
        },
        fields() {
            return this.store.filedsByType[TYPE]
        },
    },
    watch: {
        async 'page.current'(v) {
            await this.store.page(v)
            this.checkList = []
        },
        'store.field'(v) {
            this.store.headersReset()
            this.store.headers(TYPE)
            this.store.list()
        },
    },
    mounted() {
        const { model } = this.$route.params
        this.store.field = model
    },
    methods: {
        checkAll() {
            if (this.checkedAll) {
                this.checkList = []
            } else {
                this.checkList = this.store.items.map((i) => i.id)
            }
        },
        check(id) {
            if (this.checkList.includes(id)) {
                this.checkList = this.checkList.filter((i) => i !== id)
            } else {
                this.checkList.push(id)
            }
        },
        confirmDelete() {
            this.store.lineUp(this.checkList)
        },
        pageHandler(v) {
            this.store.pagination(v)
        },
    },
}
</script>

<template>
    <div>
        <div class="mb-4 flex justify-end">
            <label
                for="create-drawer"
                class="drawer-button btn btn-primary mr-3"
                @click="createStore.model = store.field"
            >Create</label>

            <label
                for=""
                class="btn mr-3"
            >filter</label>

            <label
                v-if="checkList.length > 0"
                for="delete-modal"
                class="btn"
                @click="confirmDelete"
            >delete</label>
        </div>
        <table class="table w-full mb-4">
            <thead>
                <th>
                    <input
                        type="checkbox"
                        class="checkbox align-middle"
                        :checked="checkedAll"
                        @change="checkAll"
                    >
                </th>
                <th
                    v-for="field in fields"
                    :key="field.name"
                >
                    {{ field.alias || field.name }}
                </th>
                <th>Actions</th>
            </thead>
            <tbody>
                <tr
                    v-for="item in store.items"
                    :key="item.id"
                    :class="'hover'"
                >
                    <td>
                        <input
                            type="checkbox"
                            class="checkbox"
                            :checked="checkList.includes(item.id)"
                            @change="check(item.id)"
                        >
                    </td>
                    <td
                        v-for="field in fields"
                        :key="field.name"
                    >
                        <Cell
                            :field="field"
                            :value="item[field.name]"
                        />
                    </td>
                    <td>
                        <router-link
                            class="btn btn-square btn-outline"
                            :to="`/${store.field}/${item.id}`"
                        >
                            <Enter />
                        </router-link>
                    </td>
                </tr>
            </tbody>
        </table>
        <Page
            v-if="store.page.total > 1"
            :page="store.page"
            @change="pageHandler"
        />
    </div>
</template>
