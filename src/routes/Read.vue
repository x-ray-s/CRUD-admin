<template>
    <div class="w-1/2 m-auto">
        <div class="flex justify-end">
            <button
                v-if="isEdit"
                class="btn mr-3"
                @click="save"
            >
                save
            </button>
            <button
                class="btn"
                @click="toggle"
            >
                {{ isEdit ? 'cancel' : 'edit' }}
            </button>
        </div>
        <div
            v-for="(value, key) in store.data"
            :key="key"
            class="form-control w-full"
        >
            <label
                class="label"
                @click="
                    (e) => {
                        if (
                            updateFields[key] &&
                            (updateFields[key].type === 'Json' ||
                                updateFields[key].component ||
                                updateFields[key].kind === 'enum')
                        ) {
                            e.preventDefault()
                        }
                    }
                "
            >
                <span class="label-text w-1/3">{{ key }}</span>
                <InputByField
                    v-if="isEdit && updateFields[key]"
                    v-model="store.payload[key]"
                    :field="updateFields[key]"
                    :enums="store.enums[updateFields[key].type]"
                />
                <ViewBox
                    v-else
                    :component="readFields[key]?.component"
                    :value="value"
                    :type="readFields[key]?.type"
                />
            </label>
        </div>
    </div>
</template>
<script>
import InputByField from '@/components/Fields/index.vue'
import ViewBox from '@/components/View.vue'
import { useFieldStore } from '@/stores/field'
export default {
    components: {
        InputByField,
        ViewBox,
    },
    setup() {
        const store = useFieldStore()
        return {
            store,
        }
    },
    data() {
        return {
            isEdit: false,
        }
    },
    computed: {
        headerType() {
            return this.isEdit ? 'update' : 'read'
        },
        readFields() {
            return this.store.filedsByType.read.reduce((prev, acc) => {
                prev[acc.name] = acc
                return prev
            }, {})
        },
        updateFields() {
            return this.store.filedsByType.update.reduce((prev, acc) => {
                prev[acc.name] = acc
                return prev
            }, {})
        },
    },

    async mounted() {
        const { model, id } = this.$route.params
        this.store.model = model
        this.store.id = id
        await this.store.headers('read')
        await this.store.view()
    },
    methods: {
        async save() {
            await this.store.update()
            this.isEdit = false
            this.store.view()
        },
        async toggle() {
            if (!this.isEdit) {
                await this.store.headers('update')
                this.store.init()
            }

            this.isEdit = !this.isEdit
        },
    },
}
</script>
