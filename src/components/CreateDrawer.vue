<template>
    <div class="drawer-side">
        <label :for="id" class="drawer-overlay"></label>
        <div class="p-4 overflow-y-auto w-80 bg-base-100 text-base-content">
            <div
                class="form-control w-full max-w-xs"
                v-for="field in fields"
                :key="field.name"
            >
                <label class="label">
                    <span class="label-text">{{ field.name }}</span>
                    <span class="label-text text-error" v-if="field.isRequired"
                        >*</span
                    >
                </label>
                <Input
                    :field="field"
                    :isUpload="isUpload(field.name)"
                    :model="payload[field.name]"
                    @update:model="
                        (value) => {
                            payloadSet(field.name, value)
                        }
                    "
                    :enumValue="store.enums[field.type]"
                />
            </div>
            <button class="btn mt-3 mr-3" v-on:click="save">save</button>
            <button class="btn mt-3" v-on:click="reset">reset</button>
        </div>
    </div>
</template>
<script>
import { useFieldsStore } from '@/stores/fields'
import Input from '@/components/Input.vue'
const TYPE = 'create'
export default {
    components: {
        Input,
    },
    inject: ['Toast'],
    props: ['id'],
    data() {
        return {
            payload: {},
            hasUpload: false,
        }
    },
    setup() {
        const store = useFieldsStore()
        return {
            store,
        }
    },
    computed: {
        fields() {
            return this.store.filedsByType[TYPE]
        },
    },
    created() {
        this.init()
    },

    methods: {
        isUpload(fieldName) {
            const bool = this.store.config?.property[fieldName]?.upload
            if (bool && !this.hasUpload) {
                this.hasUpload = true
            }
            return bool
        },
        validate() {
            return this.store.fields.filter((i) => {
                const value = this.payload[i.name]
                return i.isRequired && !value
            })
        },
        async save() {
            // required field
            if (this.validate().length) {
                this.Toast.show(
                    'The ' + this.validate()[0].name + ' is required'
                )
                return
            }

            await this.store.create(this.payload, this.hasUpload)
            document.querySelector(`#${this.id}`).checked = false
            this.init()
            await this.store.list()
        },
        init() {
            this.payload = this.store.fields.reduce((prev, acc) => {
                // default value
                if (acc.hasDefaultValue) {
                    prev[acc.name] =
                        acc.default.name === 'now'
                            ? new Date().toISOString().replace(/\.\d{3}z/gi, '')
                            : ''
                } else {
                    prev[acc.name] = ''
                }
                return prev
            }, {})
        },
        resetFiles() {
            const inputs = this.$el.querySelectorAll('input[type=file]')
            if (inputs) {
                Array.from(inputs).forEach((el) => {
                    el.value = ''
                })
            }
        },
        reset() {
            this.init()
            this.resetFiles()
        },
        payloadSet(key, value) {
            this.payload[key] = value
        },
    },
}
</script>
