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
            <label class="label">
                <span class="label-text w-1/3">{{ key }}</span>
                <Input
                    v-if="isEdit && fieldsMap[key]"
                    :field="fieldsMap[key]"
                    :model="store.data[key]"
                    :enumValue="store.enums[fieldsMap[key].type]"
                    @update:model="
                        (value) => {
                            store.data[key] = value
                        }
                    "
                />
                <View
                    v-else-if="fieldsMap[key]?.component === 'upload'"
                    :value="value"
                ></View>
                <div v-else class="w-full truncate">{{ value }}</div>
            </label>
        </div>
    </div>
</template>
<script>
import { useFieldStore } from '@/stores/field'
import Input from '@/components/Input.vue'
import View from '@/components/View.vue'
const TYPE = 'update'
let cache = {}
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
        fieldsMap() {
            return this.store.fieldsMap(TYPE)
        },
    },
    async created() {
        const { model, id } = this.$route.params
        this.store.model = model
        this.store.id = id
        await this.store.headers(TYPE)
        await this.store.view()
    },
    methods: {
        async save() {
            await this.store.update()
            this.isEdit = false
        },
        toggle() {
            this.isEdit = !this.isEdit
            if (!this.isEdit) {
                this.store.data = cache
            } else {
                cache = JSON.parse(JSON.stringify(this.store.data))
            }
        },
    },
}
</script>
