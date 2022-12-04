<script>
import List from '../Fields/List.vue'
import Date from '../Fields/Date.vue'
import Page from '@/components/Page.vue'
import Enter from '@/components/Icons/Enter.vue'
import View from '@/components/View.vue'
import { useFieldsStore } from '@/stores/fields'

const TYPE = 'list'

export default {
    components: { List, Date, Page, Enter, View },
    data() {
        return {
            checkList: [],
        }
    },
    mounted() {
        const { model } = this.$route.params
        this.store.field = model
    },
    beforeRouteUpdate(to, from) {
        const { model } = to.params
        this.store.field = model
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
    setup() {
        const store = useFieldsStore()

        return {
            store,
        }
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
                @click="store.headers('create')"
                >Create</label
            >

            <label for="" class="btn mr-3">filter</label>

            <label
                for="delete-modal"
                class="btn"
                @click="confirmDelete"
                v-if="checkList.length > 0"
                >delete</label
            >
        </div>
        <table class="table w-full mb-4">
            <thead>
                <th>
                    <input
                        type="checkbox"
                        class="checkbox align-middle"
                        :checked="checkList.length === store.items.length"
                        @change="checkAll"
                    />
                </th>
                <th v-for="field in fields" :key="field.name">
                    {{ field.alias || field.name }}
                </th>
                <th>Actions</th>
            </thead>
            <tbody>
                <tr v-for="item in store.items" :key="item.id" :class="'hover'">
                    <td>
                        <input
                            type="checkbox"
                            class="checkbox"
                            :checked="checkList.includes(item.id)"
                            @change="check(item.id)"
                        />
                    </td>
                    <td v-for="field in fields" :key="field.name">
                        <div v-if="field.isList">
                            <List
                                :list="item[field.name]"
                                :field="field"
                            ></List>
                        </div>
                        <div v-else-if="field.type === 'DateTime'">
                            <Date :value="item[field.name]"></Date>
                        </div>
                        <View
                            :value="item[field.name]"
                            v-else-if="field.component === 'upload'"
                        ></View>
                        <div v-else>{{ item[field.name] }}</div>
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
            :page="store.page"
            v-on:change="pageHandler"
            v-if="store.page.total > 1"
        />
    </div>
</template>
