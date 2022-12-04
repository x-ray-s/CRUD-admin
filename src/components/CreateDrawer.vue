<template>
    <div class="drawer-side">
        <label :for="id" class="drawer-overlay"></label>
        <div class="p-4 overflow-y-auto w-1/4 bg-base-100 text-base-content">
            <div
                class="form-control w-full"
                v-for="field in fields"
                :key="field.name"
            >
                <label class="label">
                    <span class="label-text">{{ field.name }}</span>
                    <span
                        class="label-text text-error"
                        v-if="
                            field.isRequired &&
                            !field.hasDefaultValue &&
                            !field.isUpdatedAt
                        "
                        >*</span
                    >
                </label>
                <Input
                    :field="field"
                    :model="payload[field.name]"
                    @update:model="
                        (value) => {
                            payload[field.name] = value
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
import Date from '@/components/Date.vue'
const TYPE = 'create'
export default {
    components: {
        Input,
        Date,
    },
    inject: ['Toast'],
    props: ['id'],
    data() {
        return {
            payload: {},
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
    async created() {
        this.init()
    },

    methods: {
        validate() {
            return this.fields.filter((i) => {
                const value = this.payload[i.name]
                return (
                    i.isRequired &&
                    !i.hasDefaultValue &&
                    !i.isUpdatedAt &&
                    !value
                )
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

            const clone = Object.assign(this.payload)

            Object.keys(this.payload).forEach((key) => {
                const field = this.fields.find((i) => i.name === key)
                if (field && field.component === 'quill') {
                    clone[key] = JSON.stringify(this.payload[key])
                }
            })

            await this.store.create(this.payload)
            document.querySelector(`#${this.id}`).checked = false
            this.init()
            await this.store.list()
        },
        init() {
            this.payload = this.fields.reduce((prev, acc) => {
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
        resetFileInputs() {
            const inputs = this.$el.querySelectorAll('input[type=file]')
            if (inputs) {
                Array.from(inputs).forEach((el) => {
                    el.value = ''
                })
            }
        },
        reset() {
            this.init()
            this.resetFileInputs()
        },
    },
}
</script>
