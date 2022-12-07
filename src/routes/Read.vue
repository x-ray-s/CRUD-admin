<template>
    <div class="w-1/2 m-auto">
        <div class="flex justify-end">
            <button class="btn mr-3" v-if="isEdit" @click="save">save</button>
            <button class="btn" @click="toggle">
                {{ isEdit ? 'cancel' : 'edit' }}
            </button>
        </div>
        <div
            class="form-control w-full"
            v-for="(value, key) in store.data"
            :key="key"
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
                    :field="updateFields[key]"
                    v-model="store.payload[key]"
                    :enums="store.enums[updateFields[key].type]"
                />
                <View
                    v-else
                    :component="readFields[key]?.component"
                    :value="value"
                    :type="readFields[key]?.type"
                ></View>
            </label>
        </div>
    </div>
</template>
<script>
import { useFieldStore } from '@/stores/field'
import InputByField from '@/components/Fields/index.vue'
import View from '@/components/View.vue'
export default {
    components: {
        View,
        InputByField,
    },
    data() {
        return {
            isEdit: false,
        }
    },
    setup() {
        const store = useFieldStore()
        return {
            store,
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
