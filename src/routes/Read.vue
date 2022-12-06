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
                            updateFields[key].type === 'Json' ||
                            updateFields[key].component === 'quill'
                        ) {
                            e.preventDefault()
                        }
                    }
                "
            >
                <span class="label-text w-1/3">{{ key }}</span>
                <Input
                    v-if="isEdit && updateFields[key]"
                    :field="updateFields[key]"
                    :model="store.payload[key]"
                    :enumValue="store.enums[updateFields[key].type]"
                    @update:model="
                        (value) => {
                            store.payload[key] = value
                        }
                    "
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
import Input from '@/components/Input.vue'
import View from '@/components/View.vue'
export default {
    components: {
        Input,
        View,
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
